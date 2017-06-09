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
        let animal = req.body[1]
        buscarUltimoParto(res, parto, animal)
    }

    function buscarUltimoParto(res, parto, animal) {
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
                    parto.intervalo_parto_anterior = moment(partoAnterior.data).to(moment(parto.data), true);
                } else {
                    parto.primeiro = true
                }
                persistirParto(res, parto, animal)
            },
            (err) => {
                res.sendStatus(500).json(err)
                console.log(err)
            }
        );
    }

    function persistirParto(res, parto, animal) {
        if (parto._id) {
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
            Parto.create(parto).then(
                (novoParto) => {
                    animal.parto = novoParto._id
                    persistirAnimal(res, animal, novoParto.animal)
                },
                (err) => {
                    res.sendStatus(500).json(err)
                    console.log(err)
                }
            )
        }
    }

    function persistirAnimal(res, animal, reprodutora) {
        Animal.create(animal).then(
            (novoAnimal) => {
                modificarGeneroNaReprodutora(res, reprodutora, novoAnimal)
            },
            (err) => {
                res.sendStatus(500).json(err)
                console.log(err)
            }
        )
    }

    function modificarGeneroNaReprodutora(res, reprodutora, animal) {
        Animal.findOne({
            _id: reprodutora
        }).exec().then(
            (reprodutora) => {
                switch (animal.sexo) {
                    case 'macho':
                        reprodutora.machos.push(animal._id)
                        break;
                    case 'femea':
                        reprodutora.femeas.push(animal._id)
                        break;
                    default:
                        (err) => {
                            res.sendStatus(500).json(err)
                            console.log(err)
                        }
                }
                reprodutora.save()
                res.json(animal)
            },
            (err) => {
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
