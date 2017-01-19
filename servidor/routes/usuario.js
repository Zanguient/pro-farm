module.exports = function(app) {
  var controller = app.controllers.usuario;

  app.route('/api/usuario/autenticar').post(controller.autenticar);
  app.route('/api/usuario/cadastrar').post(controller.cadastrar);

  app.route('/api/usuario/me').get(ensureAuthorized, controller.eu);

  function ensureAuthorized(req, res, next) {
    var bearerToken;
        var bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader !== 'undefined') {
            var bearer = bearerHeader.split(" ");
            bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        } else {
            res.sendStatus(403);
            console.log('fudeu');
        }
    }
};
