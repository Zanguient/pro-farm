angular.module('profarm').controller('LoteIndexController', function($routeParams, $window, $scope, $location, $localStorage, Animal, Lote) {

    $scope.lote_navbar = true;
    $scope.alerts = [];
    $scope.limit = 20;
    $scope.busca = {
        _id: ""
    };

    Lote.todos($localStorage.propriedade._id, (lotes) => {
        $scope.lotes = lotes;
    });

    Lote.buscarUltmo($localStorage.propriedade._id, (ultimo) => {
        $scope.ultimo = ultimo;
    });

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.novo = () => {
        $location.path('/lotes/novo');
    };

    $scope.abrirUltimoLoteRegistrado = () => {
        $location.path('/lotes/' + $scope.ultimo._id);
    };

    $scope.mais = () => {
        $scope.limit += 30;
    };
});
