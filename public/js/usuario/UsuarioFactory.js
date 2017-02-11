angular.module('profarm').factory('UsuarioInterceptor', function($window, $q, $localStorage, $injector, $location) {

    var interceptor = {
        'request': function(config) {
            config.headers = config.headers || {};
            if ($localStorage.token) {
                config.headers.Authorization = 'Bearer ' + $localStorage.token;
            }
            return config;
        },
        'responseError': function(response) {
            if (response.status == 401 || response.status == 403) {
                $location.path('403');
            }
            if (response.status == 500) {
                $location.path('500');
            }
            return $q.reject(response);
        }
    };

    return interceptor;

});
