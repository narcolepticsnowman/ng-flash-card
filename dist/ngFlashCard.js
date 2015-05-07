angular.module("ngFlashCard",[]).directive("flashCardSet",[function () {
    return {
        scope:{
             cardGroups: "="
        },
        controller: ['$scope',function($scope){
            $scope.selectedGroups=[];
            $scope.activeGroup = 0;
            $scope.activeCard = 0;
            $scope.shuffle = false;
            $scope.backFirst = false;

            var getRandomInt = function(min,max){
                return Math.floor(Math.random() * (max - min + 1)) + min;
            };
            
            var doShuffle = function(){
                var randomIndex = getRandomInt(0,$scope.selectedGroups.length-1);
                var nextActive=randomIndex;
                //skip the first index so that we can do the nextActive!=randomIndex check later to avoid an infinite loop
                do{
                    nextActive++;
                    if(nextActive > $scope.selectedGroups.length-1){
                        nextActive=0;
                    }
                } while ($scope.selectedGroups[nextActive] === false && nextActive!==randomIndex);
                if($scope.selectedGroups[nextActive] === false){
                    //there are no active groups 
                    return;
                }
                $scope.activeGroup = nextActive;
                $scope.activeCard = getRandomInt(0,$scope.cardGroups[nextActive].cards.length-1);
            };
            var setPrevious = function(){
                $scope.activeGroup--;
                if($scope.activeGroup <0){
                    $scope.activeGroup = $scope.cardGroups.length -1;
                }
            };

            var doPrevious = function(){
                var lastGroup = $scope.activeGroup;
                $scope.activeCard--;
                if($scope.activeCard < 0){
                    setPrevious();
                    while($scope.selectedGroups[$scope.activeGroup] === false){
                        setPrevious();
                        //only one or no active groups
                        if($scope.activeGroup === lastGroup){
                            break;
                        }
                    }
                    $scope.activeCard = $scope.cardGroups[$scope.activeGroup].cards.length -1;
                }
            };

            $scope.previous = function(){
                if($scope.shuffle){
                    doShuffle();
                } else {
                    doPrevious();
                }
            };
            
            var setNext = function(){
                $scope.activeGroup++;
                if($scope.activeGroup >= $scope.cardGroups.length){
                    $scope.activeGroup = 0;
                }
            };
            
            var doNext = function(nextGroup){
                var lastGroup = $scope.activeGroup;
                $scope.activeCard++;
                if(nextGroup || $scope.activeCard >= $scope.cardGroups[$scope.activeGroup].cards.length){
                    $scope.activeCard = 0;
                    setNext();
                    while($scope.selectedGroups[$scope.activeGroup] === false){
                        setNext();
                        //only one or no active groups
                        if($scope.activeGroup === lastGroup){
                            break;
                        }
                    }
                }
            };

            $scope.next = function(nextGroup){
                if($scope.shuffle){
                    doShuffle();
                } else {
                    doNext(nextGroup);
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

            $scope.showFront = function(flipped){
                return flipped ? $scope.backFirst : !$scope.backFirst;
            };
        }],
        template:
        '<div class="container-fluid ngFlashCard-cardSet ngFlashCard-fullHeight">'+
            '<div class="row ngFlashCard-fullHeight">'+
                '<ul class="ngFlashCard-groupSelector col-sm-3 list-group">' +
                    '<li ng-repeat="cardGroup in cardGroups" class="list-group-item ngFlashCard-clickable" ng-init="selectedGroups[$index] = true" ' +
                        'ng-click="selectedGroups[$index] = !selectedGroups[$index]">' +
                        '<input class="ngFlashCard-clickable" type="checkbox" ng-checked="selectedGroups[$index]" />{{cardGroup.name}}' +
                    '</li>' +
                '</ul>' +
                '<div class="well well-sm text-center col-sm-9 ngFlashCard-fullHeight ngFlashCard-wrapper">'+
                    '<div class="ngFlashCard-cardHeader">'+
                        '<div class="ngFlashCard-pageButton" ng-click="previous()" >Previous</div>' +
                        '<div class="ngFlashCard-clickable ngFlashCard-backFirst">' +
                            '<div ng-click="backFirst = !backFirst"><input class="ngFlashCard-clickable" type="checkbox" ng-checked="backFirst">Answers First</div>' +
                            '<div ng-click="shuffle = !shuffle"><input class="ngFlashCard-clickable" type="checkbox" ng-checked="shuffle">Shuffle</div>' +
                        '</div>' +
                        '<div class="ngFlashCard-pageButton" ng-click="next()" >Next</div>' +
                    '</div>'+
                    '<div class="ngFlashCard-cardGroup" ng-repeat="cardGroup in cardGroups" ng-if="selectedGroups[$index] && activeGroup === $index">' +
                        '<div class="ngFlashCard-fullHeight" ng-repeat="card in cardGroup.cards" ng-if="activeCard === $index">' +
                            '<pre class="ngFlashCard-card ngFlashCard-fullHeight"' +
                                 'ng-class="showFront(flipped) ? \'ngFlashCard-cardFront\' : \'ngFlashCard-cardBack\'"' +
                                 'ng-click="flipped = !flipped" ng-init="flipped=false">' +
                                "<h1>{{showFront(flipped) ? card.front : card.back }}</h1>"+
                            '</pre>'+
                        '</div>'+
                    '</div>'+
                    '<span>{{cardGroups[activeGroup].name}}</span>'+
                '</div>'+
            '</div>'+
        '</div>'
    };
}]);