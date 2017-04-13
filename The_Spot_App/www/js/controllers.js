var module = angular.module('starter.controllers', []);

module.controller('HomeCtrl', function ($scope, $http, $ionicModal, $state) {
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

  $http({
    method: 'GET',
    url: 'https://the-spot-app.herokuapp.com/api/announces'
  }).then( res => {
    $scope.announces = res.data;
    console.log($scope.announces);
      // NativeStorage.setItem("id_token",res.data.token, () => {
      //   console.('token saved');
      // }, () => {
      //   console.('token not saved');
      //
      // });
  })
  .catch(error => {

    console.log(error.status);
    console.log(error.error); // error message as string

  });



});

module.controller('loginCtrl', function ($scope, $http, $ionicModal, $ionicPopup, $timeout, $cordovaInAppBrowser) {


  function closeModal() {
    $scope.modal.hide();
  };

  function showAlert (title,description,callback) {
     var alertPopup = $ionicPopup.alert({
       title: title,
       template: description
     });
     callback();
   };

$scope.user = {};

$scope.login = function() {

  $http({
    method: 'POST',
    url: 'https://the-spot-app.herokuapp.com/api/auth/login',
    data: $scope.user

  }).then( res => {

    if (res.data.status) {
      showAlert('Félicitation','Vous êtes bien connecté ' + res.data.user.firstname + ' ' + res.data.user.lastname , function(){
        closeModal();
      });

      // NativeStorage.setItem("id_token",res.data.token, () => {
      //   console.('token saved');
      // }, () => {
      //   console.('token not saved');
      //
      // });

    } else {
      showAlert('Désoleé',res.data.message, function(){
      });

    }

  })
  .catch(error => {

    console.log(error.status);
    console.log(error.error); // error message as string

  });

}


});

module.controller('registerCtrl', function ($scope, $http, $ionicPopup, $timeout) {

   function closeModalOpenLogin () {
      $scope.modalRegister.hide().then(function () {

          $scope.modal.show();
      })
  };

  function showAlert (title,description,callback) {
     var alertPopup = $ionicPopup.alert({
       title: title,
       template: description
     });
     callback();
   };


  $scope.roles = [{
      value: 'seller',
      label: 'Vendeur'
    }, {
      value: 'customer',
      label: 'Client'
    }];

  $scope.user = {};

  $scope.register = function() {

    $http({
      method: 'POST',
      url: 'https://the-spot-app.herokuapp.com/api/auth/register',
      data: $scope.user
    }).then( res => {

      if (res.data.status) {
        showAlert('Félicitation','Votre compte a bien été crée ' , function(){
          closeModalOpenLogin();
        });
      } else {
        showAlert('Désoleé',res.data.message, function(){
        });
      }

    });
  }

});