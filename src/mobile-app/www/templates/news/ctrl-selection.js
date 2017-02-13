/**********************************
 * [CONTROLLER] SELECTION
 *********************************/
app.controller('SelectionCtrl', function(Firebase, Auth, $scope, $firebaseArray, $stateParams) {

 	/**********************************
   * [FIREBASE] USER
   *********************************/

	$scope.firebaseUser = Auth.$getAuth();
	if($scope.firebaseUser != undefined) {
		console.log("Send user info request :", $scope.firebaseUser.email);
	  var refUser = firebase.database().ref('user/'+$scope.firebaseUser.uid).once('value').then(function(snapshot) {
		  $scope.firebaseUserInfos = snapshot.val();
	  });
	} 

	if ($scope.firebaseUser) {
		console.log("Get signed user :", $scope.firebaseUser.email);
	} else {
    console.log("No user get, signed out");
	}

  /**********************************
   * [FIREBASE] SELECTION
   *********************************/

  $scope.bieres = [];

  firebase.database().ref('selection/'+$stateParams.id).once('value').then(function(snapshot) {
    if(snapshot.val() != null) {
      $scope.$apply(function () {
        $scope.selection = snapshot.val();
      });

      firebase.database().ref('user/'+$scope.selection.uid).once('value').then(function(snapshot) {
        $scope.$apply(function () {
          $scope.author = snapshot.val();
        });
      });

      // Bieres
      angular.forEach($scope.selection.bieres, function(value, key) {
        firebase.database().ref('biere/'+value.id).once('value').then(function(snapshot) {
          // Push value in correct format
          $scope.$apply(function () {
            $scope.bieres.push(snapshot.val());
          });
        });
      });  
    }
  });

  /**********************************
   * [FIREBASE] GET TYPE
   *********************************/

  var refType = firebase.database().ref('type');
  $scope.types = $firebaseArray(refType);

  /**********************************
   * [FIREBASE] GET PAYS
   *********************************/

  var refPays = firebase.database().ref('pays');
  $scope.pays = $firebaseArray(refPays);
});