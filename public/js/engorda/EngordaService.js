angular.module('profarm').factory('Engorda', ['$resource', '$http', function($resource, $http) {
    return {
        salvar: function(data) {
            return $http.post('/api/engorda', data).then(function(res) {
                return res.data;
            }).catch(function(res) {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally(function(res) {
                console.log('Processo de persistencia de engorda realizado.');
            });
        },
        buscarPorBezerro: function(data) {
            return $http.get('/api/engorda/bezerro/_id/' + data._id).then(function(res) {
                if (res.data !== null) {
                    res.data.data = new Date(res.data.data);
                }
                return res.data;
            }).catch(function(res) {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally(function(res) {
                console.log('Processo de busca de engorda por _id do bezerro realizado.');
            });
        },
        buscarPorID: function(data, callback) {
            $http.get('/api/engorda/_id/' + data._id + '/bezerro/_id/' + data.bezerro).then(function(res) {
                if (res.data !== null) {
                    res.data.data = new Date(res.data.data);
                }
                callback(res.data);
            }).catch(function(res) {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally(function(res) {
                console.log('Processo de busca de engorda por _id realizado.');
            });
        },
        salvarAcompanhamento: function(data) {
            return $http.post('/api/engorda/' + data._id + '/acompanhamento', data.data).then(function(res) {
                return res.data;
            }).catch(function(res) {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally(function(res) {
                console.log('Processo criação/edição de acompanhamento por _id realizado.');
            });
        },
        excluirAcompanhamento: function(data) {
            return $http.delete('/api/engorda/' + data._id + '/acompanhamento/' + data.acompanhamento + '/remover').then(function(res) {
                return res.data;
            }).catch(function(res) {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally(function(res) {
                console.log('Processo de exclusão de engorda por _id realizado.');
            });
        },
        excluir: function(data, callback) {
            $http.delete('/api/engorda/_id/' + data.idEngorda + '/bezerro/_id/' + data.idAnimal).then(function(res) {
                callback(res.data);
            }).catch(function(res) {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally(function(res) {
                console.log('Processo de exclusão de engorda por _id realizado.');
            });
        },
        ganhoDePeso: function(entrada, data, callback) {
            var soma = 0;
            var dias = moment(data[data.length - 1].data).diff(moment(data[0].data), 'days');
            for (aux of data) {
                soma += (aux.peso - entrada);
            }
            console.log(dias + ' dias de acompanhamento registrado');
            callback(soma / dias);
        }
    };
}]);
