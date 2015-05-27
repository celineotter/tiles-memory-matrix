describe('Game', function () {

    beforeEach(module('memoryMatrixApp'));

    it('initialize board', inject(function(Game, Tile){
        var game = new Game();


        expect(game._tiles).to.have.length(25);
        expect(game._tiles[0]).to.be.instanceOf(Tile);
    }));

    describe('.clear()', function () {

        it('clears board', inject(function(Game, Tile){
            var game = new Game();
            game._tiles[0].click();
            game.clear();
            expect(game._tiles[0]).to.have.property('_isClicked', false);
        }));
    });

    describe('.start()', function () {

        it('starts game', inject(function(Game, Tile){
            var game = new Game();
            game._tiles[0].click();
            game.start();
            expect(game._tiles[0]).to.have.property('_isClicked', false);
        }));

        it('selects 9 random tiles: _selectRandomTiles(), _getRandomTile()', inject(function(Game, Tile){
            var game = new Game();
            game.start();

            var count = game._tiles.reduce(function(sum, tile){
                if(tile._isCorrectAnswer){
                    return sum +1;
                } else {
                    return sum;
                }
            }, 0);

            expect(count).to.equal(9);
        }));

        it('reveals tiles for 5 seconds: _revealAll(), _hideAll(), _revealThenHideSelected()', inject(function(Game, $interval){
            var count;
            var game = new Game();
            game.start();

            count = game._tiles.reduce(function(sum, tile){
                if(tile._isRevealed){
                    return sum +1;
                } else {
                    return sum;
                }
            }, 0);

            expect(count).to.equal(25);
            $interval.flush(5000);

            count = game._tiles.reduce(function(sum, tile){
                if(tile._isRevealed){
                    return sum +1;
                } else {
                    return sum;
                }
            }, 0);
            expect(count).to.equal(0);
        }));

        describe('.correctTileClicked()', function () {

            it('broadcasts correct tile is clicked', inject(function(Game, $rootScope){
                var spy = sinon.spy(Game.prototype, 'correctTileClicked');

                var game = new Game();
                $rootScope.$broadcast('correctTileClicked');

                expect(spy).to.have.been.called;
                expect(game._successClickCounter).to.equal(1);
            }));
        });

        describe('.incorrectTileClicked()', function () {

            it('broadcasts incorrect tile is clicked', inject(function(Game, $rootScope){
                var spy = sinon.spy(Game.prototype, 'incorrectTileClicked');

                var game = new Game();
                $rootScope.$broadcast('incorrectTileClicked');

                expect(spy).to.have.been.called;
                expect(game.userMessage).to.equal('- Better luck next time -');
            }));
        });
    });

});
