// ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var module = angular.module('starter', ['ionic']);

    module.run(function ($ionicPlatform, $state) {
        $ionicPlatform.ready(function () {
            // hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            $state.go('login');
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
       // controller : 'loginCtrl'
    })

    .state('register', {
        url: '/register',
        templateUrl: 'templates/register.html'
    })

    .state('annonce', {
        url: '/annonce',
        templateUrl: 'templates/annonce.html'
    })

    $urlRouterProvider.otherwise('home');

});

/*module.controller('loginCtrl', function ($scope, $ionicModal) {
    $ionicModal.fromTemplateUrl('templates/home.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
    });
    $scope.openModal = function () {
        $scope.modal.show();
    };
    $scope.closeModal = function () {
        $scope.modal.hide();
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
        // Execute action
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
        // Execute action
    });

    $scope.showHome = function () {
        $scope.openModal();
    }
});*/



