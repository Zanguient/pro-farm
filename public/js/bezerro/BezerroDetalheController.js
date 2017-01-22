angular.module('profarm').controller('BezerroDetalheController', ['$stateParams', '$scope', '$localStorage', 'Animal', function($stateParams, $scope, $localStorage, Animal) {

    $scope.animal_navbar = true;
    $scope.alerts = [];

    console.log($stateParams.idBezerro);

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

}]);
