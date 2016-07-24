angular.module('HomeCtrl', []).controller('HomeController', ['$rootScope', '$scope', '$http', '$interval', function($rootScope, $scope, $http, $interval) {

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

    $scope.painting.painting = array;
  };

  $scope.fillRandom();
  $interval(function () {
    $scope.fillRandom();
  }, 2500);

}]);
