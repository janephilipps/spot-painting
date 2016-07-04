angular.module('HeaderCtrl', []).controller('HeaderController', ['$rootScope', '$scope', '$http', '$location', function($rootScope, $scope, $http, $location) {

    $scope.logout = function () {
        $rootScope.authenticated = false;
        $rootScope.authenticatedUser = {};
        $location.path('/login');
    }
}]);
