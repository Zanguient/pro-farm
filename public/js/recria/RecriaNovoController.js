angular.module('profarm').controller('RecriaNovoController', function($routeParams, $scope, $localStorage, $location, $route, Animal, Recria) {

    $scope.animal_navbar = true;
    $scope.alerts = [];
    $scope.buttonBlock = false;
    $scope.bezerro = $routeParams.idBezerro;
    $scope.recria = {
        bezerro: $routeParams.idBezerro
    };

    $scope.salvar = function() {
        $scope.buttonBlock = true;
        Recria.salvar($scope.recria).then(function(recria) {
            $location.path('/bezerro/' + $routeParams.idBezerro + '/detalhes')
        }).catch(function(err) {
            console.log(err);
        });
    };

    $scope.cancelar = function() {
        $location.path('/bezerro/' + $scope.bezerro + '/detalhes');
    };
});
