angular.module('profarm').controller('PropriedadeSanidadeController', function($routeParams, $scope, $localStorage, $window, $route, $location, Sanidade) {

    $scope.prop_navbar = true;
    $scope.prop_sub_navbar = true;
    $scope.alerts = [];
    $scope.opcao = 'aplicacoes';
    $scope.imagem_a_exibir = {
        nome: null,
        empresa: null,
        url: null
    };

    if ($localStorage.propriedade) {
        Sanidade.todosDaPropriedade($localStorage.propriedade._id, (resultado) => {
            $scope.produtos = resultado;
        });
    }

    $scope.novo = () => {
        $scope.produtoSelecionado = {
            propriedade: $localStorage.propriedade._id
        };
        $scope.titleModal = new String('Novo produto');
    };

    $scope.abrir = (id) => {
        Sanidade.buscarUm(id, $localStorage.propriedade._id, (resultado) => {
            $scope.produtoSelecionado = resultado;
            $scope.titleModal = resultado.nome;
        })
    };

    $scope.salvar = () => {
        $('.modal-backdrop').remove();
        Sanidade.salvar($scope.produtoSelecionado, (resultado) => {
            $route.reload();
        });
    };

    $scope.closeAlert = (index) => {
        $scope.alerts.splice(index, 1);
    };

    $scope.abrirImagem = (objeto) => {
        $scope.imagem_a_exibir = {
            nome: objeto.nome,
            empresa: objeto.empresa,
            url: objeto.foto
        };
    };

    $scope.abrirBula = (url) => {
        $window.open(url, '_blank');
    };

    $scope.irPara = (destino) => {
        $scope.opcao = destino;
    };
});
