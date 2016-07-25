angular.module('HeaderCtrl', []).controller('HeaderController', ['$scope', '$http', '$location', 'AuthService', function($scope, $http, $location, AuthService) {

  $scope.logout = function () {
    AuthService.logout();
    $location.path('/login');
  }

  $scope.currentModal = null;

  $scope.showModal = function (name) {
    $scope.user = {};
    $scope.currentModal = name;
  };

  $scope.closeModal = function () {
    $scope.showModal(null);
  };

  $scope.showLogin = function () {
    $scope.showModal('login');
  };

  $scope.showRegister = function () {
    $scope.showModal('register');
  };

  $scope.login = function () {
    AuthService.login($scope.user, function () {
      $scope.closeModal();
    });
  };

  $scope.isLoggedIn = function () {
    return AuthService.isLoggedIn();
  };

  $scope.getLoggedInUser = function () {
    return AuthService.getLoggedInUser();
  }

  $scope.register = function () {
    AuthService.register($scope.user, function () {
      $scope.closeModal();
    });
  };

}]);
