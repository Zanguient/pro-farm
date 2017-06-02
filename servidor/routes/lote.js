module.exports = (app) => {
  var controller = app.controllers.lote;

  app.route('/api/lotes/:propriedade').get(controller.all).post(controller.persist)
  app.route('/api/lotes/:propriedade/cobertura').post(controller.persistWithCobertura)
  app.route('/api/lotes/:propriedade/sanidade').post(controller.persistWithSanidade)
  app.route('/api/lotes/:propriedade/ultimo').get(controller.ultimo)
  app.route('/api/lotes/:propriedade/id/:id').get(controller.getOne).delete(controller.remove)

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
