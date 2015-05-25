angular.module('memoryMatrixApp')
.controller('gameDashboardCtrl', function ($scope, $timeout, $interval) {

	/* Shared with tile directive */
	$scope.tileStatusList = [];
	$scope.success  = {counter: 0};
    $scope.timer = {active: false};

	/* Game controller methods*/
	var MemoryGame = function () {
		this._total = 25;
    	this._secretSelectList = [];
    	this._timeLeft = 5;
		this._message = {
			success: "- Good Job -",
			fail: "- Better luck next time -",
			init: "- Start over -",
			restart: "- Start over -"
		};
	};

    /* Populate tileStatusList on first load*/
    /* Each index represents the initial tile status in matrix*/
	MemoryGame.prototype.prepareNewGame = function () {
        this._secretSelectList = [];
		$scope.success.counter = 0;

        for (var i=0; i < this._total; i++) {
            $scope.tileStatusList[i] = $scope.tileStatusList[i] || {};

            $scope.tileStatusList[i].secretSelected = false;
            $scope.tileStatusList[i].flash = false;
            $scope.tileStatusList[i].isIncorrect = false;
            $scope.tileStatusList[i].isRevealed = false;
        }
    };

	MemoryGame.prototype.getRandomTile = function () {
        return Math.floor( Math.random() * this._total);
    };

	MemoryGame.prototype.generateRandomsList = function () {
        var target;

        for (var i=0; i<9; i++) {

            while (!target || this._secretSelectList.indexOf(target) !== -1) {
                target = this.getRandomTile();
            }

            this._secretSelectList.push(target);
            $scope.tileStatusList[target].secretSelected = true;
        }
    };

    /* Go through internally selected list */
    /* For each index value, temporarily flash associated tile */
    /* Once revealed, cancel their flash parameter */
	MemoryGame.prototype.revealThenHideSelected = function () {
        var index = 0, preSelectedIndex;

        while (index < this._secretSelectList.length) {
            preSelectedIndex = this._secretSelectList[index];
            $scope.tileStatusList[preSelectedIndex].flash = true;
            index++;
        }

        $timeout((function () {
            while (index > 0) {
                index--;
                preSelectedIndex = this._secretSelectList[index];
                $scope.tileStatusList[preSelectedIndex].flash = false;
            }

        }).bind(this), 5000, 1);
    };

	MemoryGame.prototype.countDown = function () {
        $interval((function (numb) {
            if (this._timeLeft !== 1) {
                $scope.userMessage = "- " + --this._timeLeft + " seconds left -";
            } else {
                this._timeLeft = 5;
                $scope.userMessage = "- Start your selections now - ";
                $scope.timer.active = false;
            }
        }).bind(this), 1000, 5);
    };

	var game = new MemoryGame();
	game.prepareNewGame();

	/****************************/
	/* Bound functions to view */
	$scope.userMessage = game._message.init;

    $scope.newRound = function () {
        if ($scope.timer.active) return;
        $scope.timer.active = true;
        game.countDown ();
        game.prepareNewGame();
        game.generateRandomsList();
        game.revealThenHideSelected();
    };

    $scope.endRound = function () {
        if ($scope.timer.active) return;
		game.prepareNewGame();
        $scope.userMessage = game._message.restart;
    };

    $scope.revealSuccess = function (success) {
        if (success) {
			$scope.userMessage = game._message.success;
		} else {
			$scope.userMessage = game._message.fail;
			var index;

			for (var i=0; i<9; i++) {
				index = game._secretSelectList[i];
				if (!$scope.tileStatusList[index].flash) {
					$scope.tileStatusList[index].isRevealed = true;
				}
			}
		}
    };
});
