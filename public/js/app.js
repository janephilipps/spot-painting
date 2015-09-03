angular.module('spotPaintingApp', ['ngRoute'])

  .controller("AboutCtrl", ['$scope', '$http', function ($scope, $http) {

  }])

  .controller("HomeCtrl", ['$scope', '$http', '$interval', function ($scope, $http, $interval) {

    $scope.painting = {
      rows: 8,
      columns: 25,
      colorNumber: 8,
      colors: { 0: 'aquamarine',
                1: 'midnightblue',
                2: 'orangered',
                3: 'dodgerblue',
                4: 'hotpink',
                5: 'gold',
                6: 'lightseagreen',
                7: 'thistle',
                8: 'firebrick'},
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

    $scope.fillRandom();
    $interval(function() {
      $scope.fillRandom();
    }, 2500);

  }])

  .controller("ContactCtrl", ['$scope', '$http', function ($scope, $http) {

  }])

  .controller("HeaderCtrl", ['$scope', '$http', function ($scope, $http) {

  }])

  .controller("FooterCtrl", ['$scope', '$http', function ($scope, $http) {

  }])

  .controller("CreateCtrl", ['$scope', '$http', '$location', function ($scope, $http, $location) {

    $scope.painting = {
      rows: 15,
      columns: 25,
      colorNumber: 3,
      colors: {},
      title: '',
      painting: []
    };

    $scope.cssColors = [
      "aliceblue",
      "antiquewhite",
      "aqua",
      "aquamarine",
      "azure",
      "beige",
      "bisque",
      "black",
      "blanchedalmond",
      "blue",
      "blueviolet",
      "brown",
      "burlywood",
      "cadetblue",
      "chartreuse",
      "chocolate",
      "coral",
      "cornflowerblue",
      "cornsilk",
      "crimson",
      "cyan",
      "darkblue",
      "darkcyan",
      "darkgoldenrod",
      "darkgray",
      "darkgreen",
      "darkkhaki",
      "darkmagenta",
      "darkolivegreen",
      "darkorange",
      "darkorchid",
      "darkred",
      "darksalmon",
      "darkseagreen",
      "darkslateblue",
      "darkslategray",
      "darkturquoise",
      "darkviolet",
      "deeppink",
      "deepskyblue",
      "dimgray",
      "dimgrey",
      "dodgerblue",
      "firebrick",
      "floralwhite",
      "forestgreen",
      "fuchsia",
      "gainsboro",
      "ghostwhite",
      "gold",
      "goldenrod",
      "gray",
      "green",
      "greenyellow",
      "honeydew",
      "hotpink",
      "indianred",
      "indigo",
      "ivory",
      "khaki",
      "lavender",
      "lavenderblush",
      "lawngreen",
      "lemonchiffon",
      "lightblue",
      "lightcoral",
      "lightcyan",
      "lightgoldenrodyellow",
      "lightgray",
      "lightgreen",
      "lightpink",
      "lightsalmon",
      "lightseagreen",
      "lightskyblue",
      "lightslategray",
      "lightsteelblue",
      "lightyellow",
      "lime",
      "limegreen",
      "linen",
      "magenta",
      "maroon",
      "mediumaquamarine",
      "mediumblue",
      "mediumorchid",
      "mediumpurple",
      "mediumseagreen",
      "mediumslateblue",
      "mediumspringgreen",
      "mediumturquoise",
      "mediumvioletred",
      "midnightblue",
      "mintcream",
      "mistyrose",
      "moccasin",
      "navajowhite",
      "navy",
      "oldlace",
      "olive",
      "olivedrab",
      "orange",
      "orangered",
      "orchid",
      "palegoldenrod",
      "palegreen",
      "paleturquoise",
      "palevioletred",
      "papayawhip",
      "peachpuff",
      "peru",
      "pink",
      "plum",
      "powderblue",
      "purple",
      "red",
      "rosybrown",
      "royalblue",
      "saddlebrown",
      "salmon",
      "sandybrown",
      "seagreen",
      "seashell",
      "sienna",
      "silver",
      "skyblue",
      "slateblue",
      "slategray",
      "snow",
      "springgreen",
      "steelblue",
      "tan",
      "teal",
      "thistle",
      "tomato",
      "turquoise",
      "violet",
      "wheat",
      "white",
      "whitesmoke",
      "yellow",
      "yellowgreen"
    ];

    $scope.constants = {
      numberOfColors: function () {
        return $scope.painting.colorNumber;
      }
    };

    $scope.reset = function () {
      $scope.message = "";
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

      if (Object.keys($scope.painting.colors).length === 0) {
        // change error message
        $scope.message = "Please select colors!";
      } else if (!(Object.keys($scope.painting.colors).length === $scope.painting.colorNumber)) {
        // change error message
        $scope.message = "Please select all colors!";
      } else {
        $scope.message = "";
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

    // Tweet button script
    var tweet = function(d,s,id){
      var js,
          fjs = d.getElementsByTagName(s)[0],
          p = /^http:/.test(d.location)?'http':'https';
      console.log("tweet");
      console.log(d.location);
      js = d.createElement(s);
      js.id = id;
      js.src = p + '://platform.twitter.com/widgets.js';
      fjs.parentNode.insertBefore(js,fjs);
    };

    $http.get('/api/paintings/' + $routeParams.id)
      .success(function (painting) {
        console.log(painting);
        tweet(document, 'script', 'twitter-wjs');
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
          templateUrl: '/views/home.html',
          controller: 'HomeCtrl'
        })
        .when("/about", {
          templateUrl: '/views/about.html',
          controller: 'AboutCtrl'
        })
        .when("/contact", {
          templateUrl: '/views/contact.html',
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

