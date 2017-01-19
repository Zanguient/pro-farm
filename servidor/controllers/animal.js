module.exports = (app) => {
    let Animal = app.models.animal
    let controller = {}

    controller.todos = (req, res) => {
        let propriedade = req.params.propriedade
        Animal.find({
            propriedade: propriedade
        }).select("codigo morte venda.id").exec().then(
            (animais) => {
                res.json(animais)
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
        Animal.findOne({
            _id: id,
            propriedade: propriedade
        }).exec().then(
            (animal) => {
                res.json(animal)
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
            //atualiza o animal
            Animal.findByIdAndUpdate(_id, req.body).exec().then(
                (animal) => {
                    res.json(animal)
                },
                (erro) => {
                    res.sendStatus(500)
                    console.log(erro)
                }
            )
        } else {
            //cria o animal
            Animal.create(req.body).then(
                (animal) => {
                    res.json(animal)
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
        Animal.remove({
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
