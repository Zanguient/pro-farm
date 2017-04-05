angular.module('profarm').factory('Animal', ['$resource', '$http', function($resource, $http) {
    return {
        todos: function(propriedade, callback) {
            $http.get('/api/animais/propriedade/' + propriedade).then(function(res) {
                callback(res.data);
            }).catch(function(res) {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally(function(res) {
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
        buscar: function(data) {
            return $http.get('/api/animais/propriedade/' + data.propriedade._id + '/_id/' + data.animal._id).then(function(res) {
                if (res.data.nascimento) {
                    res.data.nascimento = new Date(res.data.nascimento);
                }
                return res.data;
            }).catch(function(res) {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally(function(res) {
                console.log('Busca de um determinado animal realizado.');
            });
        },
        salvarBezerro: function(data) {
            return $http.post('/api/animais/propriedade/' + data.propriedade, data).then(
                function(res) {
                    return res.data;
                }).catch(function(res) {
                console.error('Houve algum problema interno!');
                console.error(res);
                return res;
            }).finally(function(res) {
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
        exibirIdadeEmMeses: function(nascimento, callback) {
            var result = moment().diff(moment(nascimento || null), 'months', true);
            if (angular.equals(result, 'Invalid date')) {
                result = null;
            }
            callback(result);
        },
        exibirTipoDoAnimal: function(nascimento, callback) {
            var valor = moment().diff(moment(nascimento || null), 'years', true);
            var resultado = null;
            if (angular.equals(valor, 'Invalid date')) {
                valor = null;
            } else if (valor >= 0 && valor < 1) {
                resultado = 'Bezerros(as)';
            } else if (valor >= 1 && valor < 2) {
                resultado = 'Garrotes e Novilhotas';
            } else if (valor >= 2 && valor < 3) {
                resultado = 'Novilhos(as)';
            } else { // idade >= 3
                resultado = 'Vacas e Bois';
            }
            callback(resultado, valor);
        }
    };
}]);
