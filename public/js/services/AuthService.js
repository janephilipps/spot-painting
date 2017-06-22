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
      .error(function () {
        var message = 'Incorrect username or password!';
        onError && onError(message);
      });
  };

  var _validateUser = function(user) {
    if (!user.email) {
      return 'Please enter an email';
    } else if (!user.username) {
      return 'Please enter a username';
    } else if (!user.password) {
      return 'Please enter a password';
    } else if (user.password !== user.confirmPassword) {
      return 'Your passwords don\'t match. Try again!';
    }
  }

  service.register = function (user, onSuccess, onError) {
    var errorMessage = _validateUser(user);
    if (errorMessage)
      onError && onError(errorMessage);
    } else {
      return $http.post('/api/signup', user)
      .success(function (data, status, headers, config) {
        _setLoggedInUser(data);
        onSuccess && onSuccess(data);
      })
      .error(function (data, status, headers, config, err) {
        // TODO: Handle specific errors
        var message = 'Sorry, there was a problem. Please try again!'
        onError && onError(message);
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
