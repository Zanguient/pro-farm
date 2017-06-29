angular.module('profarm').controller('CoberturaDetalhesController', function($scope, $routeParams, $window, $localStorage, $location, $route, Cobertura, Parto, Animal) {

    $scope.animal = null;
    $scope.parto = null;
    $scope.edicao = false;
    $scope.max_date = new Date();

    if ($routeParams.id) {
        Cobertura.buscar($routeParams.id, (cobertura) => {
            $scope.cobertura = cobertura;
            Parto.buscarPartoPelaCobertura(cobertura._id, (parto) => {
                $scope.parto = parto;
                if (parto) {
                    Animal.buscaUmPeloParto(parto._id, (result) => {
                        $scope.animal = result;
                        console.log(result);
                    })
                }
            });
            Cobertura.verificarSePodeRealizarOParto(cobertura.diagnostico, (resultado) => {
                $scope.validarDiagnosticos = resultado;
            });
        });
    }

    $scope.registrarParto = () => {
        $scope.edicao = true;
        $scope.animal = {
            propriedade: $localStorage.propriedade._id,
            peso: []
        };
        $scope.parto = {
            cobertura: $scope.cobertura._id,
            animal: $scope.cobertura._id
        };
    };

    $scope.cancelar = () => {
        $route.reload();
    };

    $scope.salvar = () => {
        $scope.parto.animal = $scope.cobertura.animal;
        $scope.animal.peso.push({
            valor: $scope.animal.peso_entrada
        });
        Parto.salvar($scope.parto, $scope.animal, (resultado) => {
            $location.path('/animais/' + resultado._id + '/detalhes');
        });
    };

    $scope.atualizar = () => {
        Parto.salvar($scope.parto, null, (resultado) => {
            $route.reload();
        });
    };

    $scope.abrirAnimalDoParto = (id) => {
        $location.path('/animais/' + id + '/detalhes');
    }

});
