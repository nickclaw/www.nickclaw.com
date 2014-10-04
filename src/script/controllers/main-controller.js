angular.module('app.controllers')
    .controller('MainController', [
        '$scope',
        'site',
        function($scope, site) {
            $scope.site = site;
        }
    ]);
