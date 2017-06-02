module.exports = (app) => {
    let moment = require('moment')
    let async = require('async')
    let Animal = app.models.animal
    let controller = {}

    controller.todos = (req, res) => {
        let propriedade = req.params.propriedade
        Animal.find({
            propriedade: propriedade
        }).select("codigo").exec().then(
            (animais) => {
                res.json(animais)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    controller.getAnimaisParaCobertura = (req, res) => {
        let propriedade = req.params.propriedade
        let date_init = moment().subtract(12, 'months')
        Animal.find({
            propriedade: propriedade,
            sexo: 'femea',
            morte: null,
            'venda.id': null,
            nascimento: {
                $lt: date_init
            },
            touro: false
        }).select("codigo peso").exec().then(
            (animais) => {
                res.json(animais)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    controller.getBezerros = (req, res) => {
        let date_init = moment().subtract(12, 'months')
        let date_end = moment()
        let propriedade = req.params.propriedade
        Animal.find({
            propriedade: propriedade,
            nascimento: {
                $gte: date_init,
                $lt: date_end
            },
            touro: false
        }).select("codigo sexo").exec().then(
            (animais) => {
                res.json(animais)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    controller.getGarrotes = (req, res) => {
        let date_init = moment().subtract(24, 'months')
        let date_end = moment().subtract(12, 'months')
        let propriedade = req.params.propriedade
        Animal.find({
            propriedade: propriedade,
            nascimento: {
                $gte: date_init,
                $lt: date_end
            },
            touro: false
        }).select("codigo sexo").exec().then(
            (animais) => {
                res.json(animais)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    controller.getNovilhos = (req, res) => {
        let date_init = moment().subtract(36, 'months')
        let date_end = moment().subtract(24, 'months')
        let propriedade = req.params.propriedade
        Animal.find({
            propriedade: propriedade,
            nascimento: {
                $gte: date_init,
                $lt: date_end
            },
            touro: false
        }).select("codigo sexo").exec().then(
            (animais) => {
                res.json(animais)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    controller.getTouros = (req, res) => {
        let propriedade = req.params.propriedade
        Animal.find({
            propriedade: propriedade,
            touro: true
        }).select("codigo sexo").exec().then(
            (animais) => {
                res.json(animais)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    controller.getBoisVacas = (req, res) => {
        let date_init = moment().subtract(36, 'months')
        let propriedade = req.params.propriedade
        Animal.find({
            propriedade: propriedade,
            nascimento: {
                $lt: date_init
            },
            touro: false
        }).select("codigo sexo").exec().then(
            (animais) => {
                res.json(animais)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    controller.getTodosOsCodigosPorPropriedade = (req, res) => {
        let propriedade = req.params.propriedade
        let codigo = req.params.codigo
        Animal.find({
            propriedade: propriedade,
            codigo: codigo
        }).exec().then(
            (animal) => {
                res.json(animal)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    controller.buscaUm = (req, res) => {
        let id = req.params.id
        let propriedade = req.params.propriedade
        Animal.findOne({
            _id: id,
            propriedade: propriedade
        }).exec().then(
            (animal) => {
                res.json(animal)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    controller.buscaUmPeloParto = (req, res) => {
        let id = req.params.id
        Animal.findOne({
            parto: id
        }).select('_id').exec().then(
            (animal) => {
                res.json(animal)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    controller.buscarFilhos = (req, res) => {
        let id = req.params.id
        Animal.findById(id).select('machos femeas').exec().then(
            (reprodutora) => {
                let filhos = {
                    machos: [],
                    femeas: []
                }
                async.eachSeries(reprodutora.machos, (macho, callback) => {
                    Animal.findOne(macho).select("codigo").exec().then(
                        (animal) => {
                            filhos.machos.push(animal)
                            callback()
                        },
                        (erro) => {
                            res.sendStatus(500).json(erro)
                            console.log(erro)
                        }
                    )
                }, done = () => {
                    async.eachSeries(reprodutora.femeas, (femea, callback) => {
                        Animal.findOne(femea).select("codigo").exec().then(
                            (animal) => {
                                filhos.femeas.push(animal)
                                callback()
                            },
                            (erro) => {
                                res.sendStatus(500).json(erro)
                                console.log(erro)
                            }
                        )
                    }, done = () => {
                        res.json(filhos)
                    })
                })
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    controller.salvar = (req, res) => {
        let _id = req.body._id
        let propriedade = req.params.propriedade
        if (req.body.propriedade == propriedade) {
            if (_id) {
                //atualiza o animal
                Animal.findByIdAndUpdate(_id, req.body).exec().then(
                    (animal) => {
                        verificarMudancaDePeso(res, req.body, animal)
                    },
                    (erro) => {
                        res.sendStatus(500)
                        console.log(erro)
                    }
                )
            } else {
                //cria o animal
                Animal.create(req.body).then(
                    (animal) => {
                        if (animal.peso.entrada.valor) {
                            animal.peso.entrada.id = animal._id
                            animal.save()
                        }
                        res.json(animal)
                    },
                    (erro) => {
                        res.sendStatus(500)
                        console.log(erro)
                    }
                )
            }
        } else {
            res.sendStatus(403).json('Você não tem autorização para realizar esta operação');
        }
    }

    function verificarMudancaDePeso(res, atual, antigo) {
        if (atual.peso.entrada.valor != antigo.peso.entrada.valor) {
            atual.peso.antepenultimo = atual.peso.penultimo
            atual.peso.penultimo = atual.peso.ultimo
            atual.peso.ultimo = atual.peso.entrada
            Animal.findByIdAndUpdate(atual._id, atual).exec().then(
                (animal) => {
                    res.json(animal)
                },
                (erro) => {
                    res.sendStatus(500)
                    console.log(erro)
                }
            )
        }
        res.json(atual)
    }

    controller.remover = (req, res) => {
        let _id = req.params.id
        Animal.remove({
            "_id": _id
        }).exec().then(
            () => {
                res.status(200)
            },
            (erro) => {
                res.sendStatus(500)
                console.log(erro)
            }
        )
    }

    return controller
}
