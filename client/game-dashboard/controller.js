angular.module('memoryMatrixApp')
.controller('gameDashboardCtrl', function ($scope, $timeout) {

	$scope.userMessage = "";
	var successMessage = "Good Job!";
	var failureMessage = "Better luck next time";

	$scope.total = 25;
	$scope.tileStatusList = [];
    var secretSelectList = [];
	$scope.successCounter = [0];

    /* Populate tileStatusList on first load*/
    /* Each index represents the initial tile status in matrix*/
    var prepareNewGame = function (){
        var tile;
        $scope.userMessage = '';
        $scope.successCounter = [0];

        for (var i=0; i < $scope.total; i++) {
            $scope.tileStatusList[i] = $scope.tileStatusList[i] || {};

            $scope.tileStatusList[i].secretSelected = false;
            $scope.tileStatusList[i].flash = false;
            $scope.tileStatusList[i].isIncorrect = false;
            $scope.tileStatusList[i].isRevealed = false;

        }
    };

    var getRandomTile = function (){
        return Math.floor( Math.random() * $scope.total);
    };

    var generateRandomsList = function (){
        var target, secretList = [];

        for (var i=0; i<9; i++){

            while (!target || secretList.indexOf(target) !== -1) {
                target = getRandomTile();
            }

            $scope.tileStatusList[target].secretSelected = true;
            secretList.push(target);
        }
        return secretList;
    };

    /*Go through internally selected list*/
    /*For each index value, temporarily flash associated tile*/
    /*Once revealed, cancel their flash parameter*/
    var revealThenHideSelected = function() {
        var counter = 0, preSelectedIndex;

        while (counter < secretSelectList.length) {
            preSelectedIndex = secretSelectList[counter];
            $scope.tileStatusList[preSelectedIndex].flash = true;
            counter++;
        }

        $timeout(function(){
            while (counter > 0) {
                counter--;
                preSelectedIndex = secretSelectList[counter];
                $scope.tileStatusList[preSelectedIndex].flash = false;
            }
        }, 5000, 1);

    };


    $scope.newRound = function() {
        prepareNewGame();
        secretSelectList = generateRandomsList();
        revealThenHideSelected();
    };

    $scope.endRound = function() {
        prepareNewGame();
    };

    prepareNewGame();
});


angular.module('memoryMatrixApp')
.directive('tile', function () {
	return {
	    restrict: 'E',
		scope: {
            tile: '=',
            success: '=',
            revealHidden: '='
        },
	    template: "<div class='tile' ng-class='{flash: tile.flash, incorrect: tile.isIncorrect, reveal: tile.isRevealed}' ng-click='highlightTile()'></div>",
        link: function ($scope, element, attrs) {
			$scope.highlightTile = function() { debugger;

				if ($scope.tile.secretSelected == false) {
					$scope.tile.isIncorrect = true;
				} else if($scope.success[0] == 8) {
					$scope.tile.flash = true;
				} else {
					$scope.success[0]++;
					$scope.tile.flash = true;
				}
			}
        }
	};
});
