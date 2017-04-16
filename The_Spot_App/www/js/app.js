// ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var module = angular.module('starter', ['ionic','ngCordova', 'starter.controllers']);

    module.run(function ($ionicPlatform) {
        $ionicPlatform.ready(function () {
            // hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (cordova.platformId === 'ios' && window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                window.StatusBar.styleLightContent();
            }
        });
    })

module.config(function ($stateProvider, $urlRouterProvider) {

    $stateProvider.state('home', {
        url: '/home',
        templateUrl : 'templates/home.html'
    })

    .state('login', {
        url: '/login',
        templateUrl: 'templates/login.html',
    })

    .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html'
    })

    .state('annonce', {
        url: '/annonce',
        templateUrl: 'templates/annonce.html'
    })

    .state('newAnnonce', {
        url: '/new',
        templateUrl: 'templates/newAnnonce.html'
    })

        .state('videos', {
            url: '/videos',
            templateUrl: 'templates/videos.html'
        })

    .state('myAnnonces', {
        url: '/myAnnonces',
        templateUrl: 'templates/myAnnonces.html'
    })

    $urlRouterProvider.otherwise('home');

});

module.config(function($cordovaInAppBrowserProvider) {

  var defaultOptions = {
    location: 'no',
    clearcache: 'no',
    toolbar: 'no'
  };

  $cordovaInAppBrowserProvider.setDefaultOptions(defaultOptions);

});
