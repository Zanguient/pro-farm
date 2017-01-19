module.exports = (app) => {
  let controller = app.controllers.animal

  app.route('/api/animais/propriedade/:propriedade').get(controller.todos).post(controller.salvar)
  app.route('/api/animais/propriedade/:propriedade/_id/:id').get(controller.buscaUm).delete(controller.remover)

  // function ensureAuthorized(req, res, next) {
  //   var bearerToken
  //       var bearerHeader = req.headers['authorization']
  //       if (typeof bearerHeader !== 'undefined') {
  //           var bearer = bearerHeader.split(" ")
  //           bearerToken = bearer[1]
  //           req.token = bearerToken
  //           next()
  //       } else {
  //           res.sendStatus(403)
  //           console.log('fudeu')
  //       }
  //   }
}
