angular.module('memoryMatrixApp')

.factory('Game', function (Tile, $timeout, $rootScope) {

    var Game = function () {
        this._tiles = [];
        this._successClickCounter = 0;
        this._message = {
            success: "- Great Job -",
            fail: "- Better luck next time -",
            init: "- Get ready to start a new round-",
        };
        this.userMessage = this._message.init;

        this._createBoard();

        $rootScope.$on('correctTileClicked', (function (){
            if (this._successClickCounter === 8) {
                this.userMessage = this._message.success;
            }
            this._successClickCounter++;
        }).bind(this));

        $rootScope.$on('incorrectTileClicked', (function(){
            if(this._successClickCounter >= 9) return;
            this._revealAll();
            this.userMessage = this._message.fail;
        }).bind(this));
    };

    Game.prototype._createBoard = function () {
        for (var i=0; i < 25; i++) {
            this._tiles.push(new Tile());
        }
    };

    Game.prototype.start = function () {
        // NOTE: if no-click = active return
        this.clear();
        this._selectRandomTiles();
        this._revealThenHideSelected();
    };

    Game.prototype.clear = function () {
        // NOTE: if !fromStart & no-click = active return
        // else NOTE: alert no-click = active
        this._successClickCounter = 0;
        this.userMessage = this._message.init;
        this._tiles.forEach(function (tile) {
            tile.reset();
        });
    };

    Game.prototype._getRandomTile = function () {
        return Math.floor( Math.random() * 25);
    };

    // TODO: write test for this
    Game.prototype._selectRandomTiles = function () {
        var target, selected = [];

        for (var i=0; i<9; i++) {

            while (!target || selected.indexOf(target) !== -1) {
                target = this._getRandomTile();
            }

            selected.push(target);
            this._tiles[target].setAsCorrectAnswer();
        }
    };

    Game.prototype._revealAll = function () {
        this._tiles.forEach(function(tile){
            tile.reveal();
        });
    };

    Game.prototype._hideAll = function () {
        this._tiles.forEach(function(tile){
            tile.hide();
        });
    };

    Game.prototype._revealThenHideSelected = function () {
        this._revealAll();
		$timeout(this._hideAll.bind(this), 5000);
    };

    return Game;
});
