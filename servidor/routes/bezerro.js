module.exports = (app) => {
  let controller = app.controllers.bezerro

  app.route('/bezerros/:propriedade').get(controller.todos).post(controller.salvar)
  app.route('/bezerros/:propriedade/:id').get(controller.buscaUm).delete(controller.remover)

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
