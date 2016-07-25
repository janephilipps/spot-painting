angular.module('ProfileCtrl', []).controller('ProfileController', ['AuthService', '$scope', '$http', '$location', '$routeParams', function(AuthService, $scope, $http, $location, $routeParams) {

  var profileUserId = $routeParams.id;
  if (!profileUserId) {
    if (AuthService.isLoggedIn()) {
      profileUserId = AuthService.getLoggedInUser()._id;
    } else {
      $location.path('/login');
    }
  }

  $http.get('/api/users/' + profileUserId)
    .success(function (user) {
      $scope.profileUser = user;
    });

  $http.get('/api/paintings?user=' + profileUserId)
    .success(function (paintings) {
      $scope.paintings = paintings;
    });

  $scope.isSameUser = function () {
    return $scope.profileUser &&
           AuthService.isLoggedIn() &&
           ($scope.profileUser._id === AuthService.getLoggedInUser()._id);
  };

}]);
