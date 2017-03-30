angular.module('profarm').factory('Cbo', ['$resource', '$http', ($resource, $http) => {
    return {
        getAll: (callback) => {
            $http.get('/api/cbo').then((result) => {
                callback(result.data)
            }).catch((err) => {
                console.error('Houve um erro durante a busca de CBOs na base de dados.');
                console.error(err);
            }).finally(() => {
                console.log('Busca de CBOs realizada.');
            })
        }
    }
}])
