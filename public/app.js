angular.module('spotPaintingApp', ['ngRoute'])

  .controller("MainCtrl", ['$scope', '$http', function ($scope, $http) {

    $scope.master = {};

    $scope.painting = {
      rows: 15,
      columns: 25,
      colors: {},
      title: '',
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

    $scope.createPainting = function () {
      console.log($scope.painting);
      $http.post('/api/paintings', $scope.painting)
        .success(function (data) {
          console.log(data);
        })
        .error(function (data) {
          console.log(data);
        })
    };

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

      for (var i = 0; i < r; i++) {
        array.push([]);
        for (var j = 0; j < c; j++) {
          var rand = Math.floor(Math.random() * arrColors.length);
          array[i].push(arrColors[rand]);
        }
      }

      // Then save the array
      $scope.painting.painting = array;
    };

    $scope.showGallery = function () {
      $http.get('/paintings', $scope.painting)
        .success(function (data) {
          console.log(data);
          JSON.parse(data);
        })
        .error(function (data) {
          console.log(data);
        })
    };

  }])

  .controller("PaintingCtrl", ['$scope', '$http', function ($scope, $http) {

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

  .config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
      $routeProvider
        .when("/paintings", {
          templateUrl: '/views/index.html',
          controller: 'PaintingCtrl'
        });

      $locationProvider.html5Mode(true);
  }]);

