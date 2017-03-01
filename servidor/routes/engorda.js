module.exports = (app) => {
    let controller = app.controllers.engorda

    app.route('/api/engorda').post(controller.salvar)
    app.route('/api/engorda/bezerro/_id/:idAnimal').get(controller.getEngordaByBezerro)
    app.route('/api/engorda/_id/:idEngorda/bezerro/_id/:idBezerro').get(controller.getEngordaById).delete(controller.removeEngordaById)
    app.route('/api/engorda/:idEngorda/acompanhamento').post(controller.salvarAcompanhamento).delete(controller.removeAcompanhamento)
    app.route('/api/engorda/:idEngorda/acompanhamento/:idAcompanhamento/remover').delete(controller.removeAcompanhamento)

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
