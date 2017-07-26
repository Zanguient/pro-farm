module.exports = (app) => {
    let Aviso = app.models.aviso
    let moment = require('moment')
    let async = require('async')
    let controller = {}

    // controller.getAll = (req, res) => {
    //     let prop = req.params.propriedade;
    //     Aviso.find({
    //         ignorar: null,
    //         propriedade: prop,
    //         $gte:{
    //           inicia_em:
    //         }
    //     }).exec().then(
    //         (avisos) => {
    //             res.json(avisos)
    //             //revisar avisos antes de enviar ao front
    //         },
    //         (err) => {
    //             res.sendStatus(500).json(err)
    //             console.log(err)
    //         }
    //     )
    // }

    controller.persist = (req, res) => {
        //salva ou atualiza
        let id = req.body._id
        if (id) {
            //atualizar
            Aviso.findByIdAndUpdate(id, req.body).exec().then(
                (aviso) => {
                    res.json(aviso)
                },
                (err) => {
                    res.sendStatus(500).json(err)
                    console.log(err)
                }
            )
        } else {
            //criar
            Aviso.create(req.body).exec().then(
                (aviso) => {
                    res.json(aviso)
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
        Aviso.find({
            _id: id,
            propriedade: prop
        }).exec().then(
            (aviso) => {
                res.json(aviso)
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
        let data = req.body.data
        Aviso.findByIdAndUpdate(id, {
            $set: {
                ignorar: data
            }
        }).exec().then(
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
