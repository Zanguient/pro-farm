angular.module('profarm').controller('LoteIndexController', function($routeParams, $scope, $localStorage, Animal, Lote) {

    $scope.lote_navbar = true;
    $scope.alerts = [];
    $scope.lotes = [];

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

});
