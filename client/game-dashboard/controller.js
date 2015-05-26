angular.module('memoryMatrixApp')
.controller('gameDashboardCtrl', function ($scope, $interval) {

	/******************************/
	/* Shared with tile directive */
	$scope.tileStatusList = [];
	$scope.success  = {counter: 0};
    $scope.timer = {active: false};

	/**************************/
	/* Game controller methods*/
	var MemoryGame = function () {
		this._total = 25;
    	this._timeLeft = 5;
		this.message = {
			success: "- Good Job -",
			fail: "- Better luck next time -",
			init: "- Start over -",
			restart: "- Start over -"
		};
    	this.secretSelectList = [];
	};

    /* Populate tileStatusList on first load*/
    /* Each index represents the initial tile status in matrix*/
	MemoryGame.prototype.prepareNewGame = function () {
        this.secretSelectList = [];
		$scope.success.counter = 0;

        for (var i=0; i < this._total; i++) {
            $scope.tileStatusList[i] = $scope.tileStatusList[i] || {};

            $scope.tileStatusList[i].secretSelected = false;
            $scope.tileStatusList[i].flash = false;
            $scope.tileStatusList[i].isIncorrect = false;
            $scope.tileStatusList[i].isRevealed = false;
        }
    };

	MemoryGame.prototype._getRandomTile = function () {
        return Math.floor( Math.random() * this._total);
    };

	MemoryGame.prototype.generateRandomTiles = function () {
        var target;

        for (var i=0; i<9; i++) {

            while (!target || this.secretSelectList.indexOf(target) !== -1) {
                target = this._getRandomTile();
            }

            this.secretSelectList.push(target);
            $scope.tileStatusList[target].secretSelected = true;
        }
    };

	/***************************************/
    /* Go through internally selected list */
    /* For each index value, temporarily flash associated tile */
    /* Once revealed, cancel their flash parameter */
	MemoryGame.prototype.revealThenHideSelected = function () {
        var index = 0, preSelectedIndex;

        while (index < this.secretSelectList.length) {
            preSelectedIndex = this.secretSelectList[index];
            $scope.tileStatusList[preSelectedIndex].flash = true;
            index++;
        }

		$interval((function (numb) {
            if (this._timeLeft !== 1) {
                $scope.userMessage = "- " + --this._timeLeft + " seconds left -";
            } else {
	            while (index > 0) {
	                index--;
	                preSelectedIndex = this.secretSelectList[index];
	                $scope.tileStatusList[preSelectedIndex].flash = false;
	            }

                $scope.userMessage = "- Start your selections now - ";
                $scope.timer.active = false;
                this._timeLeft = 5;
            }
        }).bind(this), 1000, 5);
    };

	var game = new MemoryGame();
	game.prepareNewGame();


	/***************************/
	/* Bound functions to view */
	$scope.userMessage = game.message.init;

    $scope.newRound = function () {
        if ($scope.timer.active) return;
        $scope.timer.active = true;
        game.prepareNewGame();
        game.generateRandomTiles();
        game.revealThenHideSelected();
    };

    $scope.endRound = function () {
        if ($scope.timer.active) return;
		game.prepareNewGame();
        $scope.userMessage = game.message.restart;
    };

    $scope.revealSuccess = function (success) {
        if (success) {
			$scope.userMessage = game.message.success;
		} else {
			$scope.userMessage = game.message.fail;
			var index;

			for (var i=0; i<9; i++) {
				index = game.secretSelectList[i];
				if (!$scope.tileStatusList[index].flash) {
					$scope.tileStatusList[index].isRevealed = true;
				}
			}
		}
    };
});
