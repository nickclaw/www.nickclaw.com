angular.module('app.controllers')
    .controller('TitleController', [
        '$scope',
        'scroller',
        function($scope, scroller) {
            scroller(function(data) {
                console.log(data);
            });
        }
    ]);
