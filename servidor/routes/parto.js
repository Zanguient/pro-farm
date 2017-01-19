module.exports = (app) => {
  let controller = app.controllers.parto

  app.route('/partos').post(controller.salvar)
  app.route('/partos/:id').get(controller.buscaUm).delete(controller.remover)
  app.route('/partos/cobertura/:id').get(controller.buscaUmPelaCobertura)

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
