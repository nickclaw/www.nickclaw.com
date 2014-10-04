angular.module('app.services')
    .constant('SITE_SCHEMA', {
        sections: [
            {
                name: 'About Me',
                title: 'about',
                path: 'about',

                templateUrl: 'about/main.html',

                articles: [
                    {
                        name: 'Me',
                        path: 'me',
                        templateUrl: 'about/me.html'
                    },
                    {
                        name: 'Now',
                        path: 'now',
                        templateUrl: 'about/now.html'
                    }
                ]
            },
            {
                name: 'Experience',
                title: 'experience',
                path: 'experience',

                templateUrl: 'experience/main.html',

                articles: [
                    {
                        name: 'Disney',
                        path: 'disney',
                        templateUrl: 'experience/disney.html'
                    },
                    {
                        name: 'Biology',
                        path: 'biology',
                        templateUrl: 'experience/biology.html'
                    },
                    {
                        name: 'Ecocar',
                        path: 'ecocar',
                        templateUrl: 'experience/biology.html'
                    }
                ]
            },
            {
                name: 'Projects',
                title: 'projects',
                path: 'projects',

                templateUrl: 'experience/main.html',

                articles: [
                    {
                        name: 'qdb',
                        path: 'qdb',
                        templateUrl: 'projects/qdb.html'
                    },
                    {
                        name: 'Drown The Ave',
                        path: 'dta',
                        templateUrl: 'projects/dta.html'
                    },
                    {
                        name: 'Window Tiler',
                        path: 'tiler',
                        templateUrl: 'projects/tiler.html'
                    },
                    {
                        name: 'Sockdraw',
                        path: 'sockdraw',
                        templateUrl: 'projects/sockdraw.html'
                    }
                ]
            },
            {
                name: 'Contact',
                title: 'contact',
                path: 'contact',

                templateUrl: 'contact/main.html',

                articles: []
            }
        ]
    });
