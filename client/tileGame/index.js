angular.module('memoryMatrixApp')
.config(function ($stateProvider) {
    $stateProvider
    .state('tileGame', {
        url: '/',
        templateUrl: 'tileGame/template.html',
        controller: 'TileGameCtrl'
    });
});
