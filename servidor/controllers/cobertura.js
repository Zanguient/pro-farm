module.exports = (app) => {
    let Cobertura = app.models.cobertura
    let controller = {}

    controller.todas = (req, res) => {
        let propriedade = req.params.propriedade
        Cobertura.find({
            propriedade: propriedade
        }).select("data data_final tipo").exec().then(
            (coberturas) => {
                res.json(coberturas)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    controller.porReprodutora = (req, res) => {
        let reprodutora = req.params.reprodutora
        Cobertura.find({
            reprodutora: reprodutora
        }).select("data data_final tipo").exec().then(
            (coberturas) => {
                res.json(coberturas)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    controller.buscaUma = (req, res) => {
        let id = req.params.id
        Cobertura.findOne({
            _id: id
        }).populate('reprodutora').exec().then(
            (cobertura) => {
                res.json(cobertura)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    controller.salvar = (req, res) => {
        let _id = req.body._id
        if (_id) {
            //atualiza a cobertura
            Cobertura.findByIdAndUpdate(_id, req.body).exec().then(
                (cobertura) => {
                    res.json(cobertura)
                },
                (erro) => {
                    res.sendStatus(500)
                    console.log(erro)
                }
            )
        } else {
            //cria a cobertura
            Cobertura.create(req.body).then(
                (cobertura) => {
                    res.json(cobertura)
                },
                (erro) => {
                    res.sendStatus(500)
                    console.log(erro)
                }
            )
        }
    }

    controller.remover = (req, res) => {
        let _id = req.params.id
        Cobertura.remove({
            "_id": _id
        }).exec().then(
            () => {
                res.status(200)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    return controller
}
