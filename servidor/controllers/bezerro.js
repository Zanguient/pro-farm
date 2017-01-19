module.exports = (app) => {
    let Bezerro = app.models.bezerro
    let controller = {}

    controller.todos = (req, res) => {
        let propriedade = req.params.propriedade
        Bezerro.find({
            propriedade: propriedade
        }).select("codigo morte venda.id").exec().then(
            (bezerros) => {
                res.json(bezerros)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    controller.buscaUm = (req, res) => {
        let id = req.params.id
        let propriedade = req.params.propriedade
        Bezerro.findOne({
            _id: id,
            propriedade: propriedade
        }).exec().then(
            (bezerro) => {
                res.json(bezerro)
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
            //atualiza o bezerro
            Bezerro.findByIdAndUpdate(_id, req.body).exec().then(
                (bezerro) => {
                    res.json(bezerro)
                },
                (erro) => {
                    res.sendStatus(500)
                    console.log(erro)
                }
            )
        } else {
            //cria o bezerro
            Bezerro.create(req.body).then(
                (bezerro) => {
                    res.json(bezerro)
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
        Bezerro.remove({
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
