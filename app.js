angular.module('spotPaintingApp', ['ngRoute'])

  .controller("MainCtrl", ['$scope', function ($scope) {

    $scope.master = {};

    $scope.painting = {
      rows: 3,
      columns: 3,
      colors: {},
      painting: []
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

    $scope.fill = function (length, value) {
      $scope.painting.painting = [];
      for (var i = 0; i < length; i++) {
        $scope.painting.painting.push(value);
      }

      return $scope.painting.painting;
    }

    $scope.generate = function () {

      $scope.painting.painting.length = $scope.painting.rows * $scope.painting.columns;

      console.log($scope.painting.painting.length);

      $scope.fill($scope.painting.painting.length, $scope.painting.colors[0]);

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