angular.module('memoryMatrixApp')

.factory('Tile', function () {

    var Tile = function () {
        this._isShowing = false;
        this._isRevealed = false;
        this._isCorrectAnswer = false;
    };

    Tile.prototype.reveal = function () {
        this._isRevealed = true;
    };

    Tile.prototype.hide = function () {
        this._isRevealed = false;
    };

    Tile.prototype.show = function () {
        this._isShowing = true;
    };

    Tile.prototype.setAsCorrectAnswer = function () {
        this._isCorrectAnswer = true;
    };

    Tile.prototype.reset = function () {
        this._isShowing = false;
        this._isRevealed = false;
        this._isCorrectAnswer = false;
    };

    return Tile;
});
