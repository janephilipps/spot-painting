angular.module('Auth', []).factory('AuthService', ['$http', function($http) {

  var service = {};

  var _loggedInUser;

  var _setLoggedInUser = function (loggedInUser) {
    _loggedInUser = loggedInUser;
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
    return _loggedInUser != null;
  };

  service.getLoggedInUser = function () {
    return _loggedInUser;
  };

  service.logout = function () {
    _loggedInUser = null;
  }

  service.logout();

  return service;

}]);
