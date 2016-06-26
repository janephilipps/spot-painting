angular.module('PublicProfileCtrl', []).controller('PublicProfileController', ['$rootScope', '$scope', '$http', '$location', '$routeParams', function($rootScope, $scope, $http, $location, $routeParams) {

  $http.get('/api/users/' + $routeParams.id)
    .success(function (user) {
      $scope.user = user;
    })

}]);
