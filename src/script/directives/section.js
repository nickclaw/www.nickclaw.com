angular.module('app.directives')
    .directive('siteSection', [

        function() {
            return {
                restrict: 'E',
                templateUrl: 'template/directive/section.html',
                replace: true,
                scope: {
                    section: '=section'
                },
                link: function($scope, elem) {
                }
            };
        }
    ]);
