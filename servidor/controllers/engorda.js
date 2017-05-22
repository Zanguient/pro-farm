module.exports = function(app) {
    var Engorda = app.models.engorda
    var Recria = app.models.recria
    var Animal = app.models.animal
    var controller = {}

    controller.getEngordaByBezerro = (req, res) => {
        let idAnimal = req.params.idAnimal
        Engorda.findOne({
            animal: idAnimal
        }).select('_id data').exec().then(
            (engorda) => {
                res.json(engorda)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    controller.getEngordaById = (req, res) => {
        let idEngorda = req.params.idEngorda
        Engorda.findOne({
            _id: idEngorda
        }).exec().then(
            (engorda) => {
                res.json(engorda)
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
            //atualiza a engorda
            Engorda.findByIdAndUpdate(id, req.body).exec().then(
                (engorda) => {
                    atualizarRecria(req.body.animal, req.body.peso_entrada, req.body, res)
                },
                (erro) => {
                    res.sendStatus(500)
                    console.log(erro)
                }
            )
        } else {
            //cria a engorda
            Engorda.create(req.body).then(
                (engorda) => {
                    atualizarRecria(req.body.animal, req.body.peso_entrada, engorda, res)
                },
                (erro) => {
                    res.sendStatus(500)
                    console.log(erro)
                }
            )
        }
    }

    function atualizarRecria(animal, peso, engorda, res) {
        Recria.findOneAndUpdate({
            animal: animal
        }, {
            $set: {
                peso_saida: peso,
                data_saida: engorda.data
            }
        }, (recria) => {
            atualizarPesoDoAnimal(animal, engorda, res)
        }, (err) => {
            res.sendStatus(500).json(err)
            console.log(erro)
        })
    }

    function atualizarPesoDoAnimal(animal, engorda, res) {
        Animal.findOne({
            _id: animal
        }).exec().then(
            (animal) => {
                animal.peso.antepenultimo = animal.peso.penultimo
                animal.peso.penultimo = animal.peso.ultimo
                animal.peso.ultimo = {
                    valor: engorda.peso_entrada,
                    id: engorda._id
                }
                animal.save()
                res.json(engorda)
            },
            (err) => {
                res.sendStatus(500).json(err)
                console.log(erro)
            }
        )
    }

    controller.removeEngordaById = (req, res) => {
        let id = req.params.idEngorda
        let idAnimal = req.params.idBezerro
        let idRecria = req.params.idRecria
        Engorda.findOneAndRemove({
            _id: id,
            animal: idAnimal
        }).exec().then(function(engorda) {
            atualizarRecriaParaRemover(res, idRecria, idAnimal)
        }, function(err) {
            console.log(err)
            res.sendStatus(500).json(err)
        })
    }

    function atualizarRecriaParaRemover(res, idRecria, idAnimal) {
        Recria.findOneAndUpdate({
            id: idRecria,
            animal: idAnimal
        }, {
            $set: {
                data_saida: null,
                peso_saida: null
            }
        }).exec().then((recria) => {
            res.sendStatus(200)
        }, (err) => {
            console.log(err)
            res.sendStatus(500).json(err)
        })
    }

    controller.salvarAcompanhamento = (req, res) => {
        let id = req.body._id
        let idEngorda = req.params.idEngorda
        if (id) {
            Engorda.findOneAndUpdate({
                'acompanhamento._id': id
            }, {
                $set: {
                    'acompanhamento.$.data': req.body.data,
                    'acompanhamento.$.peso': req.body.peso
                }
            }).exec().then(
                (engorda) => {
                    atualizarPesoPeloAcompanhamento(engorda, req.body, res)
                    res.json(engorda)
                },
                (err) => {
                    console.log(err)
                    res.sendStatus(500)
                }
            )
        } else {
            Engorda.findByIdAndUpdate(idEngorda, {
                $push: {
                    'acompanhamento': req.body
                }
            }).then((engorda) => {
                atualizarPesoPeloAcompanhamento(engorda, req.body, res)
                res.json(engorda)
            }, (err) => {
                console.log(err)
                res.sendStatus(500)
            })
        }
    }

    function atualizarPesoPeloAcompanhamento(engorda, acompanhamento, res) {
        Animal.findOne({
            _id: engorda.animal
        }).exec().then(
            (animal) => {
                animal.peso.antepenultimo = animal.peso.penultimo
                animal.peso.penultimo = animal.peso.ultimo
                animal.peso.ultimo = {
                    valor: acompanhamento.peso,
                    id: engorda._id
                };
                animal.save()
            }, (err) => {
                console.log(err)
                res.sendStatus(500).json(err)
            }
        )
    }

    controller.removeAcompanhamento = (req, res) => {
        let idEngorda = req.params.idEngorda
        let idAcompanhamento = req.params.idAcompanhamento
        Engorda.findOneAndUpdate({
            _id: idEngorda
        }, {
            $pull: {
                acompanhamento: {
                    _id: idAcompanhamento
                }
            }
        }).then(() => {
            res.json(200)
        }, (err) => {
            console.log(err)
            res.sendStatus(500)
        })
    }

    return controller
}
