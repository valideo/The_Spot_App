// ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var module = angular.module('starter', ['ionic']);

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

    $urlRouterProvider.otherwise('home');

});

module.config(function($cordovaFacebookProvider) {
  var appID = 429497384056805;
  var version = "v2.0"; // or leave blank and default is v2.0
  $cordovaFacebookProvider.browserInit(appID, version);
});


module.controller('HomeCtrl', function ($scope, $ionicModal, $state) {
    $ionicModal.fromTemplateUrl('templates/login.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modal = modal;
        $scope.openModalLogin();
    });
    $ionicModal.fromTemplateUrl('templates/register.html', {
        scope: $scope,
        animation: 'slide-in-up'
    }).then(function (modal) {
        $scope.modalRegister = modal;
        $scope.openModalLogin();
    });
    $scope.openModalLogin = function () {
        $scope.modal.show();
    };
    $scope.closeModal = function () {
        $scope.modal.hide();
    };

    $scope.closeModalOpenRegister = function () {
        $scope.modal.hide().then(function () {

            $scope.modalRegister.show();
        })
    };

    $scope.closeModalOpenLogin = function () {
        $scope.modalRegister.hide().then(function () {

            $scope.modal.show();
        })
    };
    // Cleanup the modal when we're done with it!
    $scope.$on('$destroy', function () {
        $scope.modal.remove();
    });
    // Execute action on hide modal
    $scope.$on('modal.hidden', function () {
    });
    // Execute action on remove modal
    $scope.$on('modal.removed', function () {
        // Execute action
    });

});

module.controller('loginCtrl', function ($scope, $http, $ionicModal, $cordovaFacebook) {

  function closeModal() {
    $scope.modal.hide();
  };

$scope.user = {};

$scope.login = function() {

  $http({
    method: 'POST',
    url: 'https://the-spot-app.herokuapp.com/api/auth/login',
    data: $scope.user

  }).then( res => {

    if (res.data.status) {
      alert(res.data.message);
      closeModal();
      // NativeStorage.setItem("id_token",res.data.token, () => {
      //   console.('token saved');
      // }, () => {
      //   console.('token not saved');
      //
      // });

    } else {
      alert(res.data.message);

    }

  })
  .catch(error => {

    console.log(error.status);
    console.log(error.error); // error message as string

  });


  $cordovaFacebook.login(["public_profile", "email", "user_friends"])
      .then(function(success) {

        console.log(success);
        // { id: "634565435",
        //   lastName: "bob"
        //   ...
        // }
      }, function (error) {
        // error
      });


    // var options = {
    //   method: "feed",
    //   link: "http://example.com",
    //   caption: "Such caption, very feed."
    // };
    // $cordovaFacebook.showDialog(options)
    //   .then(function(success) {
    //     // success
    //   }, function (error) {
    //     // error
    //   });

    //
    // $cordovaFacebook.api("me", ["public_profile"])
    //   .then(function(success) {
    //     // success
    //   }, function (error) {
    //     // error
    //   });


    $cordovaFacebook.getLoginStatus()
      .then(function(success) {
        /*
        { authResponse: {
            userID: "12345678912345",
            accessToken: "kgkh3g42kh4g23kh4g2kh34g2kg4k2h4gkh3g4k2h4gk23h4gk2h34gk234gk2h34AndSoOn",
            session_Key: true,
            expiresIn: "5183738",
            sig: "..."
          },
          status: "connected"
        }
        */
      }, function (error) {
        // error
      });

    $cordovaFacebook.getAccessToken()
      .then(function(success) {
        // success
      }, function (error) {
        // error
      });

    $cordovaFacebook.logout()
      .then(function(success) {
        // success
      }, function (error) {
        // error
      });





}


});

module.controller('registerCtrl', function ($scope, $http) {

  $scope.user = {};

  $scope.register = function() {

    $http({
      method: 'POST',
      url: 'https://the-spot-app.herokuapp.com/api/auth/register',
      data: $scope.user
    }).then( res => {

      if (res.data.status) {
        alert(res.data.message);
      } else {
        alert(res.data.message);
      }

    })
    .catch(error => {
      console.log(error.status);
      console.log(error.error); // error message as string

    });

  }

});
