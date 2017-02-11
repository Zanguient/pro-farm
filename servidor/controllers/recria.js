module.exports = (app) => {
    let Recria = app.models.recria
    let Animal = app.models.animal
    let controller = {}

    controller.getRecria = (req, res) => {
        let idBezerro = req.params.idBezerro
        Recria.findOne({
            bezerro: idBezerro
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
                    atualizarBezerro(req, res, recria)
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
                    atualizarBezerro(req, res, recria)
                },
                (erro) => {
                    res.sendStatus(500)
                    console.log(erro)
                }
            )
        }
    }

    function atualizarBezerro(req, res, recria) {
        Animal.findByIdAndUpdate(recria.bezerro, {
            peso_desmama: recria.peso_entrada
        }).exec().then(
            (bezerro) => {
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

    return controller
}
