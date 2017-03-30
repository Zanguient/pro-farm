angular.module('profarm').controller('NavbarPropriedadeController', ['$scope', '$localStorage', 'Usuario', function($scope, $localStorage, Usuario) {

    Usuario.me(function(user) {
        $scope.usuario = user;
    });

    $scope.desconectar = function() {
        Usuario.logout();
    };
}]);
