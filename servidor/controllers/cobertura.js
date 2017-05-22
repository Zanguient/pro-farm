module.exports = (app) => {
    let Cobertura = app.models.cobertura
    let controller = {}

    controller.todas = (req, res) => {
        let propriedade = req.params.propriedade
        Cobertura.find({
            propriedade: propriedade
        }).select("data data_final tipo").exec().then(
            (coberturas) => {
                res.json(coberturas)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    controller.porReprodutora = (req, res) => {
        let reprodutora = req.params.reprodutora
        Cobertura.find({
            animal: reprodutora
        }).select("data data_final tipo").exec().then(
            (coberturas) => {
                res.json(coberturas)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    controller.porLote = (req, res) => {
        let lote = req.params.lote
        Cobertura.find({
            lote: lote
        }).populate('animal').exec().then(
            (coberturas) => {
                res.json(coberturas)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    controller.buscaUma = (req, res) => {
        let id = req.params.id
        Cobertura.findOne({
            _id: id
        }).populate('animal lote funcionario semen').exec().then(
            (cobertura) => {
                res.json(cobertura)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    controller.salvar = (req, res) => {
        let _id = req.body._id
        if (_id) {
            //atualiza a cobertura
            Cobertura.findByIdAndUpdate(_id, req.body).exec().then(
                (cobertura) => {
                    res.json(cobertura)
                },
                (erro) => {
                    res.sendStatus(500)
                    console.log(erro)
                }
            )
        } else {
            //cria a cobertura
            Cobertura.create(req.body).then(
                (cobertura) => {
                    res.json(cobertura)
                },
                (erro) => {
                    res.sendStatus(500)
                    console.log(erro)
                }
            )
        }
    }

    controller.salvarDiag = (req, res) => {
        let cobertura = req.params.id
        let diag = req.body._id
        if (diag) {
            //atualiza o diagnostico
            Cobertura.findOneAndUpdate({
                _id: cobertura,
                "diagnostico._id": diag
            }, {
                $set: {
                    "diagnostico.$": req.body
                }
            }).exec().then(
                (diag) => {
                    res.json(diag)
                },
                (erro) => {
                    res.sendStatus(500)
                    console.log(erro)
                }
            )
        } else {
            //cria o diagnostico
            Cobertura.findOneAndUpdate({
                _id: cobertura
            }, {
                $push: {
                    diagnostico: req.body
                }
            }).then(
                (cobertura) => {
                    res.json(cobertura)
                },
                (erro) => {
                    res.sendStatus(500)
                    console.log(erro)
                }
            )
        }
    }

    controller.removerDiag = (req, res) => {
        let _id = req.params.id
        let diag = req.params.diag
        Cobertura.findOneAndUpdate({
            "_id": _id
        }, {
            $pull: {
                diagnostico: {
                    _id: diag
                }
            }
        }).exec().then(
            () => {
                res.sendStatus(200)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    controller.remover = (req, res) => {
        let _id = req.params.id
        Cobertura.remove({
            "_id": _id
        }).exec().then(
            () => {
                res.sendStatus(200)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    return controller
}
