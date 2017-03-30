module.exports = (app) => {
    let Funcionario = app.models.funcionario
    let controller = {}

    controller.getAll = (req, res) => {
      console.log(req.params.propriedade);
        let propriedade = req.params.propriedade
        Funcionario.find({
            propriedade: propriedade
        }).exec().then(
            (funcionarios) => {
                let registrados = []
                let tercerizados = []
                for (aux of funcionarios) {
                    if (aux.tercerizado) {
                        tercerizados.push(aux)
                    } else {
                        registrados.push(aux)
                    }
                }
                res.json([registrados, tercerizados])
            },
            (err) => {
                res.status(500).json(err)
                console.log(err)
            }
        )
    }

    controller.getOne = (req, res) => {
        let propriedade = req.params.propriedade
        let id = req.params.id
        Funcionario.find({
            propriedade: propriedade,
            _id: id
        }).exec().then((funcionario) => {
            res.json(funcionario)
        }, (err) => {
            res.status(500).json(err)
            console.log(err)
        })
    }

    controller.salvar = (req, res) => {
      console.log(req.body);
        let id = req.body._id
        if (id) {
            Funcionario.findByIdAndUpdate(id, req.body).exec().then(
                (funcionario) => {
                    res.json(funcionario)
                },
                (err) => {
                    res.status(500).json(err)
                    console.log(err)
                }
            )
        } else {
            Funcionario.create(req.body).then(
                (funcionario) => {
                    res.json(funcionario)
                },
                (err) => {
                    res.status(500).json(err)
                    console.log(err)
                }
            )
        }
    }

    return controller
}
