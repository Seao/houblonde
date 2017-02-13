/**********************************
 * [CONTROLLER] WELCOME
 *********************************/
app.controller('WelcomeCtrl', function(Firebase, Auth, User, $scope, $stateParams, $ionicModal, $location) {

  /**********************************
   * [FIX] KEYBOARD
   *********************************/

  window.addEventListener('native.keyboardshow', keyboardShowHandler);

  function keyboardShowHandler(e){
    document.getElementById("form").style.marginTop = "calc(130% - "+e.keyboardHeight+"px)";
  }

  window.addEventListener('native.keyboardhide', keyboardHideHandler);

  function keyboardHideHandler(e){
    document.getElementById("form").style.marginTop = "100%";
  }

  $scope.error = null;
  $scope.register = false;

  /**********************************
   * [FUNCTIONS] UTILS
   *********************************/

  $scope.isIncorrectValue = function(val) {
    return angular.isUndefined(val) || val === null || val == "";
  }

  $scope.cleanVariables = function() {
    $scope.error = null;
  }

  /**********************************
   * [FIREBASE]
   *********************************/

  Auth.$onAuthStateChanged(function(authData) {
    // If we haver authentication data
    if (authData) {
      console.log("Signed in as :", authData.email);
      $scope.loggedInUser = authData;
      // Save user for other controller
      User.setUser($scope.loggedInUser);
      // Get informations associates
      firebase.database().ref('user/'+$scope.loggedInUser.uid).once('value').then(function(snapshot) {
        User.setInfo(snapshot.val());
      });
      // Close register modal in register case
      $scope.closeRegister();
      // Redirect correct page
      if($scope.register) {
        $location.path('/slide');
      } else {
        $location.path('/tab/search');
      }
    } else {
      console.log("Signed out");
      $scope.loggedInUser = null;
    }
  });

  $scope.createUser = function(form) {
    if($scope.isIncorrectValue(form) || $scope.isIncorrectValue(form.email) || $scope.isIncorrectValue(form.password) || $scope.isIncorrectValue(form.password)) {
      $scope.error = "Certains champs sont incorrects ...";
    } else {
      // Create the user on Auth instance
      Auth.$createUserWithEmailAndPassword(form.email, form.password)
      .then(function(user) {
        // Prepare user's data
        var userData = {
          email: form.email,
          username: form.username
        };
        
        // Save user's data with uid
        var creation = {};
        creation['/user/' + user.uid] = userData;
        firebase.database().ref().update(creation);

        // If this is a success, log in
        $scope.register = true;
        return Auth.$signInWithEmailAndPassword(form.email, form.password)
      }).catch(function(error) {
        // If we have an error, catch and print it
        $scope.error = ""+error;
      });
    }
  };

  $scope.loginUser = function(user) {
    if($scope.isIncorrectValue(user) || $scope.isIncorrectValue(user.email) || $scope.isIncorrectValue(user.password)) {
      $scope.error = "Certains champs sont incorrects ...";
    } else {
      Auth.$signInWithEmailAndPassword(user.email, user.password)
      .then(function(authData) {
        $scope.loggedInUser = authData;
      }).catch(function(error) {
        $scope.error = ""+error;
      });
    }
  }

  /**********************************
   * [MODAL] LOGIN
   *********************************/

  // Configuration (File, animation, function)
  $ionicModal.fromTemplateUrl('templates/welcome/forget.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalForget = modal;
  });

  // Open the modal
  $scope.openForget = function() {
    $scope.cleanVariables();
    $scope.modalForget.show();
  };

  // Close the modal
  $scope.closeForget = function() {
    $scope.cleanVariables();
    $scope.modalForget.hide();
  };

  /**********************************
   * [MODAL] REGISTER
   *********************************/

  // Configuration (File, animation, function)
  $ionicModal.fromTemplateUrl('templates/welcome/register.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modalRegister = modal;
  });

  // Open the modal
  $scope.openRegister = function() {
    $scope.cleanVariables();
    $scope.modalRegister.show();
  };

  // Close the modal
  $scope.closeRegister = function() {
    $scope.cleanVariables();
    $scope.modalRegister.hide();
  };
});