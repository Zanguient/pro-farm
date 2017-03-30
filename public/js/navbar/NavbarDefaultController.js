angular.module('profarm').controller('NavbarDefaultController', ['$scope', '$localStorage', 'Usuario', function($scope, $localStorage, Usuario) {

    $scope.prop = $localStorage.propriedade;

    Usuario.me(function(user) {
        $scope.usuario = user;
    });

    $scope.desconectar = function() {
        Usuario.logout();
    };
}]);
