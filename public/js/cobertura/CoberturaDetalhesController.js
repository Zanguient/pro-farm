angular.module('profarm').controller('CoberturaDetalhesController', function($scope, $routeParams, $window, $localStorage, $location, $route, Cobertura, Parto) {

    $scope.animal = null;
    $scope.parto = null;
    $scope.edicao = false;
    $scope.max_date = new Date();

    if ($routeParams.id) {
        Cobertura.buscar($routeParams.id, (cobertura) => {
            $scope.cobertura = cobertura;
            Cobertura.verificarSePodeRealizarOParto(cobertura.diagnostico, (resultado) => {
                $scope.validarDiagnosticos = resultado;
            });
        });
    }

    $scope.registrarParto = () => {
        $scope.edicao = true;
        $scope.animal = {
            propriedade: $localStorage.propriedade._id,
            peso: {
                entrada: {
                    valor: null
                }
            }
        };
        $scope.parto = {
            cobertura: $scope.cobertura._id
        };
    };

    $scope.cancelar = () => {
        $route.reload();
    };

    $scope.salvar = () => {
        Parto.salvar($scope.parto, $scope.animal, $scope.cobertura.animal._id, (resultado) => {
            console.log('deu');
        });
    };

});
