angular.module('profarm').controller('NavbarPropriedadeController', ['$scope', '$localStorage', 'Usuario', function($scope, $localStorage, Usuario) {

    $scope.usuario = $localStorage.usuario;

    $scope.desconectar = function() {
        Usuario.logout();
    };
}]);
