"use strict";

angular.module('profarm')
    .factory('Usuario', ['$http', '$localStorage', '$location', function($http, $localStorage, $location) {
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
                        $location.path('/propriedade');
                    }
                }).catch(function(res) {
                    console.error(res);
                }).finally(function() {
                    console.log('Processo de autenticação realizado com sucesso.');
                });
            },
            me: function(callback) {
                var usuario = {
                    _id: currentUser._doc._id,
                    nome: currentUser._doc.nome,
                    sobrenome: currentUser._doc.sobrenome
                };
                console.log(usuario);
                callback(usuario);
            },
            logout: function() {
                changeUser({});
                delete $localStorage.token, $localStorage.propriedade;
                $location.path('/');
            }
        };
    }]);
