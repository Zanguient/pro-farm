angular.module('profarm').controller('NavbarLoginController', function($scope, $localStorage, $location, Usuario) {

    if ($localStorage.token) {
        $location.path('/propriedade');
    }

    $scope.entrar = function() {
        var formData = {
            username: $scope.username,
            password: $scope.password
        };
        Usuario.signin(formData);
    };

});
