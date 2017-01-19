angular.module('profarm').factory('Propriedade', ['$resource', '$http', function($resource, $http) {
    return {
        tokenDoUsuario: function(token) {
            return $http.get('/api/propriedade/token/' + token).then(function(res) {
                return res.data;
            }).catch(function(res) {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally(function(res) {
                console.log('Busca de propriedades via token realizado.');
            });
        },
        salvar: function(data) {
            return $http.post('/api/propriedade/salvar', data).then(function(res) {
                return res.data;
            }).catch(function(res) {
                return res.data;
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally(function(res) {
                console.log('Processo de criação/edição de propriedades realizado.');
            });
        }
    };
}]);
