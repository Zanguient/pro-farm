angular.module('profarm').controller('AnimalDetalheController', function($routeParams, $scope, $localStorage, $route, $location, $window, Animal, Recria, Indice, Engorda) {

    $scope.animal_navbar = true;
    $scope.alerts = [];
    $scope.edicao = false;
    $scope.buttonBlock = false;

    if ($routeParams.idAnimal) {
        Animal.buscar({
            propriedade: {
                _id: $localStorage.propriedade._id
            },
            animal: {
                _id: $routeParams.idAnimal
            }
        }).then(function(animal) {
            $scope.bezerro = animal;
            $scope.codigo = animal.codigo.toString();
            Animal.exibirIdade(animal.nascimento, function(idade) {
                $scope.idade = idade;
            })
        }).catch(function(res) {
            $scope.alerts.push({
                type: 'danger',
                msg: 'Houve um erro ao buscar o animal com _Id ' + $routeParams.idAnimal + '. Verifique o log no navegador.'
            });
            console.log(res);
        });

        Recria.buscarPorBezerro({
            _id: $routeParams.idAnimal
        }).then(function(recria) {
            $scope.recria = recria;
            if (recria.data_saida) {
                Recria.calcularGanhoDePesoDiario({
                    inicial: recria.data,
                    final: recria.data_saida,
                    peso_entrada: recria.peso_entrada,
                    peso_saida: recria.peso_saida
                }, function(resultado) {
                    $scope.recria.ganho_peso_medio = (resultado == '-Infinity') ? null : resultado;
                });
            }
        }).catch(function(err) {
            console.log(err);
        });

        Engorda.buscarPorBezerro({
            _id: $routeParams.idAnimal
        }).then(function(engorda) {
            $scope.engorda = engorda;
        }).catch(function(err) {
            console.log(err);
        });
    }

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.habilitarEdicao = function() {
        $scope.edicao = true;
    };

    $scope.editarRecria = function() {
        ($scope.engorda) ? $window.alert('Não é possível editar este registro de recria. Foram encontrador registros após a recria que impedem esta ação.'): $location.path('/animais/' + $scope.bezerro._id + '/recria/' + $scope.recria._id + '/editar');
    };

    $scope.salvar = function() {
        if ($("#codigo_reprodutora_form").hasClass('has-warning')) {
            console.log('nao rola fion');
        } else {
            $scope.edicao = false;
            Animal.salvarBezerro($scope.bezerro).then(
                function(res) {
                    $route.reload();
                }).catch(function(err) {
                $scope.alerts.push({
                    type: 'danger',
                    msg: 'Houve um erro ao salvar o animal ' + $scope.codigo + '. Verifique o log no navegador.'
                });
                console.log(res);
            });
        }
    };

    $scope.verificarCodigoDoAnimal = function() {
        if (!($scope.bezerro.codigo == $scope.codigo)) {
            Animal.verificarCodigo({
                propriedade: $localStorage.propriedade._id,
                codigo: $scope.bezerro.codigo
            }, function(result) {
                console.log(result);
                if (result) {
                    $("#codigo_reprodutora_form").addClass('has-warning');
                    $scope.buttonBlock = true;
                } else {
                    $("#codigo_reprodutora_form").removeClass('has-warning');
                    $scope.buttonBlock = false;
                }
            });
        }
    };

    $scope.cancelar = function() {
        $route.reload();
    };

    $scope.informarDesmama = function() {
        ($scope.bezerro.peso_entrada && $scope.bezerro.codigo) ? $location.path('/animais/' + $scope.bezerro._id + '/recria/novo'): $window.alert('Algumas informações importantes do animal estão em branco. Por favor, verifique e complete - os.');
    };

    $scope.excluirRecria = function() {
        ($scope.engorda) ? $window.alert('Não é possível remover este registro de recria. Foram encontrador registros após a recria que impedem esta ação.'): confirmarExclusao();
    };

    function confirmarExclusao() {
        if ($window.confirm("Confirme a exclusão da recria do animal " + $scope.bezerro.codigo)) {
            Recria.excluir({
                _id: $scope.recria._id,
                animal: $scope.bezerro._id
            }, function(result) {
                console.log(result);
                $route.reload();
            });
        }
    }

    $scope.abrirEngorda = function() {
        $location.path('/animais/' + $routeParams.idAnimal + '/engorda/' + $scope.engorda._id + '/detalhes');
    };

});
