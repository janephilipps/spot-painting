angular.module('Canvas', []).factory('CanvasService', ['$http', function($http) {

  var service = {};

  service.renderCanvas = function(painting) {
    console.log('CANVAS!!!');

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
  };

  return service;

}]);
