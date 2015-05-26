describe('Tile', function () {

    beforeEach(module('memoryMatrixApp'));

    it('defaults to not showing', inject(function(Tile){
        var tile = new Tile();

        expect(tile._isShowing).to.be.false;
    }));

    it('defaults to not correct', inject(function(Tile){
        var tile = new Tile();

        expect(tile._isCorrectAnswer).to.be.false;
    }));

    it('defaults to not revealed', inject(function(Tile){
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

    describe('.show()', function () {
        it('show the tile', inject(function(Tile){
            var tile = new Tile();
            tile.show();

            expect(tile._isShowing).to.be.true;
        }));
    });
});
