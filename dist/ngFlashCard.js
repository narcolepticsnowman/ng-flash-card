angular.module("ngFlashCard",[]);
angular.module('ngFlashCard').directive("flashCards",[function () {
    return {
        scope:{
             cardGroups: "="
        },
        controller: [function(){

        }],
        template:
            '<ul class="form-group">' +
                '<li ng-repeat="cardGroup in cardGroups">' +
                    '<input type="checkbox"/>{{cardGroup.name}}' +
                '</li>' +
            '</ul>'
    };
}]);
angular.module('ngFlashCard').controller("flashCardsController",[function(){

}]);