angular.module('profarm').controller('LoteNovoController', function($routeParams, $scope, $localStorage, $location, Animal, Lote, Funcionario, Semen, Usuario) {

    $scope.lote_navbar = true;
    $scope.alerts = [];
    $scope.lote = {};
    $scope.cobertura = {};
    $scope.animais_selecionados = [];
    $scope.busca = '';

    Usuario.me((atual) => {
        Semen.todosDoUsuario(atual._id, (semens) => {
            $scope.semens = semens;
        });
    });

    Animal.todos($localStorage.propriedade._id, (resultado) => {
        $scope.animais = resultado;
    });

    Funcionario.todosJuntos($localStorage.propriedade._id, (result) => {
        $scope.funcionarios = result;
    });

    $scope.closeAlert = function(index) {
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
        switch ($scope.lote.acao) {
            case 'cobertura':
                {
                    alert('cobertura');
                }
                break;
            case 'vacinacao':
                {
                    alert('vacinacao');
                }
                break;
            default:
                {
                    alert('oxi');
                }
        }
    };

    $scope.cancelar = () => {
        $location.path('/lotes');
    };

});
