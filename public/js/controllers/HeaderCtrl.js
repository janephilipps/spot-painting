angular.module('HeaderCtrl', []).controller('HeaderController', ['$rootScope', '$scope', '$http', '$location', function($rootScope, $scope, $http, $location) {

  $scope.logout = function () {
    $rootScope.authenticated = false;
    $rootScope.authenticatedUser = null;
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
    $http.post('/api/login', $scope.user)
      .success(function (user) {
        $scope.closeModal();
        $rootScope.authenticated = true;
        $rootScope.authenticatedUser = user;
      })
      .error(function (err) {
      });
  };

  $scope.register = function () {

    if (!$scope.user.email || !$scope.user.username || !$scope.user.password) {
      // TODO: Handle the error.
    } else if ($scope.user.password !== $scope.user.confirmPassword) {
      // TODO: Handle the error.
    } else {
      return $http.post('/api/signup', $scope.user)
      .success(function (data, status, headers, config) {
        $scope.closeModal();
        $rootScope.authenticated = true;
        $rootScope.authenticatedUser = data;
      })
      .error(function (data, status, headers, config, err) {
        $scope.error = err;
      });
    }
  };

}]);
