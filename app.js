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

    $scope.generate = function () {
      // $scope.getRandomColor();
    };

    $scope.getRandomColor = function () {
      var colorIndex = Math.floor(Math.random() * $scope.constants.numberOfColors());
      return $scope.painting.colors[colorIndex];
    };

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