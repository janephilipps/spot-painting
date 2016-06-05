angular.module('PaintingsCtrl', []).controller('PaintingsController', ['$scope', '$http', function($scope, $http) {

  $http.get('/api/paintings')
    .success(function (paintings) {
      $scope.paintings = paintings;
    })
    .error(function (paintings) {
    });

}]);
