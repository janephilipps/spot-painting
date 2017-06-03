angular.module('CanvasCtrl', []).controller('CanvasController', ['CanvasService', '$scope', '$http', '$routeParams', function(CanvasService, $scope, $http, $routeParams) {

  $http.get('/api/paintings/' + $routeParams.id)
    .success(function (painting) {
      $scope.painting = painting;
      CanvasService.renderCanvas(painting);
    })
    .error(function (painting) {
    });

}]);
