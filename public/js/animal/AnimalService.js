angular.module('profarm').factory('Animal', ['$resource', '$http', function($resource, $http) {
    return {
        todos: (propriedade, callback) => {
            $http.get('/api/animais/propriedade/' + propriedade).then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Busca de todos os animais realizado.');
            });
        },
        paraCobertura: (propriedade, callback) => {
            $http.get('/api/animais/propriedade/' + propriedade + '/femeas/cobertura').then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Busca de todos os animais realizado.');
            });
        },
        getBezerros: function(propriedade) {
            return $http.get('/api/animais/propriedade/' + propriedade._id + '/bezerros').then(function(res) {
                return res.data;
            }).catch(function(res) {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally(function(res) {
                console.log('Busca de animais entre 0 e 12 meses realizado.');
            });
        },
        getGarrotes: function(propriedade) {
            return $http.get('/api/animais/propriedade/' + propriedade._id + '/garrotes').then(function(res) {
                return res.data;
            }).catch(function(res) {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally(function(res) {
                console.log('Busca de animais entre 12 e 24 meses realizado.');
            });
        },
        getNovilhos: function(propriedade) {
            return $http.get('/api/animais/propriedade/' + propriedade._id + '/novilhos').then(function(res) {
                return res.data;
            }).catch(function(res) {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally(function(res) {
                console.log('Busca de animais entre 24 e 36 meses realizado.');
            });
        },
        getBois: function(propriedade) {
            return $http.get('/api/animais/propriedade/' + propriedade._id + '/bois').then(function(res) {
                return res.data;
            }).catch(function(res) {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally(function(res) {
                console.log('Busca de animais acima de 36 meses realizado.');
            });
        },
        getTouros: (propriedade, callback) => {
            $http.get('/api/animais/propriedade/' + propriedade._id + '/touros').then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Busca de touros realizado.');
            });
        },
        buscar: (data, callback) => {
            $http.get('/api/animais/propriedade/' + data.propriedade._id + '/_id/' + data.animal._id).then((res) => {
                if (res.data.nascimento) {
                    res.data.nascimento = new Date(res.data.nascimento);
                }
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Busca de um determinado animal realizado.');
            });
        },
        buscaUmPeloParto: (parto, callback) => {
            $http.get('/api/animais/parto/' + parto).then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Busca de um determinado animal pelo parto realizado.');
            });
        },
        buscarFilhos: (animal, callback) => {
            $http.get('/api/animais/filhos/' + animal).then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Busca de filhos do animal foi realizado.');
            });
        },
        salvarBezerro: (data, callback) => {
            $http.post('/api/animais/propriedade/' + data.propriedade, data).then(
                (res) => {
                    callback(res.data);
                }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Criação/Atualização de animal realizado.');
            });
        },
        verificarCodigo: function(data, callback) {
            $http.get('/api/animais/propriedade/' + data.propriedade + '/animais/codigo/' + data.codigo).then(
                function(res) {
                    (res.data.length > 0) ? callback(true): callback(false);
                }).catch(function(res) {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally(function(res) {
                console.log('Verificação de existência de codigo na base de dados realizado.');
            });
        },
        exibirTipoDoAnimal: (nascimento, callback) => {
            var anos = moment().diff(moment(nascimento || null), 'years', true);
            var meses = moment().diff(moment(nascimento || null), 'months', true);
            var resultado = null;
            if (angular.equals(meses, 'Invalid date')) {
              meses = null;
            }
            if (angular.equals(anos, 'Invalid date')) {
                anos = null;
            } else if (anos >= 0 && anos < 1) {
                resultado = 'Bezerros(as)';
            } else if (anos >= 1 && anos < 2) {
                resultado = 'Garrotes e Novilhotas';
            } else if (anos >= 2 && anos < 3) {
                resultado = 'Novilhos(as)';
            } else { // idade >= 3
                resultado = 'Vacas e Bois';
            }
            callback(resultado, anos, meses);
        },
        converterData: (data, callback) => {
          callback(moment(data).format('DD/MM/YY'))
        }
    };
}]);
