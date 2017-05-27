angular.module('PaintingsCtrl', []).controller('PaintingsController', ['$scope', '$http', '$timeout', function($scope, $http, $timeout) {

  $http.get('/api/paintings')
    .success(function (paintings) {
      $scope.paintings = paintings;
      $timeout(function() {
        $scope.renderCanvas();
      });
    })
    .error(function (paintings) {
    });

  $scope.renderCanvas = function() {

    var paintings = $scope.paintings;

    var canvases = document.getElementsByClassName('painting');

    for (var k = 0; k < paintings.length; k++) {
      // debugger;
      var canvas = canvases[k].children[0];
      var ctx = canvas.getContext('2d');
      ctx.canvas.width = (paintings[k].columns * 25) + ((paintings[k].columns - 1) * 20);
      ctx.canvas.height = (paintings[k].rows * 25) + ((paintings[k].rows - 1) * 20);
      var x = 12.5;
      var y = 12.5;

      ctx.fillStyle = '#FFF';
      ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

      for (var j = 0; j < paintings[k].painting.length; j++) {
        for (var i = 0; i < paintings[k].painting[j].length; i++) {
          ctx.fillStyle = paintings[k].painting[j][i];
          ctx.beginPath();
          ctx.arc(x, y, 12.5, 0, 2 * Math.PI);
          ctx.fill();
          x += 45;
          ctx.moveTo(x, y);
        }
        x = 12.5;
        y += 45;
      }
    }
  }

}]);
