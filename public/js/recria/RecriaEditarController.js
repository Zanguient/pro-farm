angular.module('profarm').controller('RecriaEditarController', function($routeParams, $scope, $localStorage, $location, $route, Recria) {

    $scope.animal_navbar = true;
    $scope.alerts = [];
    $scope.buttonBlock = false;
    $scope.max_date = new Date();

    if ($routeParams.idAnimal && $routeParams.idRecria) {
        Recria.buscarPorID({
            _id: $routeParams.idRecria,
            animal: $routeParams.idAnimal
        }).then(function(recria) {
            $scope.recria = recria;
            console.log(recria);
        }).catch(function(err) {
            console.log(err);
        });
    }

    $scope.salvar = function() {
        $scope.buttonBlock = true;
        Recria.salvar($scope.recria).then(function(recria) {
            $location.path('/animais/' + $routeParams.idAnimal + '/detalhes')
        }).catch(function(err) {
            console.log(err);
        });
    };

    $scope.cancelar = function() {
        $location.path('/animais/' + $routeParams.idAnimal + '/detalhes');
    };
});
