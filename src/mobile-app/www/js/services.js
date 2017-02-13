angular.module('starter.services', [])

/***************************************************************************************
 * FACTORY
 **************************************************************************************/

.factory("Auth", ["$firebaseAuth",
  function($firebaseAuth) {
    return $firebaseAuth();
  }
])

.factory("Firebase", function() {
  var config = {
    apiKey: "AIzaSyDRl_vEMJoVfL4PURNBnxhS4tdSfL4DLhQ",
    authDomain: "houblonde-2d4c4.firebaseapp.com",
    databaseURL: "https://houblonde-2d4c4.firebaseio.com",
    storageBucket: "houblonde-2d4c4.appspot.com",
  };
  return firebase.initializeApp(config);
})

.factory('User', function() {
  var firebaseUser = null;
  var firebaseUserInfos = null;

  return {
    setUser: function(user) {
      firebaseUser = user;
    },
    setInfo: function(infos) {
      firebaseUserInfos = infos;
    },
    getUser: function() {
      return firebaseUser;
    },
    getInfo: function() {
      return firebaseUserInfos;
    },
    getUid: function() {
      if(firebaseUser != null) {
        return firebaseUser.uid;
      }
      return null;
    }
  };
})

/***************************************************************************************
 * PHOTO
 **************************************************************************************/


.service (
  "PhotoSrv",
  function($http, $q) {
    return ({
      sendImage: sendImage
    });

    function sendImage(base) {
      var request = $http({
        method: 'POST',
        url: 'http://164.132.51.69:3000/',
        transformRequest: function(obj) {
          var str = [];
          for(var p in obj)
          str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          return str.join("&");
        },
        data: {
          base64: base
        },
        headers: {'Content-Type': 'application/x-www-form-urlencoded'}
      });
      return(request.then(handleSuccess, handleError));
    }

    // Transform the successful response
    function handleError(response) {
      if (!angular.isObject(response.data) ||
        !response.data.message
      ) {
        return ($q.reject("An unknown error occurred."));
      }
      // Otherwise, use expected error message
      return ($q.reject(response.data.message));
    }

    function handleSuccess(response) {
      return (response.data);
    }
  }
)