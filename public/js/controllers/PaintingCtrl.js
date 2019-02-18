angular.module('PaintingCtrl', []).controller('PaintingController', ['CanvasService', '$scope', '$http', '$routeParams', function(CanvasService, $scope, $http, $routeParams) {

  // Tweet button script
  var tweet = function(d,s,id) {
    var js,
        fjs = d.getElementsByTagName(s)[0],
        p = /^http:/.test(d.location)?'http':'https'
    ;
    js = d.createElement(s);
    js.id = id;
    js.src = p + '://platform.twitter.com/widgets.js';
    fjs.parentNode.insertBefore(js,fjs);
  };

  $http.get('/api/paintings/' + $routeParams.id)
    .success(function (painting) {
      tweet(document, 'script', 'twitter-wjs');
      $scope.painting = painting;
      $scope.painting.dataUrl = CanvasService.renderCanvas(painting, 0);
    })
    .error(function (painting) {
    });

}]);
