angular.module('profarm').controller('BoiDetalheController', function($routeParams, $scope, $localStorage, Animal) {

    $scope.animal_navbar = true;
    $scope.alerts = [];

    if ($routeParams.idBoi) {
        Animal.buscar({
            propriedade: {
                _id: $localStorage.propriedade._id
            },
            animal: {
                _id: $routeParams.idBoi
            }
        }).then(function(animal) {
            $scope.animal = animal;
        }).catch(function(res) {
            $scope.alerts.push({
                type: 'danger',
                msg: 'Houve um erro ao buscar o animal com _Id ' + $routeParams.idBoi + '. Verifique o log no navegador.'
            });
            console.log(res);
        });
    }

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

});
