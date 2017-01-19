module.exports = (app) => {
    let Propriedade = app.models.propriedade
    let Usuario = app.models.usuario
    let controller = {}

    controller.buscaPorUsuario = (req, res) => {
        let user = req.params.id
        Propriedade.find().where('usuarios').equals(user).exec().then(
            (propriedades) => {
                res.json(propriedades)
            },
            (err) => {
                console.error(erro)
                res.sendstatus(500).json(erro)
            }
        )
    }

    controller.buscar = (req, res) => {
        let id = req.params.id
        Propriedade.findById(id).exec().then(
            (propriedade) => {
                res.json(propriedade)
            },
            (err) => {
                console.error(erro)
                res.sendstatus(500).json(erro)
            }
        )
    }

    controller.buscaPorToken = (req, res) => {
        let tokenUser = req.params.token

        //feio pra carai
        //tem que mudar isso logo
        Usuario.findOne({
            token: tokenUser
        }).exec().then(
            (user) => {
                Propriedade.find({
                    'usuario': user._id
                }).exec().then(
                    (propriedades) => {
                        res.json(propriedades)
                    },
                    (erro) => {
                        console.error(erro)
                        res.sendstatus(500).json(erro)
                    }
                )
            },
            (err) => {
                console.error(erro)
                res.sendstatus(500).json(erro)
            }
        )
    }

    controller.salvar = (req, res) => {
        let _id = req.body._id
        if (_id) {
            //atualiza o produto
            Propriedade.findByIdAndUpdate(_id, req.body).exec().then(
                (propriedade) => {
                    res.json(propriedade)
                },
                (erro) => {
                    console.error(erro)
                    res.sendstatus(500).json(erro)
                }
            )
        } else {
            //cria o produto
            Propriedade.create(req.body).then(
                (propriedade) => {
                    res.json(propriedade)
                },
                (erro) => {
                    console.log(erro)
                    res.sendstatus(500).json(erro)
                }
            )
        }
    }

    return controller
}
