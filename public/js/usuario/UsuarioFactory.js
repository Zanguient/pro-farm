angular.module('profarm').factory('UsuarioInterceptor', ['$window', '$q', '$localStorage', '$injector', function($window, $q, $localStorage, $injector) {

    var interceptor = {
        'request': function(config) {
            config.headers = config.headers || {};
            if ($localStorage.token) {
                config.headers.Authorization = 'Bearer ' + $localStorage.token;
            }
            return config;
        },
        'responseError': function(response) {
            //injecao de servico, evitando 'Circular dependency found: $state <- UsuarioInterceptor <- $http <- $templateFactory <- $view <- $state'
            var stateService = $injector.get('$state');
            if (response.status == 401 || response.status == 403) {
                stateService.go('403');
            }
            if (response.status == 500) {
                stateService.go('500');
            }
            return $q.reject(response);
        }
    };

    return interceptor;

}]);
