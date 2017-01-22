angular.module('profarm').controller('NavbarDefaultController', ['$scope', '$localStorage', function($scope, $localStorage) {

    $scope.usuario = $localStorage.usuario;
    $scope.prop = $localStorage.propriedade;

    $scope.desconectar = function() {
        Usuario.logout();
    };
}]);
