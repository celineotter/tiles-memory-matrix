angular.module('memoryMatrixApp')
.controller('gameDashboardCtrl', function ($scope, $timeout, $interval) {

	$scope.userMessage = "- Welcome -";
	var message = {success: "- Good Job -", fail: "- Better luck next time -"};

	$scope.total = 25;
	$scope.tileStatusList = [];
    var secretSelectList = [];
	$scope.success  = {counter: 0};
    var timeLeft = 5;
    $scope.timer = {active: false};

    /* Populate tileStatusList on first load*/
    /* Each index represents the initial tile status in matrix*/
    var prepareNewGame = function (){
        var tile;
        $scope.success = {counter: 0};

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

    var countDown = function () {
        $interval(function(numb){
            if (timeLeft !== 1) {
                $scope.userMessage = "- " + --timeLeft + " seconds left -";
            } else {
                timeLeft = 5;
                $scope.userMessage = "- Start your selections now - ";
                $scope.timer.active = false;
            }
        }, 1000, 5);
    };


    $scope.newRound = function() {
        if ($scope.timer.active) return;
        $scope.timer.active = true;
        countDown();
        prepareNewGame();
        secretSelectList = generateRandomsList();
        revealThenHideSelected();
    };

    $scope.endRound = function() {
        if ($scope.timer.active) return;
        prepareNewGame();
        $scope.userMessage = "- Start over -";
    };

    $scope.revealSuccess = function (success) {
        if (success) {
			$scope.userMessage = message.success;
		} else {
			$scope.userMessage = message.fail;
			var index;

			for (var i=0; i<9; i++) {
				index = secretSelectList[i];
				if (!$scope.tileStatusList[index].flash){
					$scope.tileStatusList[index].isRevealed = true;
				}
			}
		}
    };

    prepareNewGame();
});
