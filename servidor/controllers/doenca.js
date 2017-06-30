module.exports = (app) => {
    let Doenca = app.models.doenca
    let controller = {}

    controller.getAll = (req, res) => {
        Doenca.find().exec().then(
            (doencas) => {
                res.json(doencas)
            },
            (err) => {
                res.sendStatus(500).json(err)
                console.log(err)
            }
        )
    }

    controller.setAll = (req, res) => {
        buscarQuantidadeDeDoenca((count) => {
            if (count > 0) {
                Doenca.create(req.body).then(
                    (doencas) => {
                        res.json(doencas)
                    },
                    (err) => {
                        res.sendStatus(500).json(err)
                        console.log(err)
                    }
                )
            } else {
                res.sendStatus(304).json({
                    msg: 'Valores de Doenças já cadastrados.'
                })
            }
        })
    }

    buscarQuantidadeDeDoenca = (callback) => {
        Doenca.count(
            (result) => {
                callback(result)
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
            Doenca.findByIdAndUpdate(id, req.body).exec().then(
                (doenca) => {
                    res.json(doenca)
                },
                (err) => {
                    res.sendStatus(500).json(err)
                    console.log(err)
                }
            )
        } else {
            //criar
            Doenca.create(req.body).exec().then(
                (doenca) => {
                    res.json(doenca)
                },
                (err) => {
                    res.sendStatus(500).json(err)
                    console.log(err)
                }
            )
        }
    }
    
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
