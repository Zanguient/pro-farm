module.exports = (app) => {
    let controller = app.controllers.cobertura

    app.route('/api/coberturas').get(controller.todas).post(controller.salvar)
    app.route('/api/coberturas/:id').get(controller.buscaUma).post(controller.salvarDiag).delete(controller.remover)
    app.route('/api/coberturas/:id/diagnostico/:diag').delete(controller.removerDiag)
    app.route('/api/coberturas/animal/id/:reprodutora').get(controller.porReprodutora)
    app.route('/api/coberturas/lote/id/:lote').get(controller.porLote)

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
