angular.module('RegisterCtrl', []).controller('RegisterController', ['$scope', '$http', function($scope, $http) {

    $scope.user = {};

    $scope.register = function () {

        if ($scope.user.password !== $scope.user.confirmPassword) {
            console.log('passwords don\'t match!');
        } else {
            return $http.post('/api/signup', $scope.user)
            .success(function (data, status, headers, config) {
            })
            .error(function (data, status, headers, config) {
            });
        }
    };

}]);
