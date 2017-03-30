module.exports = (app) => {
    let Cbo = app.models.cbo
    let controller = {}

    controller.getAll = (req, res) => {
        Cbo.find().exec().then(
            (cbos) => {
                res.json(cbos)
            },
            (err) => {
                res.sendStatus(500).json(err)
                console.log(err)
            }
        )
    }

    controller.setAll = (req, res) => {
        buscarQuantidadeDeCbo((count) => {
            if (count > 0) {
                Cbo.create(req.body).then(
                    (cbos) => {
                        res.json(cbos)
                    },
                    (err) => {
                        res.sendStatus(500).json(err)
                        console.log(err)
                    }
                )
            } else {
                res.sendStatus(304).json({
                    msg: 'Valores de CBO já cadastrados.'
                })
            }
        })
    }

    buscarQuantidadeDeCbo = (callback) => {
        Cbo.count(
            (result) => {
                callback(result)
            },
            (err) => {
                res.sendStatus(500).json(err)
                console.log(err)
            }
        )
    }

    // controller.persist = (req, res) => {
    //     //salva ou atualiza
    //     let id = req.body._id
    //     if (id) {
    //         //atualizar
    //         Lote.findByIdAndUpdate(id, req.body).exec().then(
    //             (lote) => {
    //                 res.json(lote)
    //             },
    //             (err) => {
    //                 res.sendStatus(500).json(err)
    //                 console.log(err)
    //             }
    //         )
    //     } else {
    //         //criar
    //         Lote.create(req.body).exec().then(
    //             (lote) => {
    //                 res.json(lote)
    //             },
    //             (err) => {
    //                 res.sendStatus(500).json(err)
    //                 console.log(err)
    //             }
    //         )
    //     }
    // }
    //
    // controller.getOne = (req, res) => {
    //     // get by id
    //     let id = req.params.id
    //     Lote.find({
    //         _id: id,
    //         propriedade: prop
    //     }).exec().then(
    //         (lote) => {
    //             res.json(lote)
    //         },
    //         (err) => {
    //             res.sendStatus(500).json(err)
    //             console.log(err)
    //         }
    //     )
    // }
    //
    // controller.remove = (req, res) => {
    //     //remover
    //     let id = req.params.id
    //     Lote.findByIdAndRemove(id).exec().then(
    //         (lote) => {
    //             res.sendStatus(200);
    //         },
    //         (err) => {
    //             res.sendStatus(500).json(err)
    //             console.log(err)
    //         }
    //     )
    // }

    return controller
}
