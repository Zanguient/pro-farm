angular.module('profarm', ['oc.lazyLoad', 'ngRoute', 'ngResource', 'ngStorage', 'angular-loading-bar', 'ui.bootstrap'])
    .config(['$httpProvider', '$routeProvider', 'cfpLoadingBarProvider', '$sceDelegateProvider', '$locationProvider', function($httpProvider, $routeProvider, cfpLoadingBarProvider, $sceDelegateProvider, $locationProvider) {

        cfpLoadingBarProvider.includeSpinner = false;
        $locationProvider.hashPrefix('');
        $httpProvider.interceptors.push('UsuarioInterceptor');

        // LOGIN && PROPRIEDADE
        $routeProvider.when('/', {
            templateUrl: 'vendors/usuario/login.html',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load([{
                        name: 'profarm',
                        files: [
                            'js/usuario/UsuarioService.js',
                            'js/navbar/NavbarLoginController.js'
                        ]
                    }]);
                }]
            }
        }).when('/propriedade', {
            controller: 'PropriedadeSelecionarController',
            templateUrl: 'vendors/propriedade/selecionar.html',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'profarm',
                        files: [
                            'js/usuario/UsuarioService.js',
                            'js/propriedade/PropriedadeService.js',
                            'js/navbar/NavbarPropriedadeController.js',
                            'js/propriedade/PropriedadeSelecionarController.js'
                        ]
                    });
                }]
            }
        }).when('/propriedade/novo', {
            controller: 'PropriedadeNovoController',
            templateUrl: 'vendors/propriedade/novo.html',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'profarm',
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
        $routeProvider.when('/inicio', {
            templateUrl: 'vendors/sistema/index.html',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'profarm',
                        files: [
                            'js/usuario/UsuarioFactory.js',
                            'js/navbar/NavbarDefaultController.js'
                        ]
                    });
                }]
            }
        });

        //ANIMAL
        $routeProvider.when('/animais/inicio', {
            controller: 'AnimalIndexController',
            templateUrl: 'vendors/animal/index.html',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'profarm',
                        files: [
                            'js/usuario/UsuarioFactory.js',
                            'js/navbar/NavbarDefaultController.js',
                            'js/animal/AnimalIndexController.js',
                            'js/animal/AnimalService.js'
                        ]
                    });
                }]
            }
        }).when('/animais/:idAnimal/detalhes', {
            controller: 'AnimalDetalheController',
            templateUrl: 'vendors/animal/detalhe.html',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'js/usuario/UsuarioFactory.js',
                            'js/sistema/IndicesFactory.js',
                            'js/navbar/NavbarDefaultController.js',
                            'js/animal/AnimalService.js',
                            'js/recria/RecriaService.js',
                            'js/engorda/EngordaService.js',
                            'js/animal/AnimalDetalheController.js'
                        ]
                    });
                }]
            }
        });

        //GARROTE
        $routeProvider.when('/garrote/:idGarrote/detalhes', {
            controller: 'GarroteDetalheController',
            templateUrl: 'vendors/garrote/index.html',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'js/usuario/UsuarioFactory.js',
                            'js/navbar/NavbarDefaultController.js',
                            'js/animal/AnimalService.js',
                            'js/garrote/GarroteDetalheController.js'
                        ]
                    });
                }]
            }
        });

        //NOVILHO
        $routeProvider.when('/novilho/:idNovilho/detalhes', {
            controller: 'NovilhoDetalheController',
            templateUrl: 'vendors/novilho/index.html',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'js/usuario/UsuarioFactory.js',
                            'js/navbar/NavbarDefaultController.js',
                            'js/animal/AnimalService.js',
                            'js/novilho/NovilhoDetalheController.js'
                        ]
                    });
                }]
            }
        });

        //BOI
        $routeProvider.when('/boi/:idBoi/detalhes', {
            controller: 'BoiDetalheController',
            templateUrl: 'vendors/boi/index.html',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'js/usuario/UsuarioFactory.js',
                            'js/navbar/NavbarDefaultController.js',
                            'js/animal/AnimalService.js',
                            'js/boi/BoiDetalheController.js'
                        ]
                    });
                }]
            }
        });

        // RECRIA
        $routeProvider.when('/animais/:idAnimal/recria/novo', {
            controller: 'RecriaNovoController',
            templateUrl: 'vendors/recria/novo.html',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'js/usuario/UsuarioFactory.js',
                            'js/navbar/NavbarDefaultController.js',
                            'js/recria/RecriaService.js',
                            'js/recria/RecriaNovoController.js'
                        ]
                    });
                }]
            }
        }).when('/animais/:idAnimal/recria/:idRecria/editar', {
            controller: 'RecriaEditarController',
            templateUrl: 'vendors/recria/novo.html',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'js/usuario/UsuarioFactory.js',
                            'js/navbar/NavbarDefaultController.js',
                            'js/recria/RecriaService.js',
                            'js/recria/RecriaEditarController.js'
                        ]
                    });
                }]
            }
        });

        // ENGORDA
        $routeProvider.when('/animais/:idAnimal/engorda/:idEngorda/detalhes', {
            controller: 'EngordaDetalhesController',
            templateUrl: 'vendors/engorda/detalhes.html',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'js/usuario/UsuarioFactory.js',
                            'js/navbar/NavbarDefaultController.js',
                            'js/animal/AnimalService.js',
                            'js/engorda/EngordaService.js',
                            'js/engorda/EngordaDetalhesController.js'
                        ]
                    });
                }]
            }
        }).when('/animais/:idAnimal/recria/:idRecria/engorda/novo', {
            controller: 'EngordaNovoController',
            templateUrl: 'vendors/engorda/novo.html',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'js/usuario/UsuarioFactory.js',
                            'js/navbar/NavbarDefaultController.js',
                            'js/animal/AnimalService.js',
                            'js/engorda/EngordaService.js',
                            'js/engorda/EngordaNovoController.js'
                        ]
                    });
                }]
            }
        }).when('/animais/:idAnimal/engorda/:idEngorda/editar', {
            controller: 'EngordaEditaController',
            templateUrl: 'vendors/engorda/novo.html',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'js/usuario/UsuarioFactory.js',
                            'js/navbar/NavbarDefaultController.js',
                            'js/animal/AnimalService.js',
                            'js/engorda/EngordaService.js',
                            'js/engorda/EngordaEditaController.js'
                        ]
                    });
                }]
            }
        });

        // ERROS
        $routeProvider.when('/500', {
            templateUrl: 'vendors/sistema/500.html'
        }).when('/404', {
            templateUrl: 'vendors/sistema/404.html'
        });

        $routeProvider.otherwise('/');

    }]);
