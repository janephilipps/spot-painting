angular.module('PaintingCtrl', []).controller('PaintingController', ['$scope', '$http', '$routeParams', function($scope, $http, $routeParams) {

  console.log($routeParams);

  // Tweet button script
  var tweet = function(d,s,id){
    var js,
        fjs = d.getElementsByTagName(s)[0],
        p = /^http:/.test(d.location)?'http':'https';
    console.log("tweet");
    console.log(d.location);
    js = d.createElement(s);
    js.id = id;
    js.src = p + '://platform.twitter.com/widgets.js';
    fjs.parentNode.insertBefore(js,fjs);
  };

  $http.get('/api/paintings/' + $routeParams.id)
    .success(function (painting) {
      console.log(painting);
      tweet(document, 'script', 'twitter-wjs');
      $scope.painting = painting;
    })
    .error(function (painting) {
    });


}]);
