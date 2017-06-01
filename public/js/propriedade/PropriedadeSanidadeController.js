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
    buscarTodasAsAplicacoesDaPropriedade();
    buscarProdutosParaNovasAplicacoes();
  }

  function buscarProdutosParaNovasAplicacoes() {
    Sanidade.todosDaPropriedadeParaAdicionarNasAplicacoes($localStorage.propriedade._id, (produtos) => {
      $scope.todosOsProdutos = produtos;
    });
  }

  $scope.novo = () => {
    $scope.produtoSelecionado = {
      propriedade: $localStorage.propriedade._id
    };
    $scope.titleModal = new String('Novo produto');
  };

  $scope.novaAplicacao = () => {
    $scope.aplicacaoSelecionado = {
      propriedade: $localStorage.propriedade._id
    };
    $scope.titleModal = new String('Nova aplicação');
  };

  $scope.abrir = (id) => {
    Sanidade.buscarUm(id, $localStorage.propriedade._id, (resultado) => {
      $scope.produtoSelecionado = resultado;
      $scope.titleModal = resultado.nome;
    });
  };

  $scope.abrirAplicacao = (id) => {
    Sanidade.buscarUmaAplicacao(id, $localStorage.propriedade._id, (resultado) => {
      $scope.aplicacaoSelecionado = resultado;
      $scope.titleModal = resultado.nome;
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
    switch (destino) {
      case 'aplicacoes':
        buscarTodasAsAplicacoesDaPropriedade();
        break;
      case 'produtos':
        buscarTodasOsProdutosDaPropriedade();
        break;
      default:
      $location.path('/propriedade/index');
    }
    $scope.opcao = destino;
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
  }
});
