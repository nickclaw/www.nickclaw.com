angular.module('app.controllers', []);
angular.module('app.directives', []);
angular.module('app.filters', []);
angular.module('app.services', []);

angular.module('app', [
        'app.controllers',
        'app.directives',
        'app.filters',
        'app.services'
    ])
    .run([
        '$rootScope',
        function($rootScope) {
            $rootScope.onScroll = function() {
                console.log.apply(console, arguments);
            }
        }
    ]);
