angular.module('LoginCtrl', []).controller('LoginController', ['$scope', '$http', function($scope, $http) {

    $scope.user = {};

    $scope.login = function () {
        $http.post('/api/login', $scope.user)
            .success(function (userEmail) {
                console.log("Logged in: ", userEmail);
            })
            .error(function (err) {
                console.log("Error: " + err);
            });
    };

}]);
