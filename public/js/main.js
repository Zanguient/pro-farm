angular.module('profarm', ['ngResource', 'oc.lazyLoad', 'ui.router', 'ngStorage', 'angular-loading-bar', 'ui.bootstrap'])
    .config(['$httpProvider', '$stateProvider', '$urlRouterProvider', 'cfpLoadingBarProvider', '$sceDelegateProvider', '$locationProvider', function($httpProvider, $stateProvider, $urlRouterProvider, cfpLoadingBarProvider, $sceDelegateProvider, $locationProvider) {

        cfpLoadingBarProvider.includeSpinner = false;
        $locationProvider.hashPrefix('');
        $httpProvider.interceptors.push('UsuarioInterceptor');

        // LOGIN && PROPRIEDADE
        $stateProvider.state('login', {
            url: "/login", // root route
            templateUrl: 'vendors/usuario/login.html',
            resolve: {
                service: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'js/usuario/UsuarioFactory.js',
                            'js/usuario/UsuarioService.js',
                            'js/navbar/NavbarLoginController.js'
                        ]
                    });
                }]
            }
        }).state('propriedade', {
            url: "/propriedade",
            controller: 'PropriedadeSelecionarController',
            templateUrl: 'vendors/propriedade/selecionar.html',
            resolve: {
                service: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'js/usuario/UsuarioService.js',
                            'js/propriedade/PropriedadeService.js',
                            'js/navbar/NavbarPropriedadeController.js',
                            'js/propriedade/PropriedadeSelecionarController.js'
                        ]
                    });
                }]
            }
        }).state('propriedade-novo', {
            url: "/propriedade/novo",
            controller: 'PropriedadeNovoController',
            templateUrl: 'vendors/propriedade/novo.html',
            resolve: {
                service: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'js/usuario/UsuarioService.js',
                            'js/propriedade/PropriedadeService.js',
                            'js/navbar/NavbarPropriedadeController.js',
                            'js/propriedade/PropriedadeNovoController.js'
                        ]
                    });
                }]
            }
        });

        //INICIO
        $stateProvider.state('inicio', {
            url: "/inicio", // root route
            templateUrl: 'vendors/sistema/index.html',
            resolve: {
                service: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'js/usuario/UsuarioFactory.js',
                            'js/navbar/NavbarDefaultController.js'
                        ]
                    });
                }]
            }
        });

        //ANIMAL
        $stateProvider.state('animal', {
            url: "/animais/inicio", // root route
            controller: 'AnimalIndexController',
            templateUrl: 'vendors/animal/index.html',
            resolve: {
                service: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'js/usuario/UsuarioFactory.js',
                            'js/navbar/NavbarDefaultController.js',
                            'js/animal/AnimalIndexController.js',
                            'js/animal/AnimalService.js'
                        ]
                    });
                }]
            }
        });

        //BEZERRO
        $stateProvider.state('bezerro', {
            url: "/bezerro/:idBezerro/detalhes", // root route
            controller: 'BezerroDetalheController',
            templateUrl: 'vendors/bezerro/index.html',
            resolve: {
                service: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'js/usuario/UsuarioFactory.js',
                            'js/navbar/NavbarDefaultController.js',
                            'js/animal/AnimalService.js',
                            'js/bezerro/BezerroDetalheController.js'
                        ]
                    });
                }]
            }
        });

        // ERROS
        $stateProvider.state('500', {
            url: "/500",
            templateUrl: 'vendors/sistema/500.html'
        });

        $urlRouterProvider.otherwise('/login');

    }]);
