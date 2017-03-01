angular.module('profarm').controller('EngordaEditaController', function($scope, $routeParams, $location, Engorda) {

    $scope.buttonBlock = false;

    if ($routeParams.idAnimal && $routeParams.idEngorda) {
        Engorda.buscarPorID({
            _id: $routeParams.idEngorda,
            bezerro: $routeParams.idAnimal
        }, function(result) {
            $scope.engorda = result;
            console.log(result);
        });
    }

    $scope.cancelar = function() {
        $location.path('/bezerro/' + $routeParams.idAnimal + '/detalhes');
    };

    $scope.salvar = function() {
        $scope.buttonBlock = true;
        Engorda.salvar($scope.engorda).then(
            function(engorda) {
                $location.path('/animais/' + $routeParams.idAnimal + '/engorda/' + engorda._id + '/detalhes');
            }).catch(function(err) {
            $scope.buttonBlock = false;
            console.log(err);
        });
    };

});
