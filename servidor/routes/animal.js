module.exports = (app) => {
    let controller = app.controllers.animal

    app.route('/api/animais/propriedade/:propriedade').get(controller.todos).post(controller.salvar)
    app.route('/api/animais/propriedade/:propriedade/_id/:id').get(controller.buscaUm).delete(controller.remover)

    //getValues
    app.route('/api/animais/propriedade/:propriedade/bezerros').get(controller.getBezerros)
    app.route('/api/animais/propriedade/:propriedade/garrotes').get(controller.getGarrotes)
    app.route('/api/animais/propriedade/:propriedade/novilhos').get(controller.getNovilhos)
    app.route('/api/animais/propriedade/:propriedade/bois').get(controller.getBoisVacas)
    app.route('/api/animais/propriedade/:propriedade/femeas/cobertura').get(controller.getAnimaisParaCobertura)

    // getCodigosDosAnimais
    app.route('/api/animais/propriedade/:propriedade/animais/codigo/:codigo').get(controller.getTodosOsCodigosPorPropriedade)

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
