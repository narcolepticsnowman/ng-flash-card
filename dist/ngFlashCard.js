angular.module("ngFlashCard",[]).directive("flashCardSet",[function () {
    return {
        scope:{
             cardGroups: "="
        },
        controller: ['$scope',function($scope){
            $scope.selectedGroups=[];
            $scope.activeGroup = 0;
            $scope.activeCard = 0;
            $scope.backFirst = false;
            
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
        '<div class="container-fluid ngFlashCard-cardSet ngFlashCard-fullHeight">'+
            '<div class="row ngFlashCard-fullHeight">'+
                '<ul class="ngFlashCard-groupSelector col-sm-3 list-group">' +
                    '<li ng-repeat="cardGroup in cardGroups" class="list-group-item">' +
                        '<input type="checkbox" ng-model="selectedGroups[$index]" ng-init="selectedGroups[$index] = true"/>{{cardGroup.name}}' +
                    '</li>' +
                '</ul>' +
                '<div class="well well-sm text-center col-sm-9 ngFlashCard-fullHeight ngFlashCard-wrapper">'+
                    '<div class="ngFlashCard-cardHeader">'+
                        '<div class="ngFlashCard-pageButton" ng-click="previous()" >Previous</div>' +
                        '<div class="ngFlashCard-backFirst"><input type="checkbox" ng-model="backFirst">Answers First</div>' +
                        '<div class="ngFlashCard-pageButton" ng-click="next()" >Next</div>' +
                    '</div>'+
                    '<div class="ngFlashCard-cardGroup" ng-repeat="cardGroup in cardGroups" ng-if="selectedGroups[$index] && activeGroup === $index">' +
                        '<div class="ngFlashCard-fullHeight" ng-repeat="card in cardGroup.cards" ng-if="activeCard === $index">' +
                            '<pre class="ngFlashCard-card ngFlashCard-fullHeight" ng-click="flipped = !flipped" ng-init="flipped=false">' +
                                "<h1>{{flipped ? backFirst ? card.front : card.back : backFirst ? card.back : card.front}}</h1>"+
                            '</pre>'+
                        '</div>'+
                    '</div>'+
                '</div>'+
            '</div>'+
        '</div>'
    };
}]);