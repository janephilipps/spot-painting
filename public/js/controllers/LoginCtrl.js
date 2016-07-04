angular.module('LoginCtrl', []).controller('LoginController', ['$rootScope', '$scope', '$http', '$location', function($rootScope, $scope, $http, $location) {

    $scope.user = {};

    $scope.login = function () {
        $http.post('/api/login', $scope.user)
            .success(function (user) {
                $rootScope.authenticated = true;
                $rootScope.authenticatedUser = user;
                $location.path('/profile');
            })
            .error(function (err) {
            });
    };

}]);
