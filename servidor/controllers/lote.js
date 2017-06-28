module.exports = (app) => {
    let Lote = app.models.lote
    let Cobertura = app.models.cobertura
    let Sanidade = app.models.sanidade
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

    controller.persistWithSanidade = (req, res) => {
        let lote = req.body[0]
        let sanidade = req.body[1]
        let animais = req.body[2]
        Lote.create(lote).then(
            (lote) => {
                salvarSanidadeComAnimais(lote, sanidade, animais, res)
            },
            (err) => {
                res.sendStatus(500).json(err)
                console.log(err)
            }
        )
    }

    salvarSanidadeComAnimais = (lote, sanidade, animais, res) => {
        sanidade.lote = lote._id
        async.eachSeries(animais, (animal, callback) => {
            sanidade.animal = animal._id
            Sanidade.create(sanidade).then(
                (sanidade) => {
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

    salvarCoberturaComAnimais = (lote, cobertura, animais, res) => {
        cobertura.lote = lote._id
        async.eachSeries(animais, (animal, callback) => {
            cobertura.animal = animal._id
            cobertura.peso_entrada = (animal.peso.length > 0) ? animal.peso[animal.length - 1].valor : null
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
        }).populate('produtosRelacionados').exec().then(
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
