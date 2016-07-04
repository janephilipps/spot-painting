angular.module('RegisterCtrl', []).controller('RegisterController', ['$rootScope', '$scope', '$http', '$location', function($rootScope, $scope, $http, $location) {

    $scope.user = {};

    $scope.register = function () {

        if (!$scope.user.email || !$scope.user.username || !$scope.user.password) {
            // TODO: Handle the error.
        } else if ($scope.user.password !== $scope.user.confirmPassword) {
            // TODO: Handle the error.
        } else {
            return $http.post('/api/signup', $scope.user)
            .success(function (data, status, headers, config) {
                $location.path('/login');
            })
            .error(function (data, status, headers, config, err) {
                $scope.error = err;
            });
        }
    };

}]);
