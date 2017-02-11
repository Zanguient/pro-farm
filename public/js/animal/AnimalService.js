angular.module('profarm').factory('Animal', ['$resource', '$http', function($resource, $http) {
    return {
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
        verificarCodigo: function(data) {
            return $http.get('/api/animais/propriedade/' + data.propriedade + '/animais/codigo/' + data.codigo).then(
                function(res) {
                    if (res.data.length > 0) {
                        return true;
                    }
                    return false;
                }).catch(function(res) {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally(function(res) {
                console.log('Verificação de existência de codigo na base de dados realizado.');
            });
        }
    };
}]);
