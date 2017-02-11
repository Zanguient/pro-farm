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
        buscar: function(data) {
            return $http.get('/api/recria/bezerro/_id/' + data._id).then(function(res) {
                return res.data;
            }).catch(function(res) {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally(function(res) {
                console.log('Processo de busca de recria realizado.');
            });
        }
    };
}]);
