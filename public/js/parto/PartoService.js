angular.module('profarm').factory('Parto', ['$resource', '$http', function($resource, $http) {
    return {
        salvar: (parto, animal, callback) => {
            $http.post('/api/partos', [parto, animal]).then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Processo de criação de parto e animal realizado.');
            });
        },
        buscarPartoPelaCobertura: (cobertura, callback) => {
            $http.get('/api/partos/cobertura/' + cobertura).then((res) => {
                if (res.data) {
                    res.data.data = new Date(res.data.data);
                }
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Processo de busca de parto realizado.');
            });
        }
    };
}]);
