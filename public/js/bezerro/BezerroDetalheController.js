angular.module('profarm').controller('BezerroDetalheController', function($routeParams, $scope, $localStorage, $route, $location, Animal, Recria, Indice) {

    $scope.animal_navbar = true;
    $scope.alerts = [];
    $scope.edicao = false;
    $scope.buttonBlock = false;

    if ($routeParams.idBezerro) {
        Animal.buscar({
            propriedade: {
                _id: $localStorage.propriedade._id
            },
            animal: {
                _id: $routeParams.idBezerro
            }
        }).then(function(animal) {
            $scope.bezerro = animal;
            $scope.extra = {
                codigo: animal.codigo.toString(),
                idade: Indice.idade(animal.nascimento)
            };
        }).catch(function(res) {
            $scope.alerts.push({
                type: 'danger',
                msg: 'Houve um erro ao buscar o animal com _Id ' + $routeParams.idBezerro + '. Verifique o log no navegador.'
            });
            console.log(res);
        });

        Recria.buscar({
            _id: $routeParams.idBezerro
        }).then(function(recria) {
            console.log(recria);
        }).catch(function(err) {
            console.log(err);
        });
    }

    $scope.closeAlert = function(index) {
        $scope.alerts.splice(index, 1);
    };

    $scope.habilitarEdicao = function() {
        $scope.edicao = true;
    };

    $scope.salvar = function() {
        if ($("#codigo_reprodutora_form").hasClass('has-warning')) {
            console.log('nao rola fion');
        } else {
            $scope.edicao = false;
            Animal.salvarBezerro($scope.bezerro).then(
                function(res) {
                    $route.reload();
                }).catch(function(err) {
                $scope.alerts.push({
                    type: 'danger',
                    msg: 'Houve um erro ao salvar o animal ' + $scope.extra.codigo + '. Verifique o log no navegador.'
                });
                console.log(res);
            });
        }
    };

    $scope.verificarCodigoDoAnimal = function() {
        if (!($scope.bezerro.codigo == $scope.extra.codigo)) {
            Animal.verificarCodigo({
                propriedade: $localStorage.propriedade._id,
                codigo: $scope.bezerro.codigo
            }).then(function(res) {
                if (res) {
                    $("#codigo_reprodutora_form").addClass('has-warning');
                    $scope.buttonBlock = true;
                } else {
                    $("#codigo_reprodutora_form").removeClass('has-warning');
                    $scope.buttonBlock = false;
                }
            }).catch(function(res) {
                $scope.alerts.push({
                    type: 'warning',
                    msg: 'Houve algum erro durante a consulta de codigo na base de dados. Verifique o log no navegador.'
                });
                console.error(res);
            });
        }
    };

    $scope.cancelar = function() {
        $route.reload();
    };

    $scope.informarDesmama = function() {
        $location.path('/animais/' + $scope.bezerro._id + '/recria/novo');
    };

});
