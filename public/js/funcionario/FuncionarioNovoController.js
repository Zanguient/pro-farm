angular.module('profarm').controller('FuncionarioNovoController', function($routeParams, $scope, $localStorage, $location, Cbo, Funcionario) {

    $scope.prop_navbar = true;
    $scope.func_sub_navbar = true;
    $scope.alerts = [];
    $scope.edicao = true
    $scope.funcionario = {
        telefone: [],
        propriedade: $localStorage.propriedade._id
    };

    Cbo.getAll((result) => {
        $scope.cbos = result;
    });

    $scope.salvar = () => {
        Funcionario.salvar($scope.funcionario, (result) => {
            $location.path('/funcionarios');
        });
    }

    $scope.cancelar = () => {
        if (confirm('Deseja realmente cancelar a criação de um novo funcionário?')) {
            $location.path('/funcionarios');
        }
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

});
