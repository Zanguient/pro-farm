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
        let reprodutora = req.body[2]
        console.log(req.body);
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
            // cria o parto
            // Parto.findOne().populate('cobertura', 'animal peso_entrada').sort({
            //     'data': -1
            // }).exec().then(
            //     (partoMaisRecente) => {
            //         console.log(partoMaisRecente);
            //         res.sendStatus(200)
            //         // if (partoMaisRecente) {
            //         //     parto.intervalo_parto_anterior = parto.data.to(partoMaisRecente.data, true);
            //         // }
            //         // persistirParto(res, parto, animal)
            //     },
            //     (err) => {
            //         res.sendStatus(500).json(err)
            //         console.log(err)
            //     }
            // )

            Parto.aggregate(
                [{
                    $match: {
                        cobertura: 400
                    }
                }], {
                    readConcern: {
                        level: "majority"
                    }
                }
            ).then(
                (coberturas) => {
                    console.log(coberturas)
                },
                (err) => {
                    res.sendStatus(500).json(err)
                    console.log(err)
                }
            )

            // Cobertura.find({
            //     animal: reprodutora
            // }).select('').exec().then(
            //     (coberturas) => {
            //
            //     },
            //     (err) => {
            //         res.sendStatus(500).json(err)
            //         console.log(err)
            //     }
            // )
        }
    }

    function persistirParto(res, parto, animal) {
        Parto.create(parto).then(
            (novoParto) => {
                animal.parto = novoParto._id
                persistirAnimal(res, animal)
            },
            (err) => {
                res.sendStatus(500).json(err)
                console.log(err)
            }
        )
    }

    function persistirAnimal(res, animal) {
        Animal.create(animal).then(
            (novoAnimal) => {
                res.json(novoAnimal)
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
