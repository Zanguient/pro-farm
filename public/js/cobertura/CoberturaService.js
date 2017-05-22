angular.module('profarm').factory('Cobertura', ['$resource', '$http', function($resource, $http) {
    return {
        doAnimal: (animal, callback) => {
            $http.get('/api/coberturas/animal/id/' + animal).then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Busca de todas as coberturas do animal ' + animal + ' realizado.');
            });
        },
        doLote: (lote, callback) => {
            $http.get('/api/coberturas/lote/id/' + lote).then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Busca de todas as coberturas do lote ' + lote + ' realizado.');
            });
        },
        buscar: (cobertura, callback) => {
            $http.get('/api/coberturas/' + cobertura).then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Busca de coberturas ' + cobertura + ' realizado.');
            });
        },
        salvarDiag: (cobertura, diag, callback) => {
            $http.post('/api/coberturas/' + cobertura, diag).then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Processo de inserção de diagnostico na cobertura ' + cobertura + ' realizado.');
            });
        },
        removerDiag: (cobertura, diag, callback) => {
            $http.delete('/api/coberturas/' + cobertura + '/diagnostico/' + diag).then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Processo de remoção de diagnostico na cobertura ' + cobertura + ' realizado.');
            });
        },
        verificarSePodeRealizarOParto: (diags, callback) => {
            var resultado = false;
            for (aux of diags) {
                if (aux.estado) {
                    resultado = true;
                }
            }
            callback(!resultado);
        }
    };
}]);
