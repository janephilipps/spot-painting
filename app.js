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

    $scope.generate = function () {
      getRandomColor();
    }

    $scope.getRandomColor = function () {
      return $scope.painting.colors[Math.floor(Math.random() * $scope.constants.numberOfColors())];

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