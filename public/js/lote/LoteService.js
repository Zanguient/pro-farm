angular.module('profarm').factory('Lote', ['$resource', '$http', function($resource, $http) {
    return {
        todos: function(propriedade, callback) {
            $http.get('/api/lotes/' + propriedade).then(function(res) {
                callback(res.data);
            }).catch(function(res) {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally(function(res) {
                console.log('Busca de todas os lotes da propriedade ' + propriedade + ' realizado.');
            });
        }
    };
}]);
