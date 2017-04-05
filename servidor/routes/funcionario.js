module.exports = (app) => {
    var controller = app.controllers.funcionario;

    app.route('/api/funcionarios/:propriedade').get(controller.getAll).post(controller.salvar)
    app.route('/api/funcionarios/:propriedade/juntos').get(controller.getAllTogether)
    app.route('/api/funcionarios/:propriedade/id/:id').get(controller.getOne)

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
