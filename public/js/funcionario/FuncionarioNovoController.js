angular.module('profarm').controller('FuncionarioNovoController', function($routeParams, $scope, $localStorage, $location, Cbo, Funcionario) {

    $scope.prop_navbar = true;
    $scope.prop_sub_navbar = true;
    $scope.alerts = [];
    $scope.funcionario = {
        telefone: [],
        propriedade: $localStorage.propriedade._id
    };

    Cbo.getAll((result) => {
        $scope.cbos = result;
    });

    $scope.salvar = () => {
        Funcionario.salvar($scope.funcionario, (result) => {
            console.log('deu');
        });
    }

    $scope.novo = () => {
        $location.path('/funcionarios/novo');
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

});
