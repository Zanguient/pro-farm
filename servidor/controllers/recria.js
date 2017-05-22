module.exports = (app) => {
    let Recria = app.models.recria
    let Animal = app.models.animal
    let controller = {}

    controller.getRecriaByAnimal = (req, res) => {
        let idAnimal = req.params.idAnimal
        Recria.findOne({
            animal: idAnimal
        }).exec().then(
            (recria) => {
                res.json(recria)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    controller.getRecriaById = (req, res) => {
        let idRecria = req.params.idRecria
        let idAnimal = req.params.idAnimal
        Recria.findOne({
            animal: idAnimal,
            _id: idRecria
        }).exec().then(
            (recria) => {
                res.json(recria)
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
            //atualiza a recria
            Recria.findByIdAndUpdate(id, req.body).exec().then(
                (recria) => {
                    atualizarAnimal(req, res, req.body)
                },
                (erro) => {
                    res.sendStatus(500)
                    console.log(erro)
                }
            )
        } else {
            //cria a recria
            Recria.create(req.body).then(
                (recria) => {
                    atualizarAnimal(req, res, recria)
                },
                (erro) => {
                    res.sendStatus(500)
                    console.log(erro)
                }
            )
        }
    }

    function atualizarAnimal(req, res, recria) {
        Animal.findByIdAndUpdate(recria.animal, {
            'peso.desmama.valor': recria.peso_entrada,
            'peso.desmama.id': recria._id
        }).exec().then(
            (bezerro) => {
                bezerro.peso.antepenultimo = bezerro.peso.penultimo
                bezerro.peso.penultimo = bezerro.peso.ultimo
                bezerro.ultimo = {
                    valor: recria.peso_entrada,
                    id: recria._id
                }
                bezerro.save()
                if (bezerro.parto) {
                    atualizarVaca(req, res, recria, bezerro) //TODO: implementar quando existir um bezerro criado a partir de um parto
                } else {
                    res.json(recria)
                }
            },
            (err) => {
                console.log(err);
                res.sendStatus(500);
            }
        )
    }

    // function atualizarVaca() {
    //
    // }

    controller.removeRecriaById = (req, res) => {
        let id = req.params.idRecria;
        let idAnimal = req.params.idAnimal;
        Recria.findOneAndRemove({
            _id: id,
            animal: idAnimal
        }).exec().then(
            (recria) => {
                removerPesoDeDesmamaDoAnimal(res, idAnimal)
            },
            (err) => {
                res.sendStatus(500)
                console.log(err)
            }
        );
    }

    function removerPesoDeDesmamaDoAnimal(res, _id) {
        Animal.findByIdAndUpdate(_id, {
            $set: {
                peso_desmama: null
            }
        }).then(
            (animal) => {
                res.sendStatus(200)
            },
            (err) => {
                res.sendStatus(500)
                console.log(err)
            }
        )
    }

    return controller
}
