angular.module('profarm').service('Indice', ['$resource', '$http', function($resource, $http) {
    return {
        idade: function(nascimento) {
            var result = moment(nascimento || null).fromNow(true);
            if (angular.equals(result, 'Invalid date')) {
                return undefined;
            }
            return result;
        }
    };
}]);
