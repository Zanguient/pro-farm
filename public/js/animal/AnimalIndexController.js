angular.module('profarm').controller('AnimalIndexController', ['$scope', '$localStorage', 'Animal', function($scope, $localStorage, Animal) {

    $scope.animal_navbar = true;
    $scope.alerts = [];

    $scope.abrirBezerros = function() {
        //de 0 a 12 meses
        limparBotoesAtivos();
        $scope.title = {
            header: 'Bezerros(as)',
            route: 'bezerro'
        };
        $('#btnBezerro').addClass('active');
        Animal.getBezerros({
            _id: '5877eaba0a5a42134a47d4c0'
        }).then(function(bezerros) {
            $scope.animais = bezerros;
        }).catch(function(erro) {
            $scope.alerts.push({
                type: 'danger',
                msg: 'Houve um erro ao buscar os animais com idade entre 0 e 12 meses. Verifique o log no navegador.'
            });
            console.log(erro);
        });
    };

    $scope.abrirGarrote = function() {
        //de 12 a 24 meses
        limparBotoesAtivos();
        $scope.title = {
            header: 'Garrotes/Novilhotas',
            route: 'garrote'
        };
        $('#btnGarrote').addClass('active');
        Animal.getGarrotes({
            _id: '5877eaba0a5a42134a47d4c0'
        }).then(function(garrotes) {
            $scope.animais = garrotes;
        }).catch(function(erro) {
            console.log(erro);
            $scope.alerts.push({
                type: 'danger',
                msg: 'Houve um erro ao buscar os animais com idade entre 12 e 24 meses. Verifique o log no navegador.'
            });
        });
    };

    $scope.abrirNovilho = function() {
        //de 24 a 36 meses
        limparBotoesAtivos();
        $scope.title = {
            header: 'Novilhos(as)',
            route: 'novilho'
        };
        $('#btnNovilho').addClass('active');
        Animal.getNovilhos({
            _id: '5877eaba0a5a42134a47d4c0'
        }).then(function(novilhos) {
            $scope.animais = novilhos;
        }).catch(function(erro) {
            console.log(erro);
            $scope.alerts.push({
                type: 'danger',
                msg: 'Houve um erro ao buscar os animais com idade entre 24 e 36 meses. Verifique o log no navegador.'
            });
        });
    };

    $scope.abrirBoi = function() {
        //acima de 36 meses
        limparBotoesAtivos();
        $scope.title = {
            header: 'Vacas/Bois',
            route: 'boi'
        };
        $('#btnBoi').addClass('active');
        Animal.getBois({
            _id: '5877eaba0a5a42134a47d4c0'
        }).then(function(novilhos) {
            $scope.animais = novilhos;
        }).catch(function(erro) {
            console.log(erro);
            $scope.alerts.push({
                type: 'danger',
                msg: 'Houve um erro ao buscar os animais com idade acima de 36 meses. Verifique o log no navegador.'
            });
        });
    };

    function limparBotoesAtivos() {
        $('#btnBezerro, #btnGarrote, #btnNovilho, #btnBoi').removeClass('active');
    }

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

}]);
