angular.module('profarm').factory('Funcionario', ['$resource', '$http', function($resource, $http) {
    return {
        todos: (propriedade, callback) => {
            $http.get('/api/funcionarios/' + propriedade).then(function(res) {
                callback(res.data);
            }).catch(function(err) {
                console.error('Houve algum problema interno!');
                console.error(err);
            }).finally(function(res) {
                console.log('Busca de todas os funcionarios da propriedade ' + propriedade + ' realizado.');
            });
        },
        salvar: (funcionario, callback) => {
            $http.post('/api/funcionarios/' + funcionario.propriedade, funcionario).then((result) => {
                callback(result);
            }).catch((err) => {
                console.error('Houve algum problema interno!');
                console.error(err);
            }).finally((result) => {
                console.log('Operação para salvar funcionario realizado.');
            });
        }
    };
}]);
