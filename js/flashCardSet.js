angular.module('ngFlashCard').directive("flashCardSet",[function () {
    return {
        scope:{
             cardGroups: "="
        },
        controller: ['$scope',function($scope){
            $scope.selectedGroups=[];
            $scope.activeGroup = 0;
            $scope.activeCard = 0;
            $scope.previous = function(){
                $scope.activeCard--;
                if($scope.activeCard < 0){
                    $scope.activeGroup--;
                    if($scope.activeGroup <0){
                        $scope.activeGroup = $scope.cardGroups.length -1;
                    }
                    $scope.activeCard = $scope.cardGroups[$scope.activeGroup].cards.length -1;
                }
            };
            
            $scope.next = function(nextGroup){
                var lastGroup = $scope.activeGroup;
                $scope.activeCard++;
                if(nextGroup || $scope.activeCard >= $scope.cardGroups[$scope.activeGroup].cards.length){
                    $scope.activeGroup++;
                    $scope.activeCard = 0;
                    if($scope.activeGroup >= $scope.cardGroups.length){
                        $scope.activeGroup = 0;
                    }
                    while($scope.selectedGroups[$scope.activeGroup] === false){
                        $scope.activeGroup++;
                        $scope.activeCard=0;
                        if($scope.activeGroup >= $scope.cardGroups.length){
                            $scope.activeGroup = 0;
                        }
                        //no current active groups or only one
                        if($scope.activeGroup === lastGroup){
                            break;
                        }
                    }
                }
            };
            $scope.$watch('selectedGroups',function(newVal,oldVal,scope){
                for(var i=0; i<newVal.length; i++){
                    if(newVal[i] === false){
                        if(scope.activeGroup === i){
                            scope.next(true);
                        }
                    }
                }
            },true);
        }],
        template:
            '<div>'+
                '<ul class="form-group cardGroupSelector">' +
                    '<li ng-repeat="cardGroup in cardGroups">' +
                        '<input type="checkbox" ng-model="selectedGroups[$index]" ng-init="selectedGroups[$index] = true"/>{{cardGroup.name}}' +
                    '</li>' +
                '</ul>' +
                '<div class="previousButton" ng-click="previous()">&lt;</div> <div class="nextButton" ng-click="next()">&gt;</div>' +
                '<div ng-repeat="cardGroup in cardGroups" ng-show="selectedGroups[$index] && activeGroup === $index">' +
                    '<div ng-repeat="card in cardGroup.cards" flash-card card="card"/>' +
                '</div>'+
            '<div>'
    };
}]);