angular.module('profarm').controller('LoteDetalhesController', function($routeParams, $scope, $location, $route, $localStorage, Cobertura, Lote, Sanidade) {

  $scope.lote_navbar = true;
  $scope.alerts = [];
  $scope.diagsParaEditar = null;
  $scope.diagAtual = null;
  $scope.coberturaAtual = null;
  $scope.limit = 20;
  $scope.edicao = false;
  $scope.primeiro = true;

  if ($routeParams.idLote) {
    Lote.buscar($localStorage.propriedade._id, $routeParams.idLote, (lote) => {
      $scope.lote = lote;

      if (angular.equals(lote.acao, 'cobertura')) {
        Cobertura.doLote($routeParams.idLote, (coberturas) => {
          $scope.coberturas = coberturas;
        });
      }

      if (angular.equals(lote.acao, 'sanidade')) {
        Sanidade.doLote($routeParams.idLote, (sanidades) => {
          $scope.sanidades = sanidades;
        });

        Sanidade.produtosParaSanidade($localStorage.propriedade._id, (result) => {
          $scope.produtos = result;
        });
      }
    });
  }

  $scope.abrirDiagnosticos = (cobertura) => {
    $scope.edicao = true;
    $scope.coberturaAtual = cobertura
    $scope.animalSelecionado = cobertura.animal.codigo;
    $scope.primeiroExame(cobertura.diagnostico[0]);
  };

  $scope.primeiroExame = () => {
    $scope.primeiro = true;
    $scope.segundo = false;
    $scope.terceiro = false;
    colocarDiagnosticoAtual($scope.coberturaAtual.diagnostico[0]);
  }

  $scope.segundoExame = () => {
    $scope.primeiro = false;
    $scope.segundo = true;
    $scope.terceiro = false;
    colocarDiagnosticoAtual($scope.coberturaAtual.diagnostico[1]);
  }

  $scope.terceiroExame = () => {
    $scope.primeiro = false;
    $scope.segundo = false;
    $scope.terceiro = true;
    colocarDiagnosticoAtual($scope.coberturaAtual.diagnostico[2]);
  }

  $scope.closeAlert = (index) => {
    $scope.alerts.splice(index, 1);
  };

  $scope.salvarDiag = (formDeDiagnosticos) => {
    $('.modal-backdrop').remove();
    formDeDiagnosticos.$setPristine();
    Cobertura.salvarDiag($scope.coberturaAtual._id, $scope.diagAtual, (result) => {
      $route.reload();
    });
  };

  $scope.salvarAplicacao = (formDeAplicacoes) => {
    $('.modal-backdrop').remove();
    // formDeAplicacoes.$setPristine();
    $scope.sanidadeAtual.produtosAplicados = $scope.produtosAplicados;
    Sanidade.salvarAplicacao($scope.sanidadeAtual, (result) => {
      $route.reload();
    });
  };

  $scope.removerDiag = () => {
    $('.modal-backdrop').remove();
    Cobertura.removerDiag($scope.coberturaAtual._id, $scope.diagAtual._id, (result) => {
      $route.reload();
    });
  };

  function colocarDiagnosticoAtual(diag) {
    if (diag) {
      diag.data = new Date(diag.data);
      $scope.diagAtual = diag;
    } else {
      $scope.diagAtual = {};
    }
  }

  $scope.abrirCobertura = (id) => {
    $location.path('/cobertura/' + id);
  };

  $scope.cancelar = () => {
    $('.modal-backdrop').remove();
    $route.reload();
  };

  $scope.abrirAplicacoesDoAnimal = (objeto) => {
    $scope.sanidadeAtual = objeto;
    $scope.produtosAplicados = objeto.produtosAplicados;
  }

});
