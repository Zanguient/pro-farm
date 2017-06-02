angular.module('profarm').factory('Lote', ['$resource', '$http', function($resource, $http) {
    return {
        todos: (propriedade, callback) => {
            $http.get('/api/lotes/' + propriedade).then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Busca de todas os lotes da propriedade ' + propriedade + ' realizado.');
            });
        },
        buscarUltmo: (propriedade, callback) => {
            $http.get('/api/lotes/' + propriedade + '/ultimo').then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Busca do ultimo lote registrado na propriedade ' + propriedade + ' realizado.');
            });
        },
        buscar: (propriedade, lote, callback) => {
            $http.get('/api/lotes/' + propriedade + '/id/' + lote).then((res) => {
                res.data.data = new Date(res.data.data);
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Busca de determinado da propriedade ' + propriedade + ' realizado.');
            });
        },
        salvarComCobertura: (id, lote, cobertura, animais, callback) => {
            $http.post('/api/lotes/' + id + '/cobertura', [lote, cobertura, animais]).then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Processo de criacao de lote com cobertura na propriedade ' + id + ' realizado.');
            });
        },
        salvarComSanidade: (lote, sanidade, animais, callback) => {
            $http.post('/api/lotes/' + lote.propriedade + '/sanidade', [lote, sanidade, animais]).then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Processo de criacao de lote com sanidade na propriedade ' + lote.propriedade + ' realizado.');
            });
        }
    };
}]);
