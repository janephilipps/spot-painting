angular.module('PaintingsCtrl', []).controller('PaintingsController', ['$rootScope', '$scope', '$http', function($rootScope, $scope, $http) {

  $http.get('/api/paintings')
    .success(function (paintings) {
      $scope.paintings = paintings;
    })
    .error(function (paintings) {
    });

}]);
