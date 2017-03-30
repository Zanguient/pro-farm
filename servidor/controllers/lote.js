module.exports = (app) => {
    let Lote = app.models.lote
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

    controller.getOne = (req, res) => {
        // get by id
        let id = req.params.id
        Lote.find({
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
