/**********************************
 * [CONTROLLER] DETAIL
 *********************************/
app.controller('DetailCtrl', function(Firebase, Auth, User, $stateParams, $ionicPopup, $scope, $firebaseArray) {

	/**********************************
   * [DISPLAY] PAGE
   *********************************/

 	$scope.page = 1;

 	$scope.setPage = function(choice) {
 		$scope.page = choice;
 	}

  /**********************************
   * [FIREBASE] USER
   *********************************/

  $scope.firebaseUser = User.getUser();
  $scope.firebaseUserInfos = User.getInfo();

	/**********************************
   * [DATA] BEERS
   *********************************/

  firebase.database().ref('biere/'+$stateParams.id).once('value').then(function(snapshot) {
	  if(snapshot.val() != null) {
	  	// Beer
	  	$scope.$apply(function () {
	  		$scope.biere = snapshot.val();
      });

	  	// Pays
  		firebase.database().ref('pays/'+$scope.biere.b_pays).once('value').then(function(snap) {
  			$scope.$apply(function () {
		  		$scope.pays = snap.val();
	      });
  		});

  		// Type
  		firebase.database().ref('type/'+$scope.biere.b_type).once('value').then(function(snap) {
  			$scope.$apply(function () {
		  		$scope.type = snap.val();
	      });
  		});

  		// Couleur
  		firebase.database().ref('couleur/'+$scope.biere.b_couleur).once('value').then(function(snap) {
  			$scope.$apply(function () {
		  		$scope.couleur = snap.val();
	      });
  		});

  		// Volume
  		firebase.database().ref('volume/'+$scope.biere.b_volume).once('value').then(function(snap) {
  			$scope.$apply(function () {
		  		$scope.volume = snap.val();
	      });
  		});
	  }
	});

  // Degustation
  firebase.database().ref('degustation/'+$stateParams.id).once('value').then(function(snapshot) {
	  if(snapshot.val() != null) {
	  	$scope.$apply(function () {
	  		// Affect snapshot
	  		$scope.degustation = snapshot.val();
	  		// Nullable aromes
	  		if($scope.degustation.b_arome == "") {
	  			$scope.degustation.b_arome = "N/C"
	  		}
	  		// Nullable notes
	  		if($scope.degustation.b_note == "") {
	  			$scope.degustation.b_note = "N/C"
	  		}
	  		// Nullable robe
	  		if($scope.degustation.b_robe == "") {
	  			$scope.degustation.b_robe = "N/C"
	  		}
	  		// Nullable description
	  		if($scope.degustation.b_description == "") {
	  			$scope.degustation.b_description = "N/C"
	  		}
      });
    }
	});

  /**********************************
   * [FIREBASE] AVIS
   *********************************/

  // Get all avis
	var refAvis = firebase.database().ref('avis/'+$stateParams.id).limitToLast(10);
  $scope.avis = $firebaseArray(refAvis);

  if($scope.firebaseUser != undefined) {
    // Get user submited avis
    var refAvisPerso = firebase.database().ref('avis/'+$stateParams.id+'/'+$scope.firebaseUser.uid).once('value').then(function(snapshot) {
      if(snapshot.val() != null) {
        $scope.form = {
          avis:snapshot.val().avis
        }
      }
    });
  }
  
  $scope.writeNewAvis = function(form, b_id) {
 		if(angular.isDefined($scope.firebaseUserInfos)) {
 			// Create avis data
 			var newAvisKey = firebase.database().ref().child('avis').push().key;
	 		var uid = $scope.firebaseUser.uid;

	 		var avisData = {
	 			key: newAvisKey,
	 			username: $scope.firebaseUserInfos.username,
	 			uid: uid,
	 			avis: form.avis,
	 			starCount: 0
	 		};

		  // Write the new avis data simultaneously in the avis list and the user's avis list.
		  var updates = {};
		  updates['/avis/' + b_id + '/' + uid] = avisData;
		  updates['/user-avis/' + uid + '/' + b_id] = newAvisKey;

		  firebase.database().ref().update(updates);
		  $scope.showAlert("Information","Ajoutée à vos favoris !");
 		} else {
 			$scope.showAlert("Information","Veuillez patienter, l'application charge vos données de profil. Cela peut prendre quelques minutes selon votre connexion.");
 		}
	}

  /**********************************
   * [FIREBASE] LIKE
   *********************************/

  $scope.writeNewLike = function() {
    if(angular.isDefined($scope.firebaseUserInfos)) {
      var likeDate = {
        id: $stateParams.id
      };
      var updates = {};
      updates['/user-like/' + $scope.firebaseUser.uid + '/' + $stateParams.id] = likeDate;

      firebase.database().ref().update(updates);
      $scope.showAlert("Information","Votre like est bien pris en compte !");
    } else {
      $scope.showAlert("Information","Veuillez patienter, l'application charge vos données de profil. Cela peut prendre quelques minutes selon votre connexion.");
    }
  }

  /**********************************
   * [IONIC] ALERT
   *********************************/

  $scope.showAlert = function(titre,text) {
    var alertPopup = $ionicPopup.alert({
      title: titre,
      template: text
    });

    alertPopup.then(function(res) {
      console.log('Alert show');
    });
  };

});