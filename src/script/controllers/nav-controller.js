angular.module('app.controllers')
    .controller('NavController', [
        '$scope',
        'site',
        function($scope, site) {
            $scope.site = site;
        }
    ]);
