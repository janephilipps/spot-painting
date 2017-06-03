angular.module('Canvas', []).factory('CanvasService', [function() {

  var service = {};

  service.renderCanvas = function(painting) {
    console.log('CANVAS SERVICE!!!');

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

  service.renderCanvases = function(paintings) {

    console.log('renderCanvases!!!');

    var canvases = document.getElementsByClassName('painting');

    for (var k = 0; k < paintings.length; k++) {
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

  return service;

}]);
