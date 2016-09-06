angular.module('PaintingsCtrl', []).controller('PaintingsController', ['$scope', '$http', '$location', '$timeout', function($scope, $http, $location, $timeout) {

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

  $http.get(`/api/paintings?limit=${$scope.pageSize}&offset=${$scope.offset()}`)
    .success(function (repsonse) {
      $scope.paintings = repsonse.paintings;
      $scope.total = repsonse.total;
      if ($scope.currentPage > $scope.maxPage()) {
        $location.search('page', 1);
      }
      $timeout(function() {
        $scope.renderCanvas();
      });
    })
    .error(function (paintings) {
    });

  $scope.renderCanvas = function() {

    var paintings = $scope.paintings;

    var canvases = document.getElementsByClassName('painting');

    for (var k = 0; k < paintings.length; k++) {
      // debugger;
      var canvas = canvases[k].children[0];
      var ctx = canvas.getContext('2d');
      ctx.canvas.width = (paintings[k].columns * 25) + ((paintings[k].columns - 1) * 20);
      ctx.canvas.height = (paintings[k].rows * 25) + ((paintings[k].rows - 1) * 20);
      var x = 12.5;
      var y = 12.5;

      ctx.fillStyle = '#FFF';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      for (var j = 0; j < paintings[k].painting.length; j++) {
        for (var i = 0; i < paintings[k].painting[j].length; i++) {
          ctx.fillStyle = paintings[k].painting[j][i];
          ctx.beginPath();
          ctx.arc(x, y, 12.5, 0, 2 * Math.PI);
          ctx.fill();
          x += 45;
          ctx.moveTo(x, y);
        }
        x = 12.5;
        y += 45;
      }
    }
  }

}]);
