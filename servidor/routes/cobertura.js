module.exports = (app) => {
  let controller = app.controllers.cobertura

  app.route('/coberturas').get(controller.todas).post(controller.salvar)
  app.route('/coberturas/:id').get(controller.buscaUma).delete(controller.remover)
  app.route('/coberturas/reprodutora/:reprodutora').get(controller.porReprodutora)

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
