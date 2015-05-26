angular.module('memoryMatrixApp')
.directive('tile', function () {
	return {
	    restrict: 'E',
        templateUrl: 'game-dashboard/tile/template.html',
	};
});
