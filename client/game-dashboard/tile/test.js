describe('Tile', function () {

    beforeEach(module('memoryMatrixApp'));

    it('new Tile(), defaults to not showing', inject(function(Tile){
        var tile = new Tile();

        expect(tile._isShowing).to.be.false;
    }));

    it('new Tile(), defaults to not correct', inject(function(Tile){
        var tile = new Tile();

        expect(tile._isCorrectAnswer).to.be.false;
    }));

    it('new Tile(), defaults to not revealed', inject(function(Tile){
        var tile = new Tile();

        expect(tile._isRevealed).to.be.false;
    }));

    describe('.reveal()', function () {
        it('reveal the tile', inject(function(Tile){
            var tile = new Tile();
            tile.reveal();

            expect(tile._isRevealed).to.be.true;
        }));
    });

    describe('.hide()', function () {
        it('hide the tile', inject(function(Tile){
            var tile = new Tile();
            tile.hide();

            expect(tile._isRevealed).to.be.false;
        }));
    });

    describe('.setAsCorrectAnswer()', function () {
        it('show the tile', inject(function(Tile){
            var tile = new Tile();
            tile.setAsCorrectAnswer();

            expect(tile._isCorrectAnswer).to.be.true;
        }));
    });

    describe('.reset()', function () {
        it('show the tile', inject(function(Tile){
            var tile = new Tile({active: false});
            tile.show();
            tile.setAsCorrectAnswer();
            tile.reveal();
            tile.reset();

            expect(tile._isShowing).to.be.false;
            expect(tile._isRevealed).to.be.false;
            expect(tile._isCorrectAnswer).to.be.false;
        }));
    });

    describe('.show()', function () {

        it('broadcasts correct tile is clicked', inject(function(Game, $rootScope){
            var spy = sinon.spy($rootScope, '$broadcast');

            var game = new Game();
            game._tiles[0].setAsCorrectAnswer();
            game._tiles[0].show();

            expect(spy).to.have.been.calledWith('correctTileClicked');
        }));

        it('broadcasts incorrect tile is clicked', inject(function(Game, $rootScope){
            var spy = sinon.spy($rootScope, '$broadcast');

            var game = new Game();
            game._tiles[0].show();

            expect(spy).to.have.been.calledWith('incorrectTileClicked');
        }));
    });
});
