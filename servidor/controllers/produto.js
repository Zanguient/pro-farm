module.exports = (app) => {
    let Produto = app.models.produto
    // let moment = require('moment')
    // let async = require('async')
    let controller = {}

    controller.all = (req, res) => {
        let prop = req.params.propriedade
        Produto.find({
            $or: [{
                propriedade: prop
            }, {
                propriedade: null
            }]
        }).select('nome empresa tipo foto bula').exec().then(
            (produtos) => {
                res.json(produtos)
            },
            (err) => {
                res.sendStatus(500).json(err)
                console.log(err)
            }
        )
    }

    controller.persist = (req, res) => {
        // if (req.body.admin) {
        //     res.sendStatus(300).json("Não é permitido alterar as informações deste produto.")
        // } else {
        //     let id = req.body._id
        //     if (id) {
        //         //atualizar
        //         Produto.findByIdAndUpdate(id, req.body).exec().then(
        //             (produto) => {
        //                 res.json(produto)
        //             },
        //             (err) => {
        //                 res.sendStatus(500).json(err)
        //                 console.log(err)
        //             }
        //         )
        //     } else {
        //         //criar
        //         Produto.create(req.body).then(
        //             (produto) => {
        //                 res.json(produto)
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
            Produto.findByIdAndUpdate(id, req.body).exec().then(
                (produto) => {
                    res.json(produto)
                },
                (err) => {
                    res.sendStatus(500).json(err)
                    console.log(err)
                }
            )
        } else {
            //criar
            Produto.create(req.body).then(
                (produto) => {
                    res.json(produto)
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
        Produto.findOne({
            _id: id
        }).exec().then(
            (produto) => {
                res.json(produto)
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
            (produto) => {
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
