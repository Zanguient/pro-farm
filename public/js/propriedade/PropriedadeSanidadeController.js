angular.module('profarm').controller('PropriedadeSanidadeController', function($routeParams, $scope, $localStorage, $window, $route, $location, Sanidade) {

    $scope.prop_navbar = true;
    $scope.prop_sub_navbar = true;
    $scope.alerts = [];
    $scope.imagem_a_exibir = {
        nome: null,
        empresa: null,
        url: null
    };

    if ($localStorage.propriedade) {
        direcionarDestinoDaPagina($routeParams.destino);
    }

    function direcionarDestinoDaPagina(args) {
        switch (args) {
            case 'aplicacoes':
                buscarTodasAsAplicacoesDaPropriedade();
                buscarProdutosParaNovasAplicacoes();
                break;
            case 'produtos':
                buscarTodasOsProdutosDaPropriedade();
                break;
            default:
                $location.path('/sanidade/aplicacoes');
        }
        $scope.opcao = args;
    }

    $scope.novo = () => {
        $scope.produtoSelecionado = {
            propriedade: $localStorage.propriedade._id
        };
        $scope.titleModal = new String('Novo produto');
    };

    $scope.novaAplicacao = () => {
        $scope.titleModal = new String('Nova aplicação');
        $scope.aplicacaoSelecionado = {
            propriedade: $localStorage.propriedade._id
        };
    };

    function buscarProdutosParaNovasAplicacoes() {
        Sanidade.todosDaPropriedadeParaAdicionarNasAplicacoes($localStorage.propriedade._id, (produtos) => {
            $scope.todosOsProdutos = produtos;
        });
    }

    $scope.abrir = (id) => {
        Sanidade.buscarUm(id, $localStorage.propriedade._id, (resultado) => {
            $scope.produtoSelecionado = resultado;
            $scope.titleModal = resultado.nome;
        });
    };

    $scope.abrirAplicacao = (id) => {
        Sanidade.buscarUmaAplicacao(id, $localStorage.propriedade._id, (resultado) => {
            $scope.aplicacaoSelecionado = resultado;
            console.log(resultado);
            $scope.titleModal = resultado.nome.nome;
        });
    };

    $scope.salvar = () => {
        $('.modal-backdrop').remove();
        Sanidade.salvar($scope.produtoSelecionado, (resultado) => {
            $route.reload();
        });
    };

    $scope.salvarAplicacao = () => {
        $('.modal-backdrop').remove();
        Sanidade.salvarAplicacao($scope.aplicacaoSelecionado, (resultado) => {
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
        $location.path('sanidade/' + destino)
    };

    function buscarTodasOsProdutosDaPropriedade() {
        Sanidade.todosDaPropriedade($localStorage.propriedade._id, (resultado) => {
            $scope.produtos = resultado;
        });
    }

    function buscarTodasAsAplicacoesDaPropriedade() {
        Sanidade.todosOsTiposDeAplicacoesDaPropriedade($localStorage.propriedade._id, (resultado) => {
            $scope.aplicacoes = resultado;
        });

        Sanidade.todasAsDoencas((doencas) => {
            $scope.doencas = doencas;
        });
    }
});
