/**********************************
 * [CONTROLLER] ACCOUNT
 *********************************/
app.controller('AccountCtrl', function(Firebase, Auth, User, $scope, $location) {
  
  /**********************************
   * [FIREBASE] USER
   *********************************/

  $scope.firebaseUser = User.getUser();
  $scope.firebaseUserInfos = User.getInfo();

  /**********************************
   * [FIREBASE] LOGIN / LOGOUT
   *********************************/

  Auth.$onAuthStateChanged(function(authData) {
    if(!authData) {
      console.log("Signed out");
      $scope.loggedInUser = null;
      $location.path('/welcome');
    }
  }); 

  $scope.logout = function() {
    console.log("Signed out request");
    Auth.$signOut();
  }
});