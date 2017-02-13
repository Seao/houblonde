/***************************************
 * Dependencies
 **************************************/

var express = require('express');
var bodyParser = require("body-parser");
var firebase = require("firebase");
var Jimp = require("jimp");
var request = require('request').defaults({ encoding: null });

var app = express();

/***************************************
 * Configuration
 **************************************/

app.use(bodyParser.json({limit: '5mb'}));
app.use(bodyParser.urlencoded({
  extended: true,
  limit: '5mb'
})); 
  
// Initialize the app with no authentication
firebase.initializeApp({
  databaseURL: "https://houblonde-2d4c4.firebaseio.com/"
});

var db = firebase.database();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


/***************************************
 * Functions
 **************************************/

function mesureDifference(obj_hash, hash, limit, callback) {
  var count = 0;
  var total = 0;

  if(obj_hash != null) {
    for(var i=0;i<obj_hash.hash.length;i++) {
      if(obj_hash.hash.charAt(i) != hash.charAt(i)) {
        count++;
      }
      total++;
      if(count > limit) {
        callback(obj_hash,64);
      }
    }
    callback(obj_hash,count); 
  } else {
    callback(obj_hash,64);
  }
}

function compareImage(hash, callback) {
  var min = 64;
  var res = [];

  firebase.database().ref('/hash').once('value').then(function(snapshot) {
    var table = snapshot.val();

    while(table.length > 0) {
      var current = table[0];
      table.splice(current,1);

      if(current != null) {
        mesureDifference(current, hash, min, function(part,distance) {
          if(distance <= min) {
            min = distance;
            if(distance <= 16) res.push(part.id);
          }
        });
      }
    }

    callback(res);
  });
}

/***************************************
 * Routes
 **************************************/

app.route('/')
  .post(function(request, response) {
    
    console.log("* POST Request")
    var start = new Date().getTime();

    var base64 = request.body.base64;
    var buff = new Buffer(base64.replace(/^data:image\/(png|gif|jpeg);base64,/,''), 'base64');

    Jimp.read(buff, function (err, image) {
      compareImage(image.hash(2), function(res) {
        var time = new Date().getTime() - start;
        console.log("* Execution time : " + time);
        response.send('{"error": "false","similar":'+JSON.stringify(res)+"}");
      });
    });
  });

/***************************************
 * Application
 **************************************/

app.listen(3000, function () {
  console.log('# Start Application\n# Port : 3000');
});