angular.module('profarm').controller('NavbarLoginController', ['$state', '$scope', '$localStorage', '$location', 'Usuario', function($state, $scope, $localStorage, $location, Usuario) {

    if ($localStorage.token && $localStorage.propriedade) {
        $location.path('/inicio');
    } else if ($localStorage.token) {
        $state.go('propriedade');
    }

    $scope.entrar = function() {
        var formData = {
            username: $scope.username,
            password: $scope.password
        };
        Usuario.signin(formData);
    };

}]);
