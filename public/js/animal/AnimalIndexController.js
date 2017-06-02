angular.module('profarm').controller('AnimalIndexController', function($scope, $localStorage, Animal) {

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
            _id: $localStorage.propriedade._id
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
            header: 'Garrotes e Novilhotas',
            route: 'garrote'
        };
        $('#btnGarrote').addClass('active');
        Animal.getGarrotes({
            _id: $localStorage.propriedade._id
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
            _id: $localStorage.propriedade._id
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
            header: 'Vacas e Bois',
            route: 'boi'
        };
        $('#btnBoi').addClass('active');
        Animal.getBois({
            _id: $localStorage.propriedade._id
        }).then(function(bois) {
            $scope.animais = bois;
        }).catch(function(erro) {
            console.log(erro);
            $scope.alerts.push({
                type: 'danger',
                msg: 'Houve um erro ao buscar os animais com idade acima de 36 meses. Verifique o log no navegador.'
            });
        });
    };

    $scope.abrirTouros = () => {
        //acima de 36 meses
        limparBotoesAtivos();
        $scope.title = {
            header: 'Touros'
        };
        $('#btnTouro').addClass('active');
        Animal.getTouros({
            _id: $localStorage.propriedade._id
        }, (result) => {
          $scope.animais = result;
        });
    };

    function limparBotoesAtivos() {
        $('#btnBezerro, #btnGarrote, #btnNovilho, #btnBoi, #btnTouro').removeClass('active');
    }

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

});
