angular.module('profarm').controller('FuncionarioEditaController', function($routeParams, $scope, $route, $localStorage, $location, Cbo, Funcionario) {

    $scope.prop_navbar = true;
    $scope.func_sub_navbar = true;
    $scope.edicao = false;
    $scope.alerts = [];

    if ($routeParams.id) {
        Funcionario.buscar($routeParams.id, $localStorage.propriedade._id, (funcionario) => {
            $scope.funcionario = funcionario;
        });

        Cbo.getAll((result) => {
            $scope.cbos = result;
        });
    }


    $scope.salvar = () => {
        Funcionario.salvar($scope.funcionario, (result) => {
            $route.reload();
        });
    }

    $scope.editar = () => {
        $scope.edicao = true;
    }

    $scope.cancelar = () => {
        $scope.edicao = false;
    }

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

});
