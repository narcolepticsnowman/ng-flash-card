angular.module('ngFlashCard').directive("flashCard",[function(){
    return {
        controller: ["$scope",function($scope){
            $scope.flipped = false;
            $scope.flip = function(){
                $scope.flipped = !$scope.flipped;
            };
        }],
        template:
            '<div class="card" ng-click="flip()">' +
                "{{flipped ? card.back : card.front}}"+
            '</div>'
    };
}]);