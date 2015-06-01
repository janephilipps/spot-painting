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

    $scope.fillRandom = function () {
      var colors = $scope.painting.colors;
      var arrColors = [];
      for (var key in colors) {
          var color = colors[key];
          arrColors.push(color);
      }

      // Given some rows, columns, and an empty array
      var r = $scope.painting.rows,
          c = $scope.painting.columns,
          array = [];

      // Tell that array what it's length should be
      array.length = r * c;

      // Then fill the array
      for (var i = 0; i < array.length; i++) {
          var rand = Math.floor(Math.random() * arrColors.length);
          array[i] = arrColors[rand];
      }

      // Then return the array
      $scope.painting.painting = array;
    }


    $scope.generate = function () {

      $scope.painting.painting.length = $scope.painting.rows * $scope.painting.columns;

      console.log($scope.painting.painting.length);

      $scope.fill($scope.painting.painting.length, $scope.painting.colors[0]);

      // $scope.fillRandom($scope.painting.painting);

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