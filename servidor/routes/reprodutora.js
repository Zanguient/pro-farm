module.exports = (app) => {
    let controller = app.controllers.reprodutora

    app.route('/reprodutoras/:propriedade').get(controller.todas).post(controller.salvar)
    app.route('/reprodutoras/:propriedade/:id').get(controller.buscaUma).delete(controller.remover)

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
