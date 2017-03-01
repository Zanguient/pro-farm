module.exports = function(app) {
  var controller = app.controllers.recria;

  app.route('/api/recria').post(controller.salvar)
  app.route('/api/recria/animal/_id/:idAnimal').get(controller.getRecriaByAnimal)
  app.route('/api/recria/_id/:idRecria/animal/_id/:idAnimal').get(controller.getRecriaById).delete(controller.removeRecriaById)

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
