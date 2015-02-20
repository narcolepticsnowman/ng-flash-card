angular.module('ngFlashCard').directive("flashCard",[function(){
    return {
        controller: ["$scope",function($scope){
            $scope.flipped = false;
            $scope.active=0;
            $scope.flip = function(){
                $scope.flipped = !$scope.flipped;
            };
        }],
        template:
            '<div class="card" ng-click="flip()" ng-show="activeCard === $index">' +
                "{{flipped ? card.back : card.front}}"+
            '</div>'
    };
}]);