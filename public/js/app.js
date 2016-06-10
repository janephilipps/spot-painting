var app = angular.module('spotPaintingApp', ['ngRoute', 'ngResource', 'HomeCtrl', 'CreateCtrl', 'PaintingsCtrl', 'PaintingCtrl', 'RegisterCtrl', 'LoginCtrl']);

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
      templateUrl: 'views/layouts/header.html'
    };
  });

  app.directive('appFooter', function() {
    return {
      templateUrl: 'views/layouts/footer.html'
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
        .when('/signup', {
          templateUrl: '/views/register.html',
          controller: 'RegisterController'
        })
        .when('/login', {
          templateUrl: '/views/login.html',
          controller: 'LoginController'
        })
        .otherwise({
          redirectTo: '/home'
        });
  }]);
