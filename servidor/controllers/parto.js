module.exports = (app) => {
    let Parto = app.models.parto
    let Animal = app.models.animal
    let moment = require('moment')
    let controller = {}

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
        let parto = req.body[0]
        let filho = req.body[1]
        buscarUltimoParto(res, parto, filho)
    }

    function buscarUltimoParto(res, parto, filho) {
        Parto.findOne({
            animal: parto.animal,
            data: {
                $lt: parto.data
            }
        }, {}, {
            sort: {
                'data': -1
            }
        }).exec().then(
            (partoAnterior) => {
                if (partoAnterior) {
                    parto.intervalo_parto_anterior = moment(parto.data).diff(moment(partoAnterior.data), 'days')
                    Animal.findByIdAndUpdate(parto.animal, {
                        $set: {
                            ultimo_intervalo_entre_partos: parto.intervalo_entre_partos
                        }
                    }).exec().then(
                        (animal) => {
                            persistirParto(res, parto, filho)
                        }, (err) => {
                            res.sendStatus(500).json(err)
                            console.log(err)
                        }
                    )
                } else {
                    parto.primeiro = true
                    Animal.findOne(parto.animal).exec().then(
                        (animal) => {
                            animal.idade_primeiro_parto = moment(parto.data).diff(moment(animal.nascimento), 'days')
                            animal.save()
                            persistirParto(res, parto, filho)
                        }, (err) => {
                            res.sendStatus(500).json(err)
                            console.log(err)
                        }
                    )
                }

            },
            (err) => {
                res.sendStatus(500).json(err)
                console.log(err)
            }
        )
    }

    function persistirParto(res, parto, filho) {
        if (parto._id) {
            //atualiza o parto
            Parto.findByIdAndUpdate(parto._id, parto).exec().then(
                (parto) => {
                    calcularIntervaloEntrePartos(res, novoParto.animal, filho)
                },
                (erro) => {
                    res.sendStatus(500)
                    console.log(erro)
                }
            )
        } else {
            Parto.create(parto).then(
                (novoParto) => {
                    filho.parto = novoParto._id
                    persistirAnimal(res, filho, novoParto.animal)
                },
                (err) => {
                    res.sendStatus(500).json(err)
                    console.log(err)
                }
            )
        }
    }

    function persistirAnimal(res, filho, reprodutora) {
        Animal.create(filho).then(
            (novoAnimal) => {
                incluirNovoGeneroNaReprodutora(res, reprodutora, novoAnimal)
            },
            (err) => {
                res.sendStatus(500).json(err)
                console.log(err)
            }
        )
    }

    function incluirNovoGeneroNaReprodutora(res, reprodutora, filho) {
        Animal.findOne({
            _id: reprodutora
        }).exec().then(
            (reprodutora) => {
                switch (filho.sexo) {
                    case 'macho':
                        reprodutora.machos.push(filho._id)
                        break
                    case 'femea':
                        reprodutora.femeas.push(filho._id)
                        break
                    default:
                        (err) => {
                            res.sendStatus(500).json(err)
                            console.log(err)
                        }
                }
                reprodutora.save()
                calcularIntervaloEntrePartos(res, reprodutora, filho)
            },
            (err) => {
                res.sendStatus(500).json(err)
                console.log(err)
            }
        )
    }

    function calcularIntervaloEntrePartos(res, reprodutora, filho) {
        Parto.find({
            animal: reprodutora
        }).select('data').exec().then(
            (partos) => {
                if (partos.length > 1) {
                    // persistir intervalo entre partos
                    let primeiro_parto = moment(partos[0].data)
                    let ultimo_parto = moment(partos[partos.length - 1].data)
                    let intervalo_entre_partos_atual = (ultimo_parto.diff(primeiro_parto, 'days') / partos.length)
                    Animal.findByIdAndUpdate(reprodutora, {
                        $set: {
                            intervalo_entre_partos: intervalo_entre_partos_atual
                        }
                    }).exec().then(
                        (animal) => {
                            res.json(filho)
                        }, (err) => {
                            res.sendStatus(500).json(err)
                            console.log(err)
                        }
                    )
                } else {
                    res.json(filho)
                }
            }, (err) => {
                res.sendStatus(500).json(err)
                console.log(err)
            }
        )
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

    return controller
}
