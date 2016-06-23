angular.module('CreateCtrl', []).controller('CreateController', ['$rootScope', '$scope', '$http', '$location', function($rootScope, $scope, $http, $location) {

  $scope.painting = {
    rows: 15,
    columns: 25,
    colorNumber: 3,
    colors: {},
    title: '',
    painting: []
  };

  $scope.cssColors = [
    'aliceblue',
    'antiquewhite',
    'aqua',
    'aquamarine',
    'azure',
    'beige',
    'bisque',
    'black',
    'blanchedalmond',
    'blue',
    'blueviolet',
    'brown',
    'burlywood',
    'cadetblue',
    'chartreuse',
    'chocolate',
    'coral',
    'cornflowerblue',
    'cornsilk',
    'crimson',
    'cyan',
    'darkblue',
    'darkcyan',
    'darkgoldenrod',
    'darkgray',
    'darkgreen',
    'darkkhaki',
    'darkmagenta',
    'darkolivegreen',
    'darkorange',
    'darkorchid',
    'darkred',
    'darksalmon',
    'darkseagreen',
    'darkslateblue',
    'darkslategray',
    'darkturquoise',
    'darkviolet',
    'deeppink',
    'deepskyblue',
    'dimgray',
    'dimgrey',
    'dodgerblue',
    'firebrick',
    'floralwhite',
    'forestgreen',
    'fuchsia',
    'gainsboro',
    'ghostwhite',
    'gold',
    'goldenrod',
    'gray',
    'green',
    'greenyellow',
    'honeydew',
    'hotpink',
    'indianred',
    'indigo',
    'ivory',
    'khaki',
    'lavender',
    'lavenderblush',
    'lawngreen',
    'lemonchiffon',
    'lightblue',
    'lightcoral',
    'lightcyan',
    'lightgoldenrodyellow',
    'lightgray',
    'lightgreen',
    'lightpink',
    'lightsalmon',
    'lightseagreen',
    'lightskyblue',
    'lightslategray',
    'lightsteelblue',
    'lightyellow',
    'lime',
    'limegreen',
    'linen',
    'magenta',
    'maroon',
    'mediumaquamarine',
    'mediumblue',
    'mediumorchid',
    'mediumpurple',
    'mediumseagreen',
    'mediumslateblue',
    'mediumspringgreen',
    'mediumturquoise',
    'mediumvioletred',
    'midnightblue',
    'mintcream',
    'mistyrose',
    'moccasin',
    'navajowhite',
    'navy',
    'oldlace',
    'olive',
    'olivedrab',
    'orange',
    'orangered',
    'orchid',
    'palegoldenrod',
    'palegreen',
    'paleturquoise',
    'palevioletred',
    'papayawhip',
    'peachpuff',
    'peru',
    'pink',
    'plum',
    'powderblue',
    'purple',
    'red',
    'rosybrown',
    'royalblue',
    'saddlebrown',
    'salmon',
    'sandybrown',
    'seagreen',
    'seashell',
    'sienna',
    'silver',
    'skyblue',
    'slateblue',
    'slategray',
    'snow',
    'springgreen',
    'steelblue',
    'tan',
    'teal',
    'thistle',
    'tomato',
    'turquoise',
    'violet',
    'wheat',
    'white',
    'whitesmoke',
    'yellow',
    'yellowgreen'
  ];

  $scope.constants = {
    numberOfColors: function () {
      return $scope.painting.colorNumber;
    }
  };

  $scope.reset = function () {
    $scope.message = '';
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
    if (!$scope.painting.title) {
      $scope.message = 'Please title your work!';
    } else {
      $http.post('/api/paintings', $scope.painting)
      .success(function (id) {
        var path = '/paintings/' + id;
        $location.path(path);
      })
      .error(function (data) {
      });
    }
  };

  $scope.message = '';

  $scope.getMessage = function () {
    return $scope.message;
  };

  $scope.hasGenerated = function () {
    return ($scope.painting.painting.length !== 0);
  };

  $scope.fillRandom = function () {

    if (Object.keys($scope.painting.colors).length === 0) {
      $scope.message = 'Please select colors!';
    } else if (!(Object.keys($scope.painting.colors).length === $scope.painting.colorNumber)) {
      $scope.message = 'Please select all colors!';
    } else {
      $scope.message = '';
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
    }

  };

}]);
