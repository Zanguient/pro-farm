module.exports = (app) => {
    let Lote = app.models.lote
    let Cobertura = app.models.cobertura
    let moment = require('moment')
    let async = require('async')
    let controller = {}

    controller.all = (req, res) => {
        let prop = req.params.propriedade
        Lote.find({
            propriedade: prop
        }).exec().then(
            (lotes) => {
                res.json(lotes)
            },
            (err) => {
                res.sendStatus(500).json(err)
                console.log(err)
            }
        )
    }

    controller.persist = (req, res) => {
        //salva ou atualiza
        let id = req.body._id
        if (id) {
            //atualizar
            Lote.findByIdAndUpdate(id, req.body).exec().then(
                (lote) => {
                    res.json(lote)
                },
                (err) => {
                    res.sendStatus(500).json(err)
                    console.log(err)
                }
            )
        } else {
            //criar
            Lote.create(req.body).then(
                (lote) => {
                    res.json(lote)
                },
                (err) => {
                    res.sendStatus(500).json(err)
                    console.log(err)
                }
            )
        }
    }

    controller.persistWithCobertura = (req, res) => {
        let lote = req.body[0]
        let cobertura = req.body[1]
        let animais = req.body[2]
        Lote.create(lote).then(
            (lote) => {
                salvarCoberturaComAnimais(lote, cobertura, animais, res)
            },
            (err) => {
                res.sendStatus(500).json(err)
                console.log(err)
            }
        )
    }

    salvarCoberturaComAnimais = (lote, cobertura, animais, res) => {
        cobertura.lote = lote._id
        async.eachSeries(animais, (animal, callback) => {
            cobertura.animal = animal._id
            cobertura.peso_entrada = animal.peso.ultimo.valor
            Cobertura.create(cobertura).then(
                (cobertura) => {
                    callback()
                }, (err) => {
                    res.sendStatus(500).json(err)
                    console.log(err)
                }
            )
        }, done = () => {
            res.json(lote)
        })
    }

    controller.getOne = (req, res) => {
        // get by id
        let id = req.params.id
        let prop = req.params.propriedade
        Lote.findOne({
            _id: id,
            propriedade: prop
        }).exec().then(
            (lote) => {
                res.json(lote)
            },
            (err) => {
                res.sendStatus(500).json(err)
                console.log(err)
            }
        )
    }

    controller.ultimo = (req, res) => {
        // get by id
        let propriedade = req.params.propriedade
        let date_init = moment()
        Lote.findOne({
            propriedade: propriedade,
        }, {}, {
            sort: {
                'data': -1
            }
        }).exec().then(
            (lote) => {
                res.json(lote)
            },
            (err) => {
                res.sendStatus(500).json(err)
                console.log(err)
            }
        )
    }

    controller.remove = (req, res) => {
        //remover
        let id = req.params.id
        Lote.findByIdAndRemove(id).exec().then(
            (lote) => {
                res.sendStatus(200);
            },
            (err) => {
                res.sendStatus(500).json(err)
                console.log(err)
            }
        )
    }

    return controller
}
