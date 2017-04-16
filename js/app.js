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
        .state('dashboard.toolkit', {
            url: '/toolkit',
            views: {
                main: {
                    controller: 'toolkitCtrl',
                    templateUrl: 'partials/toolkit.html'
                }
            }
        })
        .state('dashboard.method', {
            url: '/method/:id',
            views: {
                main: {
                    controller: 'singlemethodCtrl',
                    templateUrl: 'partials/singlemethod.html'
                }
            }
        })
        .state('dashboard.project', {
            url: '/project',
            views: {
                main: {
                    controller: 'projectCtrl',
                    templateUrl: 'partials/project.html'
                }
            }
        })
        .state('dashboard.thisproject', {
            url: '/thisproject/:id',
            views: {
                main: {
                    controller: 'singleprojectCtrl',
                    templateUrl: 'partials/singleproject.html'
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


    }]);
})();

