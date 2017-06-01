module.exports = (app) => {
  var controller = app.controllers.sanidade;

  app.route('/api/sanidades/:propriedade').get(controller.all).post(controller.persist)
  app.route('/api/sanidades/:propriedade/id/:id').get(controller.getOne).delete(controller.remove)

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
