module.exports = (app) => {
    let controller = app.controllers.propriedade

    app.route('/api/propriedade/salvar').post(controller.salvar)
    app.route('/propriedades/:id').get(controller.buscar)
    app.route('/api/propriedade/token/:token').get(ensureAuthorized, controller.buscaPorToken)

    function ensureAuthorized(req, res, next) {
      var bearerToken;
          var bearerHeader = req.headers['authorization'];
          console.log(bearerHeader);
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
}
