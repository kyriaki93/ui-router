var app = angular.module('app', ['ui.router', 'firebase']);

(function() {
    app.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
        // the known route
        $urlRouterProvider.when('', '/');
        $stateProvider
        .state('home', {
            url: '/',
            views: {
                layout: {
                    templateUrl: 'partials/home.html',
                    controller: 'userCtrl'
                }
            }
        })
        .state('dashboard', {
            url: '/dashboard',
            abstract: true,
            views: {
                layout: {
                    templateUrl: 'partials/main-layout.html',
                    controller: 'headerCtrl'
                }
            }
        })
        .state('dashboard.filter', {
            url: '',
            abstract: true,
            views: {
                main: {
                    templateUrl: 'partials/filter.html',
                    controller: 'filterCtrl'
                }
            }

        })

        .state('dashboard.filter.toolkit', {
            url: '/toolkit/:type',
            views: {
                content: {
                    controller: 'toolkitCtrl',
                    templateUrl: 'partials/toolkit.html'
                    }
                    
                }

        })
        
        .state('dashboard.filter.method', {
            url: '/toolkit/:type/:id',
            views: {
                content: {
                    controller: 'singlemethodCtrl',
                    templateUrl: 'partials/singlemethod.html'
                }
            }
        })
        .state('dashboard.addmethod', {
            url: '/addmethod',
            views: {
                main: {
                    controller: 'addmethodCtrl',
                    templateUrl: 'partials/addmethod.html'
                }
            }
        })
        .state('dashboard.projectfilter', {
            url: '',
            abstract: true,
            views: {
                main: {
                    templateUrl: 'partials/projectfilter.html',
                    controller: 'filterCtrl'
                }
            }

        })
        .state('dashboard.projectfilter.project', {
            url: '/project/:type',
            views: {
                'container': {
                    controller: 'projectCtrl',
                    templateUrl: 'partials/project.html'
                }
            }
        })
        .state('dashboard.projectfilter.thisproject', {
            url: '/thisproject/:id',
            views: {
                'container': {
                    controller: 'singleprojectCtrl',
                    templateUrl: 'partials/singleproject.html'
                }
            }
        })
        .state('dashboard.addproject', {
            url: '/addproject',
            views: {
                main: {
                    controller: 'addprojectCtrl',
                    templateUrl: 'partials/addproject.html'
                }
            }
        })
        .state('dashboard.user', {
            url: '/user',
            views: {
                main: {
                    controller: 'getUserCtrl',
                    templateUrl: 'partials/user.html'

                }
            }
        })
        // Catch all
        .state("otherwise", {
            url: "*path",
            template: "<h1>404</h1>"
        });


    }]
    );


    app.run(['$rootScope', '$location', '$window', function($rootScope, $location, $window) {
        // initialise google analytics
      ga('create', 'UA-97853900-1', 'auto');
 
        // track pageview on state change
        $rootScope.$on('$stateChangeSuccess', function (event) {
            $window.ga('send', 'pageview', $location.path());

        });

        $rootScope.$on('$stateChangeSuccess', function (event) {
            hj('stateChange', $location.url());
            event.preventDefault();

        });
        
    }]);


}

)();




