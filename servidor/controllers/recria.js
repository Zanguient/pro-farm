module.exports = (app) => {
    let Recria = app.models.recria
    let Animal = app.models.animal
    let controller = {}

    controller.getRecriaByAnimal = (req, res) => {
        let idAnimal = req.params.idAnimal
        Recria.findOne({
            animal: idAnimal
        }).exec().then(
            (recria) => {
                res.json(recria)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    controller.getRecriaById = (req, res) => {
        let idRecria = req.params.idRecria
        let idAnimal = req.params.idAnimal
        Recria.findOne({
            animal: idAnimal,
            _id: idRecria
        }).exec().then(
            (recria) => {
                res.json(recria)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    controller.salvar = (req, res) => {
        let id = req.body._id
        if (id) {
            //atualiza a recria
            Recria.findByIdAndUpdate(id, req.body).exec().then(
                (recria) => {
                    atualizarPesoDeDesmama(req, res, recria, req.body)
                },
                (erro) => {
                    res.sendStatus(500)
                    console.log(erro)
                }
            )
        } else {
            //cria a recria
            Recria.create(req.body).then(
                (recria) => {
                    vincularPesoDeDesmamaNoAnimal(req, res, recria)
                },
                (erro) => {
                    res.sendStatus(500)
                    console.log(erro)
                }
            )
        }
    }

    atualizarPesoDeDesmama = (req, res, antigo, atualizado) => {
        Animal.findOneAndUpdate({
            _id: atualizado.animal,
            'peso.data': antigo.data
        }, {
            'relacao_desmama.peso': atualizado.peso_entrada,
            'peso.$.data': atualizado.data,
            'peso.$.valor': atualizado.peso_entrada
        }).exec().then(
            (animal) => {
                res.json(atualizado)
            },
            (err) => {
                console.log(err)
                res.sendStatus(500)
            }
        )
    }

    vincularPesoDeDesmamaNoAnimal = (req, res, recria) => {
        Animal.findByIdAndUpdate(recria.animal, {
            $set: {
                'relacao_desmama.peso': recria.peso_entrada
            },
            $push: {
                peso: {
                    valor: recria.peso_entrada,
                    data: recria.data
                }
            }
        }).populate('parto').exec().then(
            (bezerro) => {
                if (bezerro.parto) {
                    atualizarVaca(req, res, recria, bezerro) //TODO: implementar quando existir um bezerro criado a partir de um parto
                } else {
                    res.json(recria)
                }
            },
            (err) => {
                console.log(err)
                res.sendStatus(500)
            }
        )
    }

    function atualizarVaca(req, res, recria, bezerro) {
        // let relacao_demama = recria.peso_entrada /
    }

    controller.removeRecriaById = (req, res) => {
        let id = req.params.idRecria
        let idAnimal = req.params.idAnimal
        Recria.findOneAndRemove({
            _id: id,
            animal: idAnimal
        }).exec().then(
            (recria) => {
                removerPesoDeDesmamaDoAnimal(res, idAnimal)
            },
            (err) => {
                res.sendStatus(500)
                console.log(err)
            }
        )
    }

    function removerPesoDeDesmamaDoAnimal(res, _id) {
        Animal.findByIdAndUpdate(_id, {
            $set: {
                peso_desmama: null
            }
        }).then(
            (animal) => {
                res.sendStatus(200)
            },
            (err) => {
                res.sendStatus(500)
                console.log(err)
            }
        )
    }

    return controller
}
