angular.module('profarm').controller('EngordaDetalhesController', function($scope, $routeParams, $window, $location, $route, Engorda) {

    if ($routeParams.idAnimal && $routeParams.idEngorda) {
        $scope.idAnimal = $routeParams.idAnimal;
        $scope.idEngorda = $routeParams.idEngorda;

        Engorda.buscarPorID({
            _id: $scope.idEngorda,
            bezerro: $scope.idAnimal
        }, function(engorda) {
            $scope.engorda = engorda;
            if (engorda.acompanhamento.length > 1) {
                Engorda.ganhoDePeso(engorda.peso_entrada, engorda.acompanhamento, function(resultado) {
                    $scope.ganhoDePeso = resultado;
                });
            } else {
                $scope.ganhoDePeso = null;
            }
        });
    }

    $scope.salvarAcompanhamento = function() {
        Engorda.salvarAcompanhamento({
            _id: $scope.engorda._id,
            data: $scope.acompanhamento
        }).then(function(engorda) {
            $route.reload();
        }).catch(function(err) {
            console.log(err);
        });
    };

    $scope.selecionarAcompanhamento = function(aux) {
        aux.data = new Date(aux.data);
        $scope.acompanhamento = aux;
    };

    $scope.cancelarAcompanhamento = function() {
        $scope.acompanhamento = null;
    };

    $scope.exlcuirAcompanhamento = function() {
        if (confirm('Confirme a exclusão do acompanhamento realizado em ' + $scope.acompanhamento.data + ' com o peso registrado de ' + $scope.acompanhamento.peso + '.')) {
            Engorda.excluirAcompanhamento({
                _id: $scope.engorda._id,
                acompanhamento: $scope.acompanhamento._id
            }).then(function() {
                $route.reload();
            }).catch(function(err) {
                console.log(err);
            });
        }
    };

    $scope.excluir = function() {
        if ($window.confirm("Confirme a exclusão desta engorda.")) {
            Engorda.excluir({
                idEngorda: $scope.engorda._id,
                idAnimal: $scope.engorda.animal
            }, function(result) {
                $location.path('/animais/' + $scope.idAnimal + '/detalhes')
            });
        }
    };

    $scope.editar = function() {
        $location.path('/animais/' + $scope.engorda.animal + '/engorda/' + $scope.engorda._id + '/editar');
    };

});
