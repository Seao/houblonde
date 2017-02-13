/**********************************
 * [MODULE] PLAIN TEXT
 *********************************/

var app = angular.module('starter.controllers', ['ionic','firebase','ion-gallery','ngCordova']).
  filter('plainText', function() {
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  }
);

/**********************************
 * [DIRECTIVE] TEXTAREA
 *********************************/

app.directive('textarea', function() {
  return {
    restrict: 'E',
    link: function(scope, element, attr) {
      var update = function() {
        element.css("height", "auto");
        var height = element[0].scrollHeight;
        if(height != 0) {
          element.css("height", element[0].scrollHeight + "px");
        }
      };
      scope.$watch(attr.ngModel, function() {
        update();
      });
    }
  };
});