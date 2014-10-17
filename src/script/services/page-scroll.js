angular.module('app.services')
    .service('scroller', [

        function() {
            var listeners = [],
                height = 0,
                offset = 0;

            document.body.onscroll = function handler() {
                height = document.body.offsetHeight;
                offset = document.body.scrollTop;

                _.each(listeners, function(listener) {
                    listener.call(document.body, {
                        height: height,
                        offset: offset
                    });
                });
            };

            return function(fn) {
                listeners.push(fn);
                fn.call(document.body, {
                    height: height,
                    offset: offset
                });
            }
        }
    ])
