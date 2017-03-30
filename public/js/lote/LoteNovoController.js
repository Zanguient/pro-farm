angular.module('profarm').controller('LoteNovoController', function($routeParams, $scope, $localStorage, Animal, Lote) {

    $scope.lote_navbar = true;
    $scope.alerts = [];

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.salvar = () => {
      
    }

});
