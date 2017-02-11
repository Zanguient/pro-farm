angular.module('profarm').controller('GarroteDetalheController', function($routeParams, $scope, $localStorage, Animal) {

    $scope.animal_navbar = true;
    $scope.alerts = [];

    if ($routeParams.idGarrote) {
        Animal.buscar({
            propriedade: {
                _id: $localStorage.propriedade._id
            },
            animal: {
                _id: $routeParams.idGarrote
            }
        }).then(function(animal) {
            $scope.animal = animal;
        }).catch(function(res) {
            $scope.alerts.push({
                type: 'danger',
                msg: 'Houve um erro ao buscar o animal com _Id ' + $routeParams.idGarrote + '. Verifique o log no navegador.'
            });
            console.log(res);
        });
    }

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

});
