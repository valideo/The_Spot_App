var module = angular.module('starter.controllers', []);

module.controller('HomeCtrl', function ($scope, $http, $ionicModal, $state, announceService) {
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

    if (!localStorage.getItem('isLoggedIn')) {
      $scope.openModalLogin = function () {
          $scope.modal.show();
      };
    }

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

$scope.selectAnnounce = function(announce) {
  $scope.selectedAnnounce = announce;
  announceService.addAnnounce(announce);
  console.log($scope.selectedAnnounce);
}


  $http({
    method: 'GET',
    url: 'https://the-spot-app.herokuapp.com/api/announces'
  }).then( res => {
    $scope.announces = res.data;
    console.log($scope.announces);
  })
  .catch(error => {

    console.log(error.status);
    console.log(error.error); // error message as string

  });

  $scope.logOut = function (){
    localStorage.removeItem('id_token',res.data.token);
    localStorage.removeItem('user',JSON.stringify(res.data.user));
    localStorage.setItem('isLoggedIn',false);
  }

});

module.service('announceService', function() {
  var announceList = [];

  var addAnnounce = function(newObj) {
      announceList.push(newObj);
  };

  var getAnnounces = function(){
      return announceList;
  };

  return {
    addAnnounce: addAnnounce,
    getAnnounces: getAnnounces
  };

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

      localStorage.setItem('id_token',res.data.token);
      localStorage.setItem('user',JSON.stringify(res.data.user));
      localStorage.setItem('isLoggedIn',true);


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

module.controller('detailAnnounceCtrl', function ($scope, $http, announceService ) {
  $scope.announces = announceService.getAnnounces();
  console.log($scope.announces[$scope.announces.length -1]);
  $scope.announce = $scope.announces[$scope.announces.length -1];
  getPublisherInfo($scope.announce.publisherId);


  function getPublisherInfo(uid) {
    $http({
      method: 'POST',
      url: 'https://the-spot-app.herokuapp.com/api/users/profile',
      data: { publisherId: uid }

    }).then( res => {
      console.log(res.data);
      $scope.publisherInfo = res.data;
    });
}




});


module.controller('newAnnounceCtrl', function ($scope, $http ) {
  $scope.newAnnounce = {};

  $scope.categories = [{
      value: 'Electromenager',
      label: 'Electromenager'
    }, {
      value: 'Vetements',
      label: 'Vetements'
    },
    {
      value: 'Vehicules',
      label: 'Vehicules'
    },
     {
      value: 'High-tech',
      label: 'High-tech'
    },
     {
      value: 'Maison',
      label: 'Maison'
    }, {
      value: 'Immobilier',
      label: 'Immobilier'
    }];

    $scope.postAnnounce = function(){
      // $scope.newAnnounce.publisherId = JSON.parse(localStorage.getItem('user')).uid;

      $http({
        method: 'POST',
        url: 'https://the-spot-app.herokuapp.com/api/announces/add',
        data: $scope.newAnnounce

      }).then( res => {
        console.log(res.data);
      });
      console.log($scope.newAnnounce);
    }

  });


  module.controller('announceVideoCtrl', function ($scope, $http ) {

    $http({
      method: 'GET',
      url: "https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyCrYZptTtWO29e5WWOZWbGIRGrJ5ndVW0M&playlistId=PLFmYNJ_DUU2A4ku_lvdUtYl74cLbN_xJi&maxResults=22&part=snippet"
    }).then( res => {
      $scope.videos = res.data.items;
    });

});
