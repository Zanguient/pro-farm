module.exports = (app) => {
    let Reprodutor = app.models.reprodutor
    let controller = {}

    controller.todos = (req, res) => {
        let propriedade = req.params.propriedade
        Reprodutor.find({
            propriedade: propriedade
        }).select("codigo morte venda.id").exec().then(
            (reprodutores) => {
                res.json(reprodutores)
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
        Reprodutor.findOne({
            _id: id,
            propriedade: propriedade
        }).exec().then(
            (reprodutor) => {
                res.json(reprodutor)
            },
            (erro) => {
                res.sendStatus(404)
                console.log(erro)
            }
        )
    }

    controller.salvar = (req, res) => {
        let _id = req.body._id
        if (_id) {
            //atualiza o reprodutor
            Reprodutor.findByIdAndUpdate(_id, req.body).exec().then(
                (reprodutor) => {
                    res.json(reprodutor)
                },
                (erro) => {
                    res.sendStatus(500)
                    console.log(erro)
                }
            )
        } else {
            //cria o reprodutor
            Reprodutor.create(req.body).then(
                (reprodutor) => {
                    res.json(reprodutor)
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
        Reprodutor.remove({
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
