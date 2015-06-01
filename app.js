angular.module('spotPaintingApp', ['ngRoute'])

  .controller("MainCtrl", ['$scope', function ($scope) {

    $scope.master = {};

    $scope.painting = {
      rows: 3,
      columns: 3,
      colors: {}
    };

    $scope.constants = {
      numberOfColors: function () {
        return $scope.painting.rows;
      }
    };

    $scope.update = function (painting) {
      $scope.master = angular.copy(painting);
    };

    $scope.reset = function () {
      $scope.painting = angular.copy($scope.master);
    };

    $scope.reset();

    $scope.getRandomColor = function () {
      console.log($scope.painting.colors[Math.floor(Math.random() * $scope.constants.numberOfColors())]);
      return $scope.painting.colors[Math.floor(Math.random() * $scope.constants.numberOfColors())];
      // return $scope.painting.colors[0];
      // return Math.random($scope.painting.colors);
      // return "#2561d8";
    }

  }])

  .filter('range', function () {
    return function (input, total) {
      total = parseInt(total);
      for (var i = 0; i < total; i++) {
        input.push(i);
      }
      return input;
    };
  })