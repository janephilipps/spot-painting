angular.module('RegisterCtrl', []).controller('RegisterController', ['$rootScope', '$scope', '$http', '$location', function($rootScope, $scope, $http, $location) {

    $scope.user = {};

    $scope.register = function () {

        if ($scope.user.password !== $scope.user.confirmPassword) {
            console.log('passwords don\'t match!');
        } else {
            return $http.post('/api/signup', $scope.user)
            .success(function (data, status, headers, config) {
                $location.path('/login');
            })
            .error(function (data, status, headers, config, err) {
                console.log(err);
                $scope.error = err;
            });
        }
    };

}]);
