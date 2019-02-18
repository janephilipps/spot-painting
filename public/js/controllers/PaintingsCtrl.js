angular.module('PaintingsCtrl', []).controller('PaintingsController', ['CanvasService', '$scope', '$http', '$location', '$timeout', function(CanvasService, $scope, $http, $location, $timeout) {

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

  $scope.getPaintings = function() {
    $http.get(`/api/paintings?limit=${$scope.pageSize}&offset=${$scope.offset()}`)
      .success(function (response) {
        $scope.paintings = response.paintings;
        $scope.total = response.total;
        if ($scope.currentPage > $scope.maxPage()) {
          $location.search('page', 1);
        }
        $timeout(function() {
          for (var i = 0; i < $scope.paintings.length; i++) {
            $scope.paintings[i].dataUrl = CanvasService.renderCanvas($scope.paintings[i], i);
          }
        });
      })
      .error(function (paintings) {
      });
  };

}]);
