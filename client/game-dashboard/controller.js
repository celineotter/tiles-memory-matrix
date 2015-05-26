angular.module('memoryMatrixApp')
.controller('gameDashboardCtrl', function ($scope, $interval, gameDashboardFactory) {

	/******************************/
	/* Functionalities shared with tile directive */
	$scope.tileStatusList = [];

	$scope.success  = {counter: 0};

	$scope.timer = {active: false};

    $scope.revealSuccess = function (success) {
        if (success) {
			$scope.userMessage = game.message.success;
		} else {
			$scope.userMessage = game.message.fail;
			var index;

			for (var i=0; i<9; i++) {
				index = game.secretSelectionList[i];
				if (!$scope.tileStatusList[index].flash) {
					$scope.tileStatusList[index].isRevealed = true;
				}
			}
		}
    };

	/***************************/
	/* Extend scope with functionalities not bound to view*/
	var game = new gameDashboardFactory($scope);
	game.prepareNewGame();


	/***************************/
	/* Bound functions to view */
	$scope.userMessage = game.message.init;

    $scope.newRound = function () {
        if ($scope.timer.active) return;
        $scope.timer.active = true;
        game.prepareNewGame();
        game.generateRandomTiles();
        game.revealThenHideSelected();
    };

	$scope.endRound = function () {
        if ($scope.timer.active) return;
		game.prepareNewGame();
        $scope.userMessage = game.message.restart;
    };

});
