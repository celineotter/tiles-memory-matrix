angular.module('memoryMatrixApp')

.factory('Game', function (Tile, $timeout) {

    var Game = function () {
        this._tiles = [];
        this._createBoard();
    };

    Game.prototype._createBoard = function () {
        for (var i=0; i < 25; i++) {
            this._tiles.push(new Tile());
        }
    };

    Game.prototype.start = function () {
        this.clear();
        this._selectRandomTiles();
        this._revealThenHideSelected();

    };

    Game.prototype.clear = function () {
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
    }

    Game.prototype._hideAll = function () {
        this._tiles.forEach(function(tile){
            tile.hide();
        });
    }

    Game.prototype._revealThenHideSelected = function () {
        this._revealAll();
		$timeout(this._hideAll.bind(this), 5000);
    };

    return Game;
});
