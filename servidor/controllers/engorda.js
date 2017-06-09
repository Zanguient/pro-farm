module.exports = function(app) {
  var Engorda = app.models.engorda
  var Recria = app.models.recria
  var Animal = app.models.animal
  var controller = {}

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
          atualizarRecria(req.body, res, engorda)
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
          atualizarRecria(engorda, res, null)
        },
        (erro) => {
          res.sendStatus(500)
          console.log(erro)
        }
      )
    }
  }

  atualizarRecria = (engorda, res, engorda_antiga) => {
    Recria.findOneAndUpdate({
      animal: engorda.animal
    }, {
      $set: {
        peso_saida: engorda.peso_entrada,
        data_saida: engorda.data
      }
    }, (recria) => {
      atualizarPesoDoAnimal(engorda, res, engorda_antiga)
    }, (err) => {
      res.sendStatus(500).json(err)
      console.log(erro)
    })
  }

  atualizarPesoDoAnimal = (engorda, res, engorda_antiga) => {
    if (engorda_antiga) { //se ja houver um registro de engorda, entra aqui
      Animal.findOneAndUpdate({
        _id: engorda.animal,
        'peso.data': engorda_antiga.data
      }, {
        'peso.$.data': engorda.data,
        'peso.$.valor': engorda.peso_entrada
      }).exec().then(
        (animal) => {
          res.json(engorda)
        },
        (err) => {
          console.log(err)
          res.sendStatus(500)
        }
      )
    } else { // se nao, adiciona uma nova
      Animal.findByIdAndUpdate(engorda.animal, {
        $push: {
          peso: {
            valor: engorda.peso_entrada,
            data: engorda.data
          }
        }
      }).exec().then(
        (bezerro) => {
          res.json(engorda)
        },
        (err) => {
          console.log(err)
          res.sendStatus(500)
        }
      )
    }
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
    }).exec().then((recria) => {
      res.sendStatus(200)
    }, (err) => {
      console.log(err)
      res.sendStatus(500).json(err)
    })
  }

  controller.salvarAcompanhamento = (req, res) => {
    let id = req.body._id
    let idEngorda = req.params.idEngorda
    if (id) {
      Engorda.findOneAndUpdate({
        'acompanhamento._id': id
      }, {
        $set: {
          'acompanhamento.$.data': req.body.data,
          'acompanhamento.$.peso': req.body.peso
        }
      }).exec().then(
        (engorda) => {
          atualizarPesoDoAnimalPeloAcompanhamento(engorda, req.body, res)
        },
        (err) => {
          console.log(err)
          res.sendStatus(500)
        }
      )
    } else {
      Engorda.findByIdAndUpdate(idEngorda, {
        $push: {
          'acompanhamento': req.body
        }
      }).then((engorda) => {
        atualizarPesoDoAnimalPeloAcompanhamento(engorda, req.body, res)
      }, (err) => {
        console.log(err)
        res.sendStatus(500)
      })
    }
  }

  atualizarPesoDoAnimalPeloAcompanhamento = (engorda, acompanhamentoAtual, res) => {
    if (acompanhamentoAtual._id) { //se ja houver um registro de engorda, entra aqui
      engorda.acompanhamento.map((aux) => {
        if (aux._id == acompanhamentoAtual._id) {
          Animal.findOneAndUpdate({
            _id: engorda.animal,
            'peso.data': aux.data
          }, {
            'peso.$.data': acompanhamentoAtual.data,
            'peso.$.valor': acompanhamentoAtual.peso
          }).exec().then(
            (animal) => {
              res.json(engorda)
            },
            (err) => {
              console.log(err)
              res.sendStatus(500)
            }
          )
        }
      })
    } else { // se nao, adiciona uma nova
      Animal.findByIdAndUpdate(engorda.animal, {
        $push: {
          peso: {
            valor: acompanhamentoAtual.peso,
            data: acompanhamentoAtual.data
          }
        }
      }).exec().then(
        (bezerro) => {
          res.json(engorda)
        },
        (err) => {
          console.log(err)
          res.sendStatus(500)
        }
      )
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
    }).then(() => {
      res.json(200)
    }, (err) => {
      console.log(err)
      res.sendStatus(500)
    })
  }

  return controller
}
