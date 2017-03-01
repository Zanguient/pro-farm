angular.module('profarm').controller('EngordaNovoController', function($scope, $routeParams, $location, Engorda) {

    $scope.buttonBlock = false;
    $scope.engorda = {
        animal: $routeParams.idAnimal,
        data: new Date()
    };

    $scope.cancelar = function() {
        $location.path('/animais/' + $routeParams.idAnimal + '/detalhes');
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
