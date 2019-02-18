angular.module('Canvas', []).factory('CanvasService', [function() {

  var service = {};

  _renderPaintingOnCanvas = function(painting, canvas) {

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

    var dataUrl = canvas.toDataURL();
    return dataUrl;

  }

  service.renderCanvas = function(painting, i) {

    var canvas = document.getElementsByTagName('canvas')[i];

    return _renderPaintingOnCanvas(painting, canvas);

  };

  return service;

}]);
