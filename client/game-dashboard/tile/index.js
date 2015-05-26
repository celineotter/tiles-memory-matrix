angular.module('memoryMatrixApp')

.factory('Tile', function ($rootScope) {

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

    // TODO: write test for this
    Tile.prototype.show = function () {
        if(this._isShowing) return;
        this._isShowing = true;

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
        this._isShowing = false;
        this._isRevealed = false;
        this._isCorrectAnswer = false;
    };

    return Tile;
});
