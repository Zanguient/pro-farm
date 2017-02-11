angular.module('profarm').controller('PropriedadeNovoController', function($scope, $localStorage, $window, Propriedade) {

    $scope.proprietario = $localStorage.usuario.nome;
    $scope.propriedade = {};
    $scope.block = false;
    $scope.alerts = [];

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.salvar = function() {
        $scope.alerts = [];
        $scope.block = true;
        $scope.propriedade.usuario = $localStorage.usuario._id;
        Propriedade.salvar($scope.propriedade).then(function(propriedade) {
            $location.path('/propriedade');
        }).catch(function(error) {
            $scope.block = false;
            $scope.alerts.push({
                type: 'danger',
                msg: 'Erro interno de servidor. Por favor, repita a operação mais tarde.'
            });
            console.error(error);
        }).finally(function() {
            console.log('Criação/Edição de propriedades concluído.');
        });
    };

    $scope.cancelar = function() {
        $window.history.back();
    };
});
