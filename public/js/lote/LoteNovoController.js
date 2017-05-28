angular.module('profarm').controller('LoteNovoController', function($routeParams, $scope, $localStorage, $location, Animal, Lote, Funcionario, Semen, Usuario) {

    $scope.lote_navbar = true;
    $scope.alerts = [];
    $scope.lote = {
        propriedade: $localStorage.propriedade._id
    };
    $scope.cobertura = {};
    $scope.animais_selecionados = [];
    $scope.busca = '';
    $scope.max_date = new Date();

    Usuario.me((atual) => {
        Semen.todosDoUsuario(atual._id, (semens) => {
            $scope.semens = semens;
        });
    });

    Funcionario.todosJuntos($localStorage.propriedade._id, (result) => {
        $scope.funcionarios = result;
    });

    $scope.buscarDeterminadoGrupoDeAnimais = (tipo) => {
        if ($scope.animais_selecionados.length > 0) {
            if (confirm("Os animais selecionados na " + tipo + " serão removidos da lista. Deseja continuar?")) {
                $scope.animais_selecionados = [];
                $scope.busca = '';
                buscarAnimais(tipo);
            }
        } else {
            buscarAnimais(tipo);
        }
    };

    function buscarAnimais(tipo) {
        if (angular.equals(tipo, "cobertura")) {
            Animal.paraCobertura($localStorage.propriedade._id, (resultado) => {
                $scope.animais = resultado;
            });
        } else {
            Animal.todos($localStorage.propriedade._id, (resultado) => {
                $scope.animais = resultado;
            })
        }
    }

    $scope.closeAlert = (index) => {
        $scope.alerts.splice(index, 1);
    };

    $scope.selecionar = (objeto) => {
        objeto.disabled = true;
        $scope.animais_selecionados.push(objeto);
    };

    $scope.removerAnimalSelecionado = (index) => {
        $scope.animais.filter((animal) => {
            if (animal._id == $scope.animais_selecionados[index]._id) {
                animal.disabled = false;
            }
        });
        $scope.animais_selecionados.splice(index, 1);
    };

    $scope.salvar = () => {
        if ($scope.animais_selecionados.length > 0) {
            switch ($scope.lote.acao) {
                case 'cobertura':
                    {
                        $scope.cobertura.data = $scope.lote.data;
                        Lote.salvarComCobertura($localStorage.propriedade._id, $scope.lote, $scope.cobertura, $scope.animais_selecionados, (lote) => {
                            $location.path('/lotes/' + lote._id);
                        });
                    }
                    break;
                case 'vacinacao':
                    {
                        alert('vacinacao');
                    }
                    break;
                default:
                    {
                        alert('Selecione um ação para o lote a ser criado.');
                    }
            }
        } else {
            alert('Inclua ao menos 1 animal no lote para continuar.');
        }
    };

    $scope.cancelar = () => {
        if (confirm('Deseja realmente cancelar a criação de um novo lote?')) {
            $location.path('/lotes');
        }
    };

});
