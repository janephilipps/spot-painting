angular.module('Auth', []).factory('AuthService', ['$http', function($http) {

  var service = {};

  var _loggedInUser;

  var _setLoggedInUser = function (loggedInUser) {
    _loggedInUser = loggedInUser;
  };

  var _unsetLoggedInUser = function () {
    _loggedInUser = null;
  };

  var _getLoggedInUser = function () {
    return _loggedInUser;
  }

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
    return _getLoggedInUser() != null;
  };

  service.getLoggedInUser = function () {
    return _getLoggedInUser();
  };

  service.logout = function () {
    $http.delete('api/logout')
      .success(function () {
        _unsetLoggedInUser();
      });
  }

  $http.get('/api/loggedInUser')
    .success(function (user) {
      if (user) {
        _setLoggedInUser(user);
      } else {
        _unsetLoggedInUser();
      }
    });
  return service;

}]);
