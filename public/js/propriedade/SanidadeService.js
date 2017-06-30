angular.module('profarm').factory('Sanidade', ['$resource', '$http', function($resource, $http) {
    return {
        todosDaPropriedade: (propriedade, callback) => {
            $http.get('/api/produtos/' + propriedade).then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Busca de todos os produtos da propriedade ' + propriedade + ' realizado.');
            });
        },
        todosDaPropriedadeParaAdicionarNasAplicacoes: (propriedade, callback) => {
            $http.get('/api/produtos/aplicacoes/' + propriedade).then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Busca de todos os produtos de forma simplificada da propriedade ' + propriedade + ' realizado.');
            });
        },
        todosOsTiposDeAplicacoesDaPropriedade: (propriedade, callback) => {
            $http.get('/api/aplicacoes/' + propriedade).then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Busca de todas os tipos de aplicacoes da propriedade ' + propriedade + ' realizado.');
            });
        },
        doLote: (lote, callback) => {
            $http.get('/api/sanidades/lote/id/' + lote).then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Busca de todas as sanidades do lote ' + lote + ' realizado.');
            });
        },
        buscarUm: (produto, propriedade, callback) => {
            $http.get('/api/produtos/' + propriedade + '/id/' + produto).then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Busca de um produto da propriedade ' + propriedade + ' realizado.');
            });
        },
        buscarUmaSanidade: (animal, propriedade, callback) => {
            $http.get('/api/sanidades/' + propriedade + '/id/' + animal).then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Busca de um registro de sanidade da propriedade ' + propriedade + ' realizado.');
            });
        },
        porAnimal: (animal, propriedade, callback) => {
            $http.get('/api/sanidades/' + propriedade + '/animal/' + animal).then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Busca de aplicacoes de determinado animal da propriedade ' + propriedade + ' realizado.');
            });
        },
        buscarUmaAplicacao: (aplicacao, propriedade, callback) => {
            $http.get('/api/aplicacoes/' + propriedade + '/id/' + aplicacao).then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Busca de uma aplicacao da propriedade ' + propriedade + ' realizado.');
            });
        },
        salvar: (produto, callback) => {
            $http.post('/api/produtos/' + produto.propriedade, produto).then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Persistencia de um produto da propriedade ' + produto.propriedade + ' realizado.');
            });
        },
        salvarAplicacao: (aplicacao, callback) => {
            $http.post('/api/aplicacoes/' + aplicacao.propriedade, aplicacao).then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Persistencia de uma aplicacao da propriedade ' + aplicacao.propriedade + ' realizado.');
            });
        },
        produtosParaSanidade: (propriedade, callback) => {
          $http.get('/api/produtos/aplicacoes/' + propriedade).then((res) => {
              callback(res.data);
          }).catch((res) => {
              console.error('Houve algum problema interno!');
              console.error(res);
          }).finally((res) => {
              console.log('Busca de produtos para sanidade da propriedade ' + propriedade + ' realizado.');
          });
        },
        todasAsDoencas: (callback) => {
          $http.get('/api/doencas').then((res) => {
              callback(res.data);
          }).catch((res) => {
              console.error('Houve algum problema interno!');
              console.error(res);
          }).finally((res) => {
              console.log('Busca de doencas para sanidade realizado.');
          });
        }
    };
}]);
