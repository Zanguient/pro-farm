(function() {
    angular.module('profarm').controller('AnimalDetalheController', function($routeParams, $scope, $localStorage, $route, $location, $window, Animal, Recria, Indice, Engorda, Cobertura) {

        $scope.animal_navbar = true;
        $scope.alerts = [];
        $scope.edicao = false;
        $scope.buttonBlock = false;
        $scope.idade = [];
        $scope.idade[4] = true; //toggle para mudar a idade do animal
        $scope.max_date = new Date();

        if ($routeParams.idAnimal) {
            Animal.buscar({
                propriedade: {
                    _id: $localStorage.propriedade._id
                },
                animal: {
                    _id: $routeParams.idAnimal
                }
            }, (animal) => {
                $scope.animal = animal;
                $scope.codigo = animal.codigo.toString();
                processarIdadeDoAnimal(animal.nascimento);
            });

            processarIdadeDoAnimal = (nascimento) => {
                Animal.exibirTipoDoAnimal(nascimento, (tipo, anos, meses) => {
                    $scope.idade[2] = tipo; // tipo do animal
                    $scope.idade[1] = anos; // idade em anos
                    $scope.idade[0] = meses; //idade em meses
                });
            }

            Recria.buscarPorBezerro({
                _id: $routeParams.idAnimal
            }, (recria) => {
                $scope.recria = recria;
                if (recria && recria.data_saida) {
                    Recria.calcularGanhoDePesoDiario({
                        inicial: recria.data,
                        final: recria.data_saida,
                        peso_entrada: recria.peso_entrada,
                        peso_saida: recria.peso_saida
                    }, (resultado) => {
                        $scope.recria.ganho_peso_medio = (resultado == '-Infinity') ? null : resultado;
                    });
                }
            });

            Cobertura.doAnimal($routeParams.idAnimal, (coberturas) => {
                $scope.coberturas = coberturas;
            });

            Engorda.buscarPorBezerro({
                _id: $routeParams.idAnimal
            }, (engorda) => {
                $scope.engorda = engorda;
            });
        }

        $scope.toggleIdade = () => {
            $scope.idade[4] = !$scope.idade[4];
        };

        $scope.closeAlert = (index) => {
            $scope.alerts.splice(index, 1);
        };

        $scope.habilitarEdicao = () => {
            $scope.edicao = true;
        };

        $scope.editarRecria = () => {
            ($scope.engorda) ? $window.alert('Não é possível editar este registro de recria. Foram encontrador registros após a recria que impedem esta ação.'): $location.path('/animais/' + $scope.animal._id + '/recria/' + $scope.recria._id + '/editar');
        };

        $scope.salvar = () => {
            if ($("#codigo_reprodutora_form").hasClass('has-warning')) {
                console.log('nao rola fion');
            } else {
                $scope.edicao = false;
                Animal.salvarBezerro($scope.animal, (resultado) => {
                    $route.reload();
                });
            }
        };

        $scope.verificarCodigoDoAnimal = () => {
            if (!($scope.animal.codigo == $scope.codigo)) {
                Animal.verificarCodigo({
                    propriedade: $localStorage.propriedade._id,
                    codigo: $scope.animal.codigo
                }, (result) => {
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

        $scope.cancelar = () => {
            $route.reload();
        };

        $scope.informarDesmama = () => {
            ($scope.animal.peso.entrada.valor && $scope.animal.codigo) ? $location.path('/animais/' + $scope.animal._id + '/recria/novo'): $window.alert('Algumas informações importantes do animal estão em branco. Por favor, verifique e complete - os.');
        };

        $scope.excluirRecria = () => {
            ($scope.engorda) ? $window.alert('Não é possível remover este registro de recria. Foram encontrador registros após a recria que impedem esta ação.'): confirmarExclusao();
        };

        confirmarExclusao = () => {
            if ($window.confirm("Confirme a exclusão da recria do animal " + $scope.animal.codigo)) {
                Recria.excluir({
                    _id: $scope.recria._id,
                    animal: $scope.animal._id
                }, (result) => {
                    $route.reload();
                });
            }
        }

        $scope.abrirEngorda = () => {
            $location.path('/animais/' + $routeParams.idAnimal + '/engorda/' + $scope.engorda._id + '/detalhes');
        };

        $scope.abrirCobertura = (id) => {
            $location.path('/cobertura/' + id);
        };
    });
})();
