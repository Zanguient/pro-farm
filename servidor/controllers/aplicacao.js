module.exports = (app) => {
    let Aplicacao = app.models.aplicacao
    // let moment = require('moment')
    // let async = require('async')
    let controller = {}

    controller.all = (req, res) => {
        let prop = req.params.propriedade
        Aplicacao.find({
            $or: [{
                propriedade: prop
            }, {
                propriedade: null
            }]
        }).select('nome inicio fim').exec().then(
            (aplicacoes) => {
                res.json(aplicacoes)
            },
            (err) => {
                res.sendStatus(500).json(err)
                console.log(err)
            }
        )
    }

    controller.persist = (req, res) => {
        // if (req.body.admin) {
        //     res.sendStatus(300).json("Não é permitido alterar as informações deste aplicacao.")
        // } else {
        //     let id = req.body._id
        //     if (id) {
        //         //atualizar
        //         Aplicacao.findByIdAndUpdate(id, req.body).exec().then(
        //             (aplicacao) => {
        //                 res.json(aplicacao)
        //             },
        //             (err) => {
        //                 res.sendStatus(500).json(err)
        //                 console.log(err)
        //             }
        //         )
        //     } else {
        //         //criar
        //         Aplicacao.create(req.body).then(
        //             (aplicacao) => {
        //                 res.json(aplicacao)
        //             },
        //             (err) => {
        //                 res.sendStatus(500).json(err)
        //                 console.log(err)
        //             }
        //         )
        //     }
        // }
        let id = req.body._id
        if (id) {
            //atualizar
            Aplicacao.findByIdAndUpdate(id, req.body).exec().then(
                (aplicacao) => {
                    res.json(aplicacao)
                },
                (err) => {
                    res.sendStatus(500).json(err)
                    console.log(err)
                }
            )
        } else {
            //criar
            Aplicacao.create(req.body).then(
                (aplicacao) => {
                    res.json(aplicacao)
                },
                (err) => {
                    res.sendStatus(500).json(err)
                    console.log(err)
                }
            )
        }
    }

    controller.getOne = (req, res) => {
        // get by id
        let id = req.params.id
        Aplicacao.findOne({
            _id: id
        }).exec().then(
            (aplicacao) => {
                res.json(aplicacao)
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
        let prop = req.params.propriedade
        Lote.findByIdAndRemove(id).where('propriedade').equals(prop).where('admin').equals(false).exec().then(
            (aplicacao) => {
                res.sendStatus(200)
            },
            (err) => {
                res.sendStatus(500).json(err)
                console.log(err)
            }
        )
    }

    return controller
}
