angular.module('memoryMatrixApp')
.controller('gameDashboardCtrl', function ($scope) {

	$scope.userMessage = "";
	var successMessage = "Good Job!";
	var failureMessage = "Better luck next time";

	$scope.total = 25;
	$scope.tileStatusList = [];
    $scope.randomlySelectedList = [];
	$scope.successCounter = [0];

    /* Populate tileStatusList on first load*/
    /* Each index represents the initial tile status in matrix*/
    var initiateNewGame = function (){
        var tile;
        $scope.userMessage = '';
        $scope.successCounter = [0];

        for (var i=0; i < $scope.total; i++) {
            $scope.tileStatusList[i] = $scope.tileStatusList[i] || {};

            $scope.tileStatusList[i].robotSelected = false;
            $scope.tileStatusList[i].userSelected = false;
            $scope.tileStatusList[i].isIncorrect = false;
            $scope.tileStatusList[i].isRevealed = false;
        }
    };
    initiateNewGame();


    var getRandomTile = function (){
        return Math.floor( Math.random() * $scope.total);
    };


    var generateRandomsList = function (){
        var target, takenList = [];

        for (var i=0; i<9; i++){

            while (!target || takenList.indexOf(target) !== -1) {
                target = getRandomTile();
            }

            $scope.tileStatusList[target].robotSelected = true;
            takenList.push(target);
        }
    };


    $scope.newRound = function() {
        resetGame();
        $scope.randomlySelectedList = generateRandomList($scope.total);
        start($scope.total);
    };

    $scope.endRound = function() {
        resetGame();
    };

});


angular.module('memoryMatrixApp')
.directive('tile', function () {
	return {
	    restrict: 'E',
		scope: {},
	    template: "<div class='tile'></div>",
	    link: function ($scope, element, attrs) {}
	};
});
