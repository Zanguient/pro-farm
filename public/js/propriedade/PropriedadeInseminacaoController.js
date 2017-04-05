angular.module('profarm').controller('PropriedadeInseminacaoController', function($routeParams, $scope, $localStorage, $route, $location, Usuario, Semen) {

    $scope.prop_navbar = true;
    $scope.prop_sub_navbar = true;
    $scope.alerts = [];
    $scope.semen = null;
    $scope.edicao = false;

    Usuario.me((usuario) => {
        $scope.usuario_id = usuario._id;
        Semen.todosDoUsuario(usuario._id, (semens) => {
            $scope.semens = semens;
        });
    });

    $scope.novo = () => {
        $scope.edicao = true;
        $scope.semen = {
            usuario: $scope.usuario_id
        };
    };

    $scope.salvar = () => {
        Semen.salvar($scope.usuario_id, $scope.semen, (result) => {
            $route.reload();
        });
    };

    $scope.cancelar = () => {
        $route.reload();
    };

    $scope.editar = () => {
        $scope.edicao = true;
    };

    $scope.remover = () => {
        Semen.excluir($scope.usuario_id, $scope.semen._id, () => {
            $route.reload();
        });
    };

    $scope.selecionar = (index) => {
        $scope.semen = $scope.semens[index];
        $scope.edicao = false;
    };

    $scope.closeAlert = (index) => {
        $scope.alerts.splice(index, 1);
    };

});
