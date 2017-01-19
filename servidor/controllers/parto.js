module.exports = function(app) {
    var Parto = app.models.parto;
    var controller = {};

    controller.buscaUm = (req, res) => {
        let id = req.params.id
        Parto.findOne({
            _id: id
        }).exec().then(
            (parto) => {
                res.json(parto)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    controller.buscaUmPelaCobertura = (req, res) => {
        let id = req.params.id
        Parto.findOne({
            cobertura: id
        }).exec().then(
            (parto) => {
                res.json(parto)
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
            //atualiza o parto
            Parto.findByIdAndUpdate(_id, req.body).exec().then(
                (parto) => {
                    res.json(parto)
                },
                (erro) => {
                    res.sendStatus(500)
                    console.log(erro)
                }
            )
        } else {
            //cria o parto
            Parto.create(req.body).then(
                (parto) => {
                    res.json(parto)
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
        Parto.remove({
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

    return controller;
};
