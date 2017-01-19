angular.module('profarm').controller('PropriedadeSelecionarController', ['$scope', '$localStorage', '$state', 'Propriedade', function($scope, $localStorage, $state, Propriedade) {

    Propriedade.tokenDoUsuario($localStorage.token).then(function(prop) {
        if (prop.length) {
            $scope.titulo = prop.length + ' propriedade(s) encontrata(s)'
        } else {
            $scope.titulo = 'Nenhuma propriedade foi encontrata'
        }
        $scope.propriedades = prop;
    }).catch(function(err) {
        console.error(err);
    }).finally(function() {
        console.log('Atribuição de todas as propriedades no escopo.');
    });

    $scope.novo = function() {
        $state.go('propriedade-novo');
    };

}]);
