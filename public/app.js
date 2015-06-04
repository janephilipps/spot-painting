angular.module('spotPaintingApp', ['ngRoute'])

  .controller("MainCtrl", ['$scope', '$http', function ($scope, $http) {

  }])

  .controller("CreateCtrl", ['$scope', '$http', function ($scope, $http) {

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

  }])

  .controller("PaintingsCtrl", ['$scope', '$http', function ($scope, $http) {

      $http.get('/api/paintings')
        .success(function (paintings) {
          console.log(paintings);
          $scope.paintings = paintings;
        })
        .error(function (paintings) {
          console.log(paintings);
        })

  }])

  .controller("PaintingCtrl", ['$scope', '$http', '$routeParams', function ($scope, $http, $routeParams) {
    console.log($routeParams);
      $http.get('/api/paintings/' + $routeParams.id)
        .success(function (painting) {
          console.log(painting);
          $scope.painting = painting;
        })
        .error(function (painting) {
        })

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
        // .when("/", {
        //   templateUrl: 'views/index.html',
        //   controller: 'MainCtrl'
        // })
        .when("/create", {
          templateUrl: '/views/create.html',
          controller: 'CreateCtrl'
        })
        .when("/paintings", {
          templateUrl: '/views/paintings.html',
          controller: 'PaintingsCtrl'
        })
        .when("/paintings/:id", {
          templateUrl: '/views/painting.html',
          controller: 'PaintingCtrl'
        })
        .otherwise({
          redirectTo: '/'
        });
  }]);

