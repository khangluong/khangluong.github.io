var app = angular.module('app', []);
app.controller('Ctrl', function($scope, $http, $interval) {
  $scope.data = [];
  $scope.dist = [];
  $scope.liveUrl = "";
  // hot reload
    $interval(function(){
        if ($scope.selectedCamera !== undefined){
            $scope.liveUrl = 'http://api.notis.vn/v3/' + $scope.selectedCamera.liveUrl + '?t=' + Date.now();
        }
    }, 100);
  //
  $http.get("http://api.notis.vn/v3/cameras/findall")
    .then(function(res){
      $scope.data = res.data;
      $scope.data.forEach(function(e){
          var existed = false;
          for (let i = 0; i < $scope.dist.length; i++){
              if ($scope.dist[i].dist === e.dist){
                if ($scope.dist[i].list_cams === undefined)
                    $scope.dist[i].list_cams = [];
                $scope.dist[i].list_cams.push({
                    name: e.name,
                    liveUrl: e.liveviewUrl
                });
                existed = true;
                break;
              }
          }
          if (!existed){
              $scope.dist.push({
                  dist: e.dist,
                  list_cams: [{
                      name: e.name,
                      liveUrl: e.liveviewUrl
                  }]
              })
          }
      });
  })
  .catch(function(err){ console.log(err); });
});
