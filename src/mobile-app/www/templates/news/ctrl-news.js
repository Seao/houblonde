/**********************************
 * [CONTROLLER] NEWS
 *********************************/
app.controller('NewsCtrl', function(Firebase, User, $scope, $firebaseArray) {
  
  /**********************************
   * [FIREBASE] USER
   *********************************/

  $scope.firebaseUser = User.getUser();
  $scope.firebaseUserInfos = User.getInfo();

  /**********************************
   * [FIREBASE] UNIVERS
   *********************************/
  
  var refUnivers = firebase.database().ref('univers');
  $scope.univers = $firebaseArray(refUnivers);

  /**********************************
   * [FIREBASE] SELECTION
   *********************************/
  
  var refSelection = firebase.database().ref('selection');
  $scope.selection = $firebaseArray(refSelection);

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

  /**********************************
   * [DISPLAY] PAGE
   *********************************/

  $scope.page = 1;

  $scope.setPage = function(choice) {
    $scope.page = choice;
  }
});