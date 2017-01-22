angular.module('profarm').factory('Animal', ['$resource', '$http', function($resource, $http) {
    return {
        getBezerros: function(propriedade) {
            return $http.get('/api/animais/propriedade/' + propriedade._id + '/bezerros').then(function(res) {
                return res.data;
            }).catch(function(res) {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally(function(res) {
                console.log('Busca de animais entre 0 e 12 meses realizado.');
            });
        },
        getGarrotes: function(propriedade) {
            return $http.get('/api/animais/propriedade/' + propriedade._id + '/garrotes').then(function(res) {
                return res.data;
            }).catch(function(res) {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally(function(res) {
                console.log('Busca de animais entre 12 e 24 meses realizado.');
            });
        },
        getNovilhos: function(propriedade) {
            return $http.get('/api/animais/propriedade/' + propriedade._id + '/novilhos').then(function(res) {
                return res.data;
            }).catch(function(res) {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally(function(res) {
                console.log('Busca de animais entre 24 e 36 meses realizado.');
            });
        },
        getBois: function(propriedade) {
            return $http.get('/api/animais/propriedade/' + propriedade._id + '/bois').then(function(res) {
                return res.data;
            }).catch(function(res) {
                console.error('Houve algum problema interno!');
                console.error(res);
            }).finally(function(res) {
                console.log('Busca de animais acima de 36 meses realizado.');
            });
        }
    };
}]);
