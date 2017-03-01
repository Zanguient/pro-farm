module.exports = function(app) {
    var Engorda = app.models.engorda;
    var Recria = app.models.recria;
    var controller = {};

    controller.getEngordaByBezerro = (req, res) => {
        let idAnimal = req.params.idAnimal
        Engorda.findOne({
            animal: idAnimal
        }).select('_id data').exec().then(
            (engorda) => {
                res.json(engorda)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    controller.getEngordaById = (req, res) => {
        let idEngorda = req.params.idEngorda
        Engorda.findOne({
            _id: idEngorda
        }).exec().then(
            (engorda) => {
                res.json(engorda)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    controller.salvar = (req, res) => {
        let id = req.body._id
        if (id) {
            //atualiza a engorda
            Engorda.findByIdAndUpdate(id, req.body).exec().then(
                (engorda) => {
                    atualizarRecria(req.body.animal, req.body.peso_entrada, engorda, res)
                },
                (erro) => {
                    res.sendStatus(500)
                    console.log(erro)
                }
            )
        } else {
            //cria a engorda
            Engorda.create(req.body).then(
                (engorda) => {
                    atualizarRecria(req.body.animal, req.body.peso_entrada, engorda, res)
                },
                (erro) => {
                    res.sendStatus(500)
                    console.log(erro)
                }
            )
        }
    }

    function atualizarRecria(animal, peso, engorda, res) {
        Recria.findOneAndUpdate({
            animal: animal
        }, {
            $set: {
                peso_saida: peso,
                data_saida: engorda.data
            }
        }, function(recria) {
            res.json(engorda)
        }, function(err) {
            res.sendStatus(500).json(err)
            console.log(erro)
        })
    }

    controller.removeEngordaById = (req, res) => {
        let id = req.params.idEngorda
        let idAnimal = req.params.idBezerro
        let idRecria = req.params.idRecria
        Engorda.findOneAndRemove({
            _id: id,
            animal: idAnimal
        }).exec().then(function(engorda) {
            atualizarRecriaParaRemover(res, idRecria, idAnimal)
        }, function(err) {
            console.log(err)
            res.sendStatus(500).json(err)
        })
    }

    function atualizarRecriaParaRemover(res, idRecria, idAnimal) {
        Recria.findOneAndUpdate({
            id: idRecria,
            animal: idAnimal
        }, {
            $set: {
                data_saida: null,
                peso_saida: null
            }
        }).exec().then(function(recria) {
            res.sendStatus(200)
        }, function(err) {
            console.log(err)
            res.sendStatus(500).json(err)
        })
    }

    controller.salvarAcompanhamento = (req, res) => {
        let id = req.body._id
        let idEngorda = req.params.idEngorda
        console.log(req.body);
        if (id) {
            Engorda.findOneAndUpdate({
                'acompanhamento._id': id
            }, {
                $set: {
                    'acompanhamento.$.data': req.body.data,
                    'acompanhamento.$.peso': req.body.peso
                }
            }).exec().then(
                function(acompanhamento) {
                    res.json(acompanhamento)
                },
                function(err) {
                    console.log(err)
                    res.sendStatus(500)
                }
            )
        } else {
            Engorda.findByIdAndUpdate(idEngorda, {
                $push: {
                    'acompanhamento': req.body
                }
            }).then(function(acompanhamento) {
                res.json(acompanhamento)
            }, function(err) {
                console.log(err);
                res.sendStatus(500)
            })
        }
    }

    controller.removeAcompanhamento = (req, res) => {
        let idEngorda = req.params.idEngorda
        let idAcompanhamento = req.params.idAcompanhamento
        Engorda.findOneAndUpdate({
            _id: idEngorda
        }, {
            $pull: {
                acompanhamento: {
                    _id: idAcompanhamento
                }
            }
        }).then(function() {
            res.json(200)
        }, function(err) {
            console.log(err);
            res.sendStatus(500)
        })
    }

    return controller;
};
