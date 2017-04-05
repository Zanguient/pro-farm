angular.module('profarm').controller('FuncionarioIndexController', function($routeParams, $scope, $localStorage, $location, Funcionario) {

    $scope.prop_navbar = true;
    $scope.func_sub_navbar = true;
    $scope.alerts = [];
    console.log($localStorage.propriedade._id);
    Funcionario.todos(
        $localStorage.propriedade._id, (result) => {
            $scope.registrados = result[0];
            $scope.tercerizados = result[1];
        });

    $scope.novo = () => {
        $location.path('/funcionarios/novo');
    };

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

});
