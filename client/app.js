angular.module('memoryMatrixApp', [
    'ui.router',
])

.config(function ($locationProvider) {
    $locationProvider.html5Mode(true);
});
