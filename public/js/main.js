angular.module('profarm', ['ngResource', 'oc.lazyLoad', 'ui.router', 'ngStorage', 'angular-loading-bar', 'ui.bootstrap'])
    .config(['$stateProvider', '$urlRouterProvider', 'cfpLoadingBarProvider', '$sceDelegateProvider', function($stateProvider, $urlRouterProvider, cfpLoadingBarProvider, $sceDelegateProvider) {

        cfpLoadingBarProvider.includeSpinner = false;

        $stateProvider.state('index', {
            url: "/", // root route
            templateUrl: 'vendors/index.html',
            resolve: {
                service: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'js/controllers/IndexController.js'
                        ]
                    });
                }]
            }
        });

        // $stateProvider.state('index', {
        //     url: "/", // root route
        //     views: {
        //         "lazyLoadView": { // This view will use AppCtrl loaded below in the resolve
        //             templateUrl: 'vendors/index.html'
        //         }
        //     }
        // });

        // $stateProvider.state('index', {
        //     url: '/',
        //     templateUrl: 'vendors/index.html'
        // })

        $urlRouterProvider.otherwise('/');

    }]);
