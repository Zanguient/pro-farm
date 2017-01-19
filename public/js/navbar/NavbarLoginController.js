angular.module('profarm').controller('NavbarLoginController', ['$scope', '$localStorage', '$location', 'Usuario', function($scope, $localStorage, $location, Usuario) {

    // if ($localStorage.token && $localStorage.prop) {
    //     $location.path('/inicio');
    // } else if ($localStorage.token) {
    //     $location.path('/propriedades');
    // }

    $scope.entrar = function() {
        var formData = {
            username: $scope.username,
            password: $scope.password
        };
        Usuario.signin(formData);
    };

}]);
