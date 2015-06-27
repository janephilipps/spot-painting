angular.module('spotPaintingApp', ['ngRoute'])

  .controller("AboutCtrl", ['$scope', '$http', function ($scope, $http) {

  }])

  .controller("HomeCtrl", ['$scope', '$http', '$interval', function ($scope, $http, $interval) {

    $scope.test = "hello";

    $scope.painting = {
      rows: 8,
      columns: 25,
      colorNumber: 4,
      colors: { 0: 'cyan',
                1: 'magenta',
                2: 'yellow',
                3: 'black'},
      title: '',
      painting: []
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

    // $scope.fillRandom();

    // $interval.$scope.fillRandom(3000);

    $interval(function() {
      $scope.fillRandom();
    }, 1000);

  }])

  .controller("ContactCtrl", ['$scope', '$http', function ($scope, $http) {

  }])

  .controller("HeaderCtrl", ['$scope', '$http', function ($scope, $http) {

  }])

  .controller("FooterCtrl", ['$scope', '$http', function ($scope, $http) {

  }])

  .controller("CreateCtrl", ['$scope', '$http', '$location', function ($scope, $http, $location) {

    $scope.master = {};

    $scope.painting = {
      rows: 15,
      columns: 25,
      colorNumber: 3,
      colors: {},
      title: '',
      painting: []
    };

    $scope.constants = {
      numberOfColors: function () {
        return $scope.painting.colorNumber;
      }
    };

    $scope.update = function (painting) {
      $scope.master = angular.copy(painting);
    };

    $scope.reset = function () {
      $scope.painting = {
        rows: 15,
        columns: 25,
        colorNumber: 3,
        colors: {},
        title: '',
        painting: []
      };
    };

    $scope.createPainting = function () {
      console.log($scope.painting);
      if (!$scope.painting.title) {
        $scope.message = "Please title your work!";
      } else {
        // save painting
        $http.post('/api/paintings', $scope.painting)
        .success(function (id) {
          console.log("POST ID " + id);
          var path = '/paintings/' + id;
          console.log(path);
          $location.path(path);
        })
        .error(function (data) {
          console.log(data);
        });
      }
    };

    $scope.message = "";

    $scope.getMessage = function () {
      return $scope.message;
    };

    $scope.hasGenerated = function () {
      return ($scope.painting.painting.length !== 0);
    };

    $scope.fillRandom = function () {

      if (!(Object.keys($scope.painting.colors).length === $scope.painting.colorNumber)) {
        // change error message
        $scope.message = "Please select colors!";
      } else {
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
      }

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

  .directive('appHeader', function() {
    return {
      templateUrl: 'views/layouts/header.html',
      controller: 'HeaderCtrl'
    };
  })

  .directive('appFooter', function() {
    return {
      templateUrl: 'views/layouts/footer.html',
      controller: 'FooterCtrl'
    };
  })

  .config(["$routeProvider", "$locationProvider", function($routeProvider, $locationProvider){
      $routeProvider
        // .when("/", {
        //   templateUrl: 'views/index.html',
        //   controller: 'HomeCtrl'
        // })
        .when("/home", {
          templateUrl: 'views/home.html',
          controller: 'HomeCtrl'
        })
        .when("/about", {
          templateUrl: 'views/about.html',
          controller: 'AboutCtrl'
        })
        .when("/contact", {
          templateUrl: 'views/contact.html',
          controller: 'ContactCtrl'
        })
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
          redirectTo: '/home'
        });
  }]);

