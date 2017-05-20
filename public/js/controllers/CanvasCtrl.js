angular.module('CanvasCtrl', []).controller('CanvasController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

  $http.get('/api/paintings/' + $routeParams.id)
    .success(function (painting) {
      $scope.painting = painting;
      $scope.renderCanvas(painting);
    })
    .error(function (painting) {
    });

  $scope.renderCanvas = function(painting) {

    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    ctx.canvas.width = (painting.columns * 25) + ((painting.columns - 1) * 20);
    ctx.canvas.height = (painting.rows * 25) + ((painting.rows - 1) * 20);
    var x = 12.5;
    var y = 12.5;

    ctx.fillStyle = '#FFF';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    for (var j = 0; j < painting.painting.length; j++) {
      for (var i = 0; i < painting.painting[j].length; i++) {
        ctx.fillStyle = painting.painting[j][i];
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

}]);
