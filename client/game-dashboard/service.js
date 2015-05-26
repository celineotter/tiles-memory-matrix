angular.module('memoryMatrixApp')

.factory('Tile', function () {

    var Factory = function () {
        this._isShowing = false;
        this._isRevealed = false;
        this._isCorrectAnswer = false;
    };

    Factory.prototype.reveal = function () {
        this._isRevealed = true;
    };

    Factory.prototype.hide = function () {
        this._isRevealed = false;
    };

    Factory.prototype.show = function () {
        this._isShowing = true;
    };

    return Factory;
});




// .factory('gameDashboardFactory', function($interval) {
//
//     var MemoryGame = function ($scope) {
//     	this.secretSelectionList = [];
//         this.$scope = $scope;
// 		this._total = 25;
//     	this._timeLeft = 5;
// 		this.message = {
// 			success: "- Great Job -",
// 			fail: "- Better luck next time -",
// 			init: "- Start over -",
// 			restart: "- Start over -"
// 		};
// 	};
//
//     /* Populate tileStatusList on first load*/
//     /* Each index represents the initial tile status in matrix*/
// 	MemoryGame.prototype.prepareNewGame = function () {
//         this.secretSelectionList = [];
// 		this.$scope.success.counter = 0;
//
//         for (var i=0; i < this._total; i++) {
//             this.$scope.tileStatusList[i] = this.$scope.tileStatusList[i] || {};
//
//             this.$scope.tileStatusList[i].secretSelected = false;
//             this.$scope.tileStatusList[i].flash = false;
//             this.$scope.tileStatusList[i].isIncorrect = false;
//             this.$scope.tileStatusList[i].isRevealed = false;
//         }
//     };
//
// 	MemoryGame.prototype._getRandomTile = function () {
//         return Math.floor( Math.random() * this._total);
//     };
//
// 	MemoryGame.prototype.generateRandomTiles = function () {
//         var target;
//
//         for (var i=0; i<9; i++) {
//
//             while (!target || this.secretSelectionList.indexOf(target) !== -1) {
//                 target = this._getRandomTile();
//             }
//
//             this.secretSelectionList.push(target);
//             this.$scope.tileStatusList[target].secretSelected = true;
//         }
//     };
//
// 	/***************************************/
//     /* Go through internally selected list */
//     /* For each index value, temporarily flash associated tile */
//     /* Once revealed, cancel their flash parameter */
// 	MemoryGame.prototype.revealThenHideSelected = function () {
//         var index = 0, preSelectedIndex;
//
//         while (index < this.secretSelectionList.length) {
//             preSelectedIndex = this.secretSelectionList[index];
//             this.$scope.tileStatusList[preSelectedIndex].flash = true;
//             index++;
//         }
//
// 		$interval((function (numb) {
//             if (this._timeLeft !== 1) {
//                 this.$scope.userMessage = "- " + --this._timeLeft + " seconds left -";
//             } else {
// 	            while (index > 0) {
// 	                index--;
// 	                preSelectedIndex = this.secretSelectionList[index];
// 	                this.$scope.tileStatusList[preSelectedIndex].flash = false;
// 	            }
//
//                 this.$scope.userMessage = "- Start your selections now - ";
//                 this.$scope.timer.active = false;
//                 this._timeLeft = 5;
//             }
//         }).bind(this), 1000, 5);
//     };
//
//     return MemoryGame;
//
// });
