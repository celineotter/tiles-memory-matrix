angular.module('memoryMatrixApp')
.config(function ($stateProvider) {
    $stateProvider
    .state('gameDashboard', {
        url: '/',
        templateUrl: 'game-dashboard/template.html',
        controller: 'gameDashboardCtrl'
    });
});
