module.exports = function(app) {
  var controller = app.controllers.recria;

  app.route('/api/recria').post(controller.salvar)
  app.route('/api/recria/bezerro/_id/:idBezerro').get(controller.getRecria)

  // function ensureAuthorized(req, res, next) {
  //   var bearerToken;
  //       var bearerHeader = req.headers['authorization'];
  //       if (typeof bearerHeader !== 'undefined') {
  //           var bearer = bearerHeader.split(" ");
  //           bearerToken = bearer[1];
  //           req.token = bearerToken;
  //           next();
  //       } else {
  //           res.sendStatus(403);
  //           console.log('fudeu');
  //       }
  //   }
};
