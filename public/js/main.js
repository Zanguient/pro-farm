angular.module('profarm', ['oc.lazyLoad', 'ngRoute', 'ngResource', 'ngStorage', 'angular-loading-bar', 'ui.bootstrap', 'monospaced.qrcode'])
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

        //PROPRIEDADE INDEX
        $routeProvider.when('/propriedade/index', {
            controller: 'PropriedadeIndexController',
            templateUrl: 'vendors/propriedade/index.html',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'profarm',
                        files: [
                            'js/usuario/UsuarioService.js',
                            'js/usuario/UsuarioFactory.js',
                            'js/navbar/NavbarDefaultController.js',
                            'js/propriedade/PropriedadeIndexController.js'
                        ]
                    });
                }]
            }
        }).when('/propriedade/inseminacao', {
            controller: 'PropriedadeInseminacaoController',
            templateUrl: 'vendors/propriedade/inseminacao.html',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'profarm',
                        files: [
                            'js/usuario/UsuarioService.js',
                            'js/usuario/UsuarioFactory.js',
                            'js/navbar/NavbarDefaultController.js',
                            'js/semen/SemenService.js',
                            'js/propriedade/PropriedadeInseminacaoController.js'
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
                            'js/usuario/UsuarioService.js',
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
                            'js/usuario/UsuarioService.js',
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
                            'js/usuario/UsuarioService.js',
                            'js/usuario/UsuarioFactory.js',
                            'js/sistema/IndicesFactory.js',
                            'js/navbar/NavbarDefaultController.js',
                            'js/animal/AnimalService.js',
                            'js/recria/RecriaService.js',
                            'js/engorda/EngordaService.js',
                            'js/propriedade/SanidadeService.js',
                            'js/cobertura/CoberturaService.js',
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
                            'js/usuario/UsuarioService.js',
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
                            'js/usuario/UsuarioService.js',
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
                            'js/usuario/UsuarioService.js',
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
                            'js/usuario/UsuarioService.js',
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
                            'js/usuario/UsuarioService.js',
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
                            'js/usuario/UsuarioService.js',
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

        // LOTES
        $routeProvider.when('/lotes', {
            controller: 'LoteIndexController',
            templateUrl: 'vendors/lote/index.html',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'js/usuario/UsuarioService.js',
                            'js/usuario/UsuarioFactory.js',
                            'js/navbar/NavbarDefaultController.js',
                            'js/animal/AnimalService.js',
                            'js/lote/LoteService.js',
                            'js/lote/LoteIndexController.js'
                        ]
                    });
                }]
            }
        }).when('/lotes/novo', {
            controller: 'LoteNovoController',
            templateUrl: 'vendors/lote/novo.html',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'js/usuario/UsuarioService.js',
                            'js/usuario/UsuarioFactory.js',
                            'js/navbar/NavbarDefaultController.js',
                            'js/animal/AnimalService.js',
                            'js/propriedade/SanidadeService.js',
                            'js/lote/LoteService.js',
                            'js/funcionario/FuncionarioService.js',
                            'js/lote/LoteNovoController.js',
                            'js/semen/SemenService.js'
                        ]
                    });
                }]
            }
        }).when('/lotes/:idLote', {
            controller: 'LoteDetalhesController',
            templateUrl: 'vendors/lote/detalhes.html',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'js/usuario/UsuarioService.js',
                            'js/usuario/UsuarioFactory.js',
                            'js/navbar/NavbarDefaultController.js',
                            'js/cobertura/CoberturaService.js',
                            'js/lote/LoteService.js',
                            'js/propriedade/SanidadeService.js',
                            'js/lote/LoteDetalhesController.js',
                        ]
                    });
                }]
            }
        });

        // FUNCIONARIOS
        $routeProvider.when('/funcionarios', {
            controller: 'FuncionarioIndexController',
            templateUrl: 'vendors/funcionario/index.html',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'js/usuario/UsuarioService.js',
                            'js/usuario/UsuarioFactory.js',
                            'js/navbar/NavbarDefaultController.js',
                            'js/funcionario/FuncionarioService.js',
                            'js/funcionario/FuncionarioIndexController.js'
                        ]
                    });
                }]
            }
        }).when('/funcionarios/novo', {
            controller: 'FuncionarioNovoController',
            templateUrl: 'vendors/funcionario/novo.html',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'js/usuario/UsuarioService.js',
                            'js/usuario/UsuarioFactory.js',
                            'js/navbar/NavbarDefaultController.js',
                            'js/funcionario/FuncionarioService.js',
                            'js/sistema/CBOFactory.js',
                            'js/funcionario/FuncionarioNovoController.js'
                        ]
                    });
                }]
            }
        }).when('/funcionarios/:id', {
            controller: 'FuncionarioEditaController',
            templateUrl: 'vendors/funcionario/novo.html',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'js/usuario/UsuarioService.js',
                            'js/usuario/UsuarioFactory.js',
                            'js/navbar/NavbarDefaultController.js',
                            'js/funcionario/FuncionarioService.js',
                            'js/sistema/CBOFactory.js',
                            'js/funcionario/FuncionarioEditaController.js'
                        ]
                    });
                }]
            }
        });

        // COBERTURAS
        $routeProvider.when('/cobertura/:id', {
            controller: 'CoberturaDetalhesController',
            templateUrl: 'vendors/cobertura/detalhes.html',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'js/usuario/UsuarioService.js',
                            'js/usuario/UsuarioFactory.js',
                            'js/navbar/NavbarDefaultController.js',
                            'js/cobertura/CoberturaService.js',
                            'js/parto/PartoService.js',
                            'js/animal/AnimalService.js',
                            'js/cobertura/CoberturaDetalhesController.js'
                        ]
                    });
                }]
            }
        })

        // SANIDADE ANIMAL
        $routeProvider.when('/sanidade/:destino', {
            controller: 'PropriedadeSanidadeController',
            templateUrl: 'vendors/propriedade/sanidade.html',
            resolve: {
                lazy: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        serie: true,
                        files: [
                            'js/usuario/UsuarioService.js',
                            'js/usuario/UsuarioFactory.js',
                            'js/navbar/NavbarDefaultController.js',
                            'js/propriedade/SanidadeService.js',
                            'js/propriedade/PropriedadeSanidadeController.js'
                        ]
                    });
                }]
            }
        })

        // ERROS
        $routeProvider.when('/500', {
            templateUrl: 'vendors/sistema/500.html'
        }).when('/404', {
            templateUrl: 'vendors/sistema/404.html'
        });

        $routeProvider.otherwise('/');

    }]);
