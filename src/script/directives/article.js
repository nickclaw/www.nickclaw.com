angular.module('app.directives')
    .directive('siteArticle', [
        function() {

            return {
                restrict: 'E',
                templateUrl: 'template/directive/article.html',
                replace: true,
                scope: {
                    article: '=article'
                },
                link: function($scope, elem) {
                    console.log($scope);
                }
            };
        }
    ]);
