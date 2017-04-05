angular.module('profarm').factory('Semen', ['$resource', '$http', ($resource, $http) => {
    return {
        todosDoUsuario: (usuario, callback) => {
            $http.get('/api/semen/' + usuario).then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Busca de semens via id do usuario realizado.');
            });
        },
        salvar: (usuario, semen, callback) => {
            $http.post('/api/semen/' + usuario, semen).then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Cadastro de semen via id do usuario realizado.');
            });
        },
        excluir: (usuario, semen, callback) => {
            $http.delete('/api/semen/' + usuario + '/id/' + semen).then((res) => {
                callback(res.data);
            }).catch((res) => {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally((res) => {
                console.log('Cadastro de semen via id do usuario realizado.');
            });
        }
    };
}]);
