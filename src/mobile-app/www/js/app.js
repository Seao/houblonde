angular.module('starter', ['ionic', 'starter.controllers', 'starter.services'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider

  /**********************************
   * WELCOME
   *********************************/
  .state('welcome', {
    url: '/welcome',
    templateUrl: 'templates/welcome/intro.html',
    controller: 'WelcomeCtrl'
  })

  /**********************************
   * SLIDE
   *********************************/
  .state('slide', {
    url: '/slide',
    templateUrl: 'templates/slide/slide.html',
    controller: 'SlideCtrl'
  })

  /**********************************
   * [ABSTRACT] TAB
   *********************************/
  .state('tab', {
    url: '/tab',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  /**********************************
   * TAB. SEARCH
   *********************************/
  .state('tab.search', {
    url: '/search',
    views: {
      'tab-search': {
        templateUrl: 'templates/search/tab-search.html',
        controller: 'SearchCtrl'
      }
    }
  })

  .state('tab.detail', {
    url: '/detail/:id',
    views: {
      'tab-search': {
        templateUrl: 'templates/search/tab-detail.html',
        controller: 'DetailCtrl'
      }
    }
  })

  /**********************************
   * TAB. NEWS
   *********************************/
  .state('tab.news', {
    url: '/news',
    views: {
      'tab-news': {
        templateUrl: 'templates/news/tab-news.html',
        controller: 'NewsCtrl'
      }
    }
  })

    .state('tab.univers', {
    url: '/univers/:id',
    views: {
      'tab-news': {
        templateUrl: 'templates/news/tab-univers.html',
        controller: 'UniversCtrl'
      }
    }
  })

  .state('tab.selection', {
    url: '/selection/:id',
    views: {
      'tab-news': {
        templateUrl: 'templates/news/tab-selection.html',
        controller: 'SelectionCtrl'
      }
    }
  })

  /**********************************
   * TAB. DEGUSTATION
   *********************************/
  .state('tab.degustation', {
    url: '/degustation',
    views: {
      'tab-degustation': {
        templateUrl: 'templates/degustation/tab-degustation.html',
        controller: 'DegustationCtrl'
      }
    }
  })

  /**********************************
   * TAB. ACCOUNT
   *********************************/
  .state('tab.account', {
    url: '/account',
    views: {
      'tab-account': {
        templateUrl: 'templates/account/tab-account.html',
        controller: 'AccountCtrl'
      }
    }
  })

  /**********************************
   * DEFAULT ROUTE
   *********************************/
  $urlRouterProvider.otherwise('/welcome');
});
