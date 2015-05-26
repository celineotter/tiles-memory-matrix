angular.module('memoryMatrixApp')

.factory('Game', function (Tile, $interval, $rootScope) {

    var Game = function () {
        this._tiles = [];
        this._lock = false;
        this._successClickCounter = 0;
        this._messages = {
            init: "- Get ready to start a new round -",
            countDown: " seconds left -",
            inProgress: "- Find the hidden tiles -",
            success: "- Great Job -",
            fail: "- Better luck next time -",
        };
        this.userMessage = this._messages.init;

        this._createBoard();

        $rootScope.$on('correctTileClicked', this.correctTileClicked.bind(this));

        $rootScope.$on('incorrectTileClicked', this.incorrectTileClicked.bind(this));
    };

    Game.prototype._createBoard = function () {
        for (var i=0; i < 25; i++) {
            this._tiles.push(new Tile());
        }
    };

    Game.prototype.start = function () {
        if(this._lock) return;
        this.clear(true);
        this._selectRandomTiles();
        this._revealThenHideSelected();
    };

    Game.prototype.clear = function (fromStart) {
        if (this._lock) return;

        this._successClickCounter = 0;
        this.userMessage = this._messages.init;
        this._tiles.forEach(function (tile) {
            tile.reset();
        });
    };

    Game.prototype._getRandomTile = function () {
        return Math.floor( Math.random() * 25);
    };

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
        this._lock = false;
        this.userMessage = this._messages.inProgress;
    };

    Game.prototype._revealThenHideSelected = function () {
        var count = 5;
        this._lock = true;
        this._revealAll();
        this.userMessage = '- ' + count + this._messages.countDown;

		$interval((function () {
            if(count === 1){
                this._hideAll();
            } else {
                this.userMessage = '- ' + --count + this._messages.countDown;
            }
        }).bind(this), 1000, 5);
    };

    Game.prototype.correctTileClicked = function () {
        if (this._successClickCounter === 8) {
            this.userMessage = this._messages.success;
        }
        this._successClickCounter++;
    };

    Game.prototype.incorrectTileClicked = function () {
        if(this._successClickCounter >= 9) return;
        this._revealAll();
        this.userMessage = this._messages.fail;
    };

    return Game;
});
