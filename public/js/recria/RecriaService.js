angular.module('profarm').factory('Recria', ['$resource', '$http', function($resource, $http) {
    return {
        salvar: function(data) {
            return $http.post('/api/recria', data).then(function(res) {
                return res.data;
            }).catch(function(res) {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally(function(res) {
                console.log('Processo de persistencia de recria realizado.');
            });
        },
        buscarPorBezerro: function(data) {
            return $http.get('/api/recria/animal/_id/' + data._id).then(function(res) {
                if (res.data !== null) {
                    res.data.data = new Date(res.data.data);
                }
                return res.data;
            }).catch(function(res) {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally(function(res) {
                console.log('Processo de busca de recria por _id do bezerro realizado.');
            });
        },
        buscarPorID: function(data) {
            return $http.get('/api/recria/_id/' + data._id + '/animal/_id/' + data.animal).then(function(res) {
                if (res.data !== null) {
                    res.data.data = new Date(res.data.data);
                }
                return res.data;
            }).catch(function(res) {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally(function(res) {
                console.log('Processo de busca de recria por _id realizado.');
            });
        },
        excluir: function(data, callback) {
            $http.delete('/api/recria/_id/' + data._id + '/animal/_id/' + data.animal).then(function(res) {
                callback(res.data);
            }).catch(function(res) {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally(function(res) {
                console.log('Processo de exclusão de recria por _id realizado.');
            });
        },
        calcularGanhoDePesoDiario: function(data, callback) {
            var dias = moment(data.final).diff(data.inicial, 'days');
            callback((data.peso_saida - data.peso_entrada) / dias);
        }
    };
}]);
