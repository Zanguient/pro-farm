"use strict";

angular.module('profarm')
    .factory('Usuario', ['$http', '$localStorage', '$state', function($http, $localStorage, $state) {
        function changeUser(user) {
            angular.extend(currentUser, user);
        }

        function urlBase64Decode(str) {
            var output = str.replace('-', '+').replace('_', '/');
            switch (output.length % 4) {
                case 0:
                    break;
                case 2:
                    output += '==';
                    break;
                case 3:
                    output += '=';
                    break;
                default:
                    throw 'Illegal base64url string!';
            }
            return window.atob(output);
        }

        function getUserFromToken() {
            var token = $localStorage.token;
            var user = {};
            if (typeof token !== 'undefined') {
                var encoded = token.split('.')[1];
                user = JSON.parse(urlBase64Decode(encoded));
            }
            return user;
        }

        var currentUser = getUserFromToken();

        return {
            save: function(data, success, error) {
                $http.post('/api/usuario/cadastrar', data).success(success).error(error)
            },
            signin: function(data) {
                $http.post('/api/usuario/autenticar', data).then(function(res) {
                    if (res.data.type === false) {
                        alert(res.data.data);
                    } else {
                        $localStorage.token = res.data.token;
                        $localStorage.usuario = {
                            _id: res.data.data._id,
                            nome: res.data.data.nome,
                            sobrenome: res.data.data.sobrenome
                        };
                        $state.go('propriedade');
                    }
                }).catch(function(res) {
                    console.error(res);
                }).finally(function() {
                    console.log('Processo de autenticação realizado com sucesso.');
                });
            },
            me: function(success, error) {
                $http.get('/api/usuario/me').success(success).error(error)
            },
            logout: function() {
                changeUser({});
                delete $localStorage.token, $localStorage.usuario, $localStorage.propriedade;
                $state.go('login');
            }
        };
    }]);
