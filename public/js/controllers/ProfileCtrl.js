angular.module('ProfileCtrl', []).controller('ProfileController', ['$rootScope', '$scope', '$http', '$location', '$routeParams', function($rootScope, $scope, $http, $location, $routeParams) {

  var profileUserId = $routeParams.id;
  if (!profileUserId) {
    if ($rootScope.authenticatedUser) {
      profileUserId = $rootScope.authenticatedUser._id;
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
           $rootScope.authenticatedUser &&
           ($scope.profileUser._id === $rootScope.authenticatedUser._id);
  };

}]);
