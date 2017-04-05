module.exports = (app) => {
    let Semen = app.models.semen
    let controller = {}

    controller.all = (req, res) => {
        let usuario = req.params.usuario
        Semen.find({
            usuario: usuario
        }).exec().then(
            (semens) => {
                res.json(semens)
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
            Semen.findByIdAndUpdate(id, req.body).exec().then(
                (semen) => {
                    res.json(semen)
                },
                (err) => {
                    res.sendStatus(500).json(err)
                    console.log(err)
                }
            )
        } else {
            //criar
            Semen.create(req.body).then(
                (semen) => {
                    res.json(semen)
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
        let usuario = req.params.usuario
        Semen.find({
            _id: id,
            usuario: usuario
        }).exec().then(
            (semen) => {
                res.json(semen)
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
        Semen.findByIdAndRemove(id).exec().then(
            (semen) => {
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
