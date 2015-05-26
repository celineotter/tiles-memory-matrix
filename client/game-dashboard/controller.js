angular.module('memoryMatrixApp')
.controller('gameDashboardCtrl', function ($scope, Game) {

	$scope.game = new Game();

});
