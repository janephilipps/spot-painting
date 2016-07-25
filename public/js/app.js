var app = angular.module('spotPaintingApp', ['ngRoute', 'ngResource', 'HomeCtrl', 'CreateCtrl', 'PaintingsCtrl', 'PaintingCtrl', 'HeaderCtrl', 'ProfileCtrl', 'Auth']);

  app.filter('range', function () {
    return function (input, total) {
      total = parseInt(total);
      for (var i = 0; i < total; i++) {
        input.push(i);
      }
      return input;
    };
  });

  app.directive('appHeader', function() {
    return {
      templateUrl: 'views/partials/header.html',
      controller: 'HeaderController'
    };
  });

  app.directive('appFooter', function() {
    return {
      templateUrl: 'views/partials/footer.html'
    };
  });

  app.directive('paintingsArray', function() {
    return {
      templateUrl: 'views/partials/paintingsArray.html'
    };
  });

  app.directive('singlePainting', function() {
    return {
      templateUrl: 'views/partials/singlePainting.html'
    };
  });

  app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider){
      $routeProvider
        .when('/home', {
          templateUrl: '/views/home.html',
          controller: 'HomeController'
        })
        .when('/about', {
          templateUrl: '/views/about.html'
        })
        .when('/contact', {
          templateUrl: '/views/contact.html'
        })
        .when('/create', {
          templateUrl: '/views/create.html',
          controller: 'CreateController'
        })
        .when('/paintings', {
          templateUrl: '/views/paintings.html',
          controller: 'PaintingsController'
        })
        .when('/paintings/:id', {
          templateUrl: '/views/painting.html',
          controller: 'PaintingController'
        })
        .when('/profile', {
          templateUrl: '/views/profile.html',
          controller: 'ProfileController'
        })
        .when('/users/:id', {
          templateUrl: '/views/profile.html',
          controller: 'ProfileController'
        })
        .otherwise({
          redirectTo: '/home'
        });
  }]);
