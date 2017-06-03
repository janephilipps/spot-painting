angular.module('ProfileCtrl', []).controller('ProfileController', ['AuthService', 'CanvasService', '$scope', '$http', '$location', '$routeParams', '$timeout', function(AuthService, CanvasService, $scope, $http, $location, $routeParams, $timeout) {

  $scope.pageSize = Math.min(20, $location.search().pageSize) || 5;

  $scope.currentPage = +$location.search().page || 1;

  $scope.offset = function () {
    return ($scope.currentPage - 1) * $scope.pageSize;
  };

  $scope.previousPage = function () {
    return $scope.currentPage - 1;
  };

  $scope.goPreviousPage = function () {
    $location.search('page', $scope.previousPage());
  }

  $scope.nextPage = function () {
    return $scope.currentPage + 1;
  }

  $scope.goNextPage = function () {
    $location.search('page', $scope.nextPage());
  }

  $scope.maxPage = function () {
    return Math.ceil($scope.total / $scope.pageSize);
  }

  $scope.hasNextPage = function () {
    return $scope.currentPage < $scope.maxPage();
  };

  $scope.hasPreviousPage = function () {
    return $scope.currentPage > 1;
  };


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

  $http.get(`/api/paintings?user=${profileUserId}&limit=${$scope.pageSize}&offset=${$scope.offset()}`)
    .success(function (response) {
      $scope.paintings = response.paintings;
      $scope.total = response.total;
      if ($scope.currentPage > $scope.maxPage()) {
        $location.search('page', 1);
      }
      $timeout(function() {
        CanvasService.renderCanvases($scope.paintings);
      });
    });

  $scope.isSameUser = function () {
    return $scope.profileUser &&
           AuthService.isLoggedIn() &&
           ($scope.profileUser._id === AuthService.getLoggedInUser()._id);
  };

}]);
