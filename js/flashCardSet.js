angular.module('ngFlashCard').directive("flashCardSet",[function () {
    return {
        scope:{
             cardGroups: "="
        },
        controller: ['$scope',function($scope){
            $scope.selectedGroups=[];
            $scope.activeGroup = 0;
            $scope.activeCard = 0;
            
            var doPrevious = function(){
                $scope.activeGroup--;
                if($scope.activeGroup <0){
                    $scope.activeGroup = $scope.cardGroups.length -1;
                }
            };
            $scope.previous = function(){
                var lastGroup = $scope.activeGroup;
                $scope.activeCard--;
                if($scope.activeCard < 0){
                    doPrevious();
                    while($scope.selectedGroups[$scope.activeGroup] === false){
                        doPrevious();
                        //only one or no active groups
                        if($scope.activeGroup === lastGroup){
                            break;
                        }
                    }
                    $scope.activeCard = $scope.cardGroups[$scope.activeGroup].cards.length -1;
                }
            };
            
            var doNext = function(){
                $scope.activeGroup++;
                if($scope.activeGroup >= $scope.cardGroups.length){
                    $scope.activeGroup = 0;
                }
            };
            
            $scope.next = function(nextGroup){
                var lastGroup = $scope.activeGroup;
                $scope.activeCard++;
                if(nextGroup || $scope.activeCard >= $scope.cardGroups[$scope.activeGroup].cards.length){
                    $scope.activeCard = 0;
                    doNext();
                    while($scope.selectedGroups[$scope.activeGroup] === false){
                        doNext();
                        //only one or no active groups
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
            '<div class="ngFlashCard-cardSet">'+
                '<ul class="form-group ngFlashCard-groupSelector">' +
                    '<li ng-repeat="cardGroup in cardGroups">' +
                        '<input type="checkbox" ng-model="selectedGroups[$index]" ng-init="selectedGroups[$index] = true"/>{{cardGroup.name}}' +
                    '</li>' +
                '</ul>' +
                '<div class="ngFlashCard-previous" ng-click="previous()">&lt;</div> <div class="ngFlashCard-next" ng-click="next()">&gt;</div>' +
                '<div ng-repeat="cardGroup in cardGroups" ng-if="selectedGroups[$index] && activeGroup === $index">' +
                    '<div ng-repeat="card in cardGroup.cards" ng-if="activeCard === $index">' +
                        '<div class="ngFlashCard-card" ng-click="flipped = !flipped" ng-init="flipped=false">' +
                        "{{flipped ? card.back : card.front}}"+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '<div>'
    };
}]);