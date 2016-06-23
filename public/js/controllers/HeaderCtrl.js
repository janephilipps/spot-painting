angular.module('HeaderCtrl', []).controller('HeaderController', ['$rootScope', '$scope', '$http', '$location', function($rootScope, $scope, $http, $location) {

    $scope.logout = function () {
        console.log('hello!')
        $rootScope.authenticated = false;
        $rootScope.user = {};
        $location.path('/login');
    }
}]);
