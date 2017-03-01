angular.module('profarm').controller('PropriedadeSelecionarController', function($scope, $localStorage, $location, Propriedade) {

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
        $location.path('/propriedade/novo');
    };

    $scope.abrir = function(propriedade) {
        $localStorage.propriedade = {
            nome: propriedade.nome,
            _id: propriedade._id,
            latitude: propriedade.latitude,
            longitude: propriedade.longitude
        };
        $location.path('inicio');
    };

});
