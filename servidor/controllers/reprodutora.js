module.exports = (app) => {
    let Reprodutora = app.models.reprodutora
    let controller = {}

    controller.todas = (req, res) => {
        let propriedade = req.params.propriedade
        Reprodutora.find({
            propriedade: propriedade
        }).select("codigo venda.id morte").exec().then(
            (vacas) => {
                res.json(vacas)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    controller.buscaUma = (req, res) => {
        let id = req.params.id
        let propriedade = req.params.propriedade
        Reprodutora.findOne({
            _id: id,
            propriedade: propriedade
        }).exec().then(
            (vaca) => {
                res.json(vaca)
            },
            (erro) => {
                res.sendStatus(404)
                console.log(erro)
            }
        )
    }

    controller.salvar = (req, res) => {
        let _id = req.body._id
        console.log(_id);
        if (_id) {
            //atualiza a vaca
            Reprodutora.findByIdAndUpdate(_id, req.body).exec().then(
                (vaca) => {
                    res.json(vaca)
                },
                (erro) => {
                    res.sendStatus(500)
                    console.log(erro)
                }
            )
        } else {
            //cria a vaca
            Reprodutora.create(req.body).then(
                (vaca) => {
                    res.json(vaca)
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
        Reprodutora.remove({
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
