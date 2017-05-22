angular.module('profarm').controller('RecriaNovoController', function($routeParams, $scope, $localStorage, $location, $route, Recria) {

    $scope.animal_navbar = true;
    $scope.alerts = [];
    $scope.buttonBlock = false;
    $scope.max_date = new Date();
    
    $scope.recria = {
        animal: $routeParams.idAnimal,
        data: new Date()
    };

    $scope.salvar = function() {
        $scope.buttonBlock = true;
        Recria.salvar($scope.recria).then(function(recria) {
            $location.path('/animais/' + $routeParams.idAnimal + '/detalhes')
        }).catch(function(err) {
            console.log(err);
        });
    };

    $scope.cancelar = function() {
        $location.path('/animais/' + $scope.recria.animal + '/detalhes');
    };
});
