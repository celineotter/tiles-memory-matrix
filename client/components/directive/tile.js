angular.module('memoryMatrixApp')
.directive('tile', function () {
	return {
	    restrict: 'E',
		scope: {
            tile: '=',
            success: '=',
            reveal: '=',
            timer: '='
        },
        templateUrl: 'components/directive/tile.html',
        link: function ($scope, element, attrs) {

            $scope.highlightTile = function() {

                if ($scope.timer.active) return;

				if ($scope.tile.secretSelected === false) {
					$scope.tile.isIncorrect = true;
                    $scope.reveal(false);
				} else if($scope.success.counter === 8) {
					$scope.tile.flash = true;
                    $scope.reveal(true);
				} else {
					$scope.success.counter++;
					$scope.tile.flash = true;
				}
			};
        }
	};
});
