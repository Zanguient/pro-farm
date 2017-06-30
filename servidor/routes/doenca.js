module.exports = (app) => {
  var controller = app.controllers.doenca;

  app.route('/api/doencas').get(controller.getAll)
  app.route('/api/doencas/cadastrar').post(controller.setAll)

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
}
