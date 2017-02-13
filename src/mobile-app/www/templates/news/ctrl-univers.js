/**********************************
 * [CONTROLLER] UNIVERS
 *********************************/
app.controller('UniversCtrl', function(Firebase, Auth, $scope, $firebaseArray, $stateParams) {

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
   * [FIREBASE] UNIVERS
   *********************************/

  $scope.items = [];

  firebase.database().ref('univers/'+$stateParams.id).once('value').then(function(snapshot) {
    if(snapshot.val() != null) {
      $scope.$apply(function () {
        $scope.univers = snapshot.val();
      });

      firebase.database().ref('user/'+$scope.univers.uid).once('value').then(function(snapshot) {
        $scope.$apply(function () {
          $scope.author = snapshot.val();
        });
      });

      // Gallery
      angular.forEach($scope.univers.images, function(value, key) {
        // Get image
        firebase.database().ref('univers_image/'+value.id).once('value').then(function(snapshot) {
          // Push value in correct format
          $scope.$apply(function () {
            $scope.items.push({
              src:"http://164.132.51.69/houblonde/univers_image/"+snapshot.val().image,
              sub:snapshot.val().information,
            });
          });
        });
      });   
    }
  });
});