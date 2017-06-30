module.exports = (app) => {
    let Sanidade = app.models.sanidade
    // let moment = require('moment')
    // let async = require('async')
    let controller = {}

    controller.all = (req, res) => {
        let prop = req.params.propriedade
        Sanidade.find({
            $or: [{
                propriedade: prop
            }, {
                propriedade: null
            }]
        }).exec().then(
            (sanidades) => {
                res.json(sanidades)
            },
            (err) => {
                res.sendStatus(500).json(err)
                console.log(err)
            }
        )
    }

    controller.porLote = (req, res) => {
        let lote = req.params.lote
        Sanidade.find({
            'lote': lote
        }).populate('animal').exec().then(
            (sanidades) => {
                res.json(sanidades)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }


    controller.porAnimal = (req, res) => {
        let animal = req.params.id
        Sanidade.find({
            animal: animal
        }).select("data").exec().then(
            (sanidades) => {
                res.json(sanidades)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    controller.persist = (req, res) => {
        // if (req.body.admin) {
        //     res.sendStatus(300).json("Não é permitido alterar as informações deste sanidade.")
        // } else {
        //     let id = req.body._id
        //     if (id) {
        //         //atualizar
        //         Sanidade.findByIdAndUpdate(id, req.body).exec().then(
        //             (sanidade) => {
        //                 res.json(sanidade)
        //             },
        //             (err) => {
        //                 res.sendStatus(500).json(err)
        //                 console.log(err)
        //             }
        //         )
        //     } else {
        //         //criar
        //         Sanidade.create(req.body).then(
        //             (sanidade) => {
        //                 res.json(sanidade)
        //             },
        //             (err) => {
        //                 res.sendStatus(500).json(err)
        //                 console.log(err)
        //             }
        //         )
        //     }
        // }
        let id = req.body._id
        console.log(req.body);
        if (id) {
            //atualizar
            Sanidade.findByIdAndUpdate(id, req.body).exec().then(
                (sanidade) => {
                    res.json(sanidade)
                },
                (err) => {
                    res.sendStatus(500).json(err)
                    console.log(err)
                }
            )
        } else {
            //criar
            Sanidade.create(req.body).then(
                (sanidade) => {
                    res.json(sanidade)
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
        Sanidade.findOne({
            _id: id
        }).populate('produtosAplicados').exec().then(
            (sanidade) => {
                res.json(sanidade)
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
            (sanidade) => {
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
