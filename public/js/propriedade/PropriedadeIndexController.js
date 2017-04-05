angular.module('profarm').controller('PropriedadeIndexController', function($routeParams, $scope, $localStorage, $location) {

    $scope.prop_navbar = true;
    $scope.prop_sub_navbar = true;
    $scope.alerts = [];

    if ($localStorage.propriedade) {
        $scope.prop_atual = $localStorage.propriedade;
    }

    $scope.novo = () => {
        $location.path('/funcionarios/novo');
    };

    $scope.closeAlert = (index) => {
        $scope.alerts.splice(index, 1);
    };

});
