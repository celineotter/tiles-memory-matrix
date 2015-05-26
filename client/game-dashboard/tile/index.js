angular.module('memoryMatrixApp')

.factory('Tile', function ($rootScope) {

    var Tile = function () {
        this._isClicked = false;
        this._isRevealed = false;
        this._isCorrectAnswer = false;
    };

    Tile.prototype.reveal = function () {
        this._isRevealed = true;
    };

    Tile.prototype.hide = function () {
        this._isRevealed = false;
    };

    Tile.prototype.click = function () {
        if(this._isClicked) return;
        this._isClicked = true;

        if(this._isCorrectAnswer){
            $rootScope.$broadcast('correctTileClicked');
        } else {
            $rootScope.$broadcast('incorrectTileClicked');
        }
    };

    Tile.prototype.setAsCorrectAnswer = function () {
        this._isCorrectAnswer = true;
    };

    Tile.prototype.reset = function () {
        this._isClicked = false;
        this._isRevealed = false;
        this._isCorrectAnswer = false;
    };

    return Tile;
});
