angular.module('Auth', ['ngStorage']).factory('AuthService', ['$http', '$sessionStorage', function($http, $sessionStorage) {

  var service = {};

  var loggedInUserKey = 'loggedInUser';

  var _setLoggedInUser = function (loggedInUser) {
    $sessionStorage[loggedInUserKey] = loggedInUser;
  };

  service.login = function (user, onSuccess, onError) {
    $http.post('/api/login', user)
      .success(function (loggedInUser) {
        _setLoggedInUser(loggedInUser);
        onSuccess && onSuccess(loggedInUser);
      })
      .error(function (err) {
        onError && onError(err);
      });
  };

  service.register = function (user, onSuccess, onError) {
   if (!user.email || !user.username || !user.password) {
      // TODO: Handle the error.
    } else if (user.password !== user.confirmPassword) {
      // TODO: Handle the error.
    } else {
      return $http.post('/api/signup', user)
      .success(function (data, status, headers, config) {
        _setLoggedInUser(data);
        onSuccess && onSuccess(data);
      })
      .error(function (data, status, headers, config, err) {
        onError && onError(err);
      });
    }
  };

  service.isLoggedIn = function () {
    return service.getLoggedInUser() != null;
  };

  service.getLoggedInUser = function () {
    return $sessionStorage[loggedInUserKey];
  };

  service.logout = function () {
    delete $sessionStorage[loggedInUserKey];
  }

  return service;

}]);
