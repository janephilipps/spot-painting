angular.module('LoginCtrl', []).controller('LoginController', ['$rootScope', '$scope', '$http', '$location', function($rootScope, $scope, $http, $location) {

    $scope.user = {};

    $scope.login = function () {
        $http.post('/api/login', $scope.user)
            .success(function (user) {
                console.log("Logged in: ", user);
                $rootScope.authenticated = true;
                $rootScope.user = user;
                $location.path('/profile');
            })
            .error(function (err) {
                console.log("Error: " + err);
            });
    };

}]);
