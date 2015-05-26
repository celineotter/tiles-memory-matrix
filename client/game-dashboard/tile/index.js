angular.module('memoryMatrixApp')

.factory('Tile', function ($rootScope) {

    var Tile = function (blockUserClick) {
        this._isShowing = false;
        this._isRevealed = false;
        this._isCorrectAnswer = false;
        this._blockUserClick = blockUserClick;
    };

    Tile.prototype.reveal = function () {
        this._isRevealed = true;
    };

    Tile.prototype.hide = function () {
        this._isRevealed = false;
    };

    // TODO: write test for this
    Tile.prototype.show = function () {
        if(this._isShowing || this._blockUserClick.active) return;
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
