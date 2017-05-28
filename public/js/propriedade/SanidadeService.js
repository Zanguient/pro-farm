angular.module('profarm').factory('Sanidade', ['$resource', '$http', function($resource, $http) {
    return {
        todosDaPropriedade: (propriedade, callback) => {
            $http.get('/api/produtos/' + propriedade).then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Busca de todas os produtos da propriedade ' + propriedade + ' realizado.');
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
        salvar: (produto, callback) => {
            $http.post('/api/produtos/' + produto.propriedade, produto).then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Persistencia de um produto da propriedade ' + produto.propriedade + ' realizado.');
            });
        }
    };
}]);
