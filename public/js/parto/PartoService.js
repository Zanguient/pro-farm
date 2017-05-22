angular.module('profarm').factory('Parto', ['$resource', '$http', function($resource, $http) {
    return {
        salvar: (parto, animal, reprodutora, callback) => {
            $http.post('/api/partos', [parto, animal, reprodutora]).then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Processo de criação de parto e animal realizado.');
            });
        }
    };
}]);
