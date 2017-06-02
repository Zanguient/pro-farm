var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

module.exports = () => {
  var schema = mongoose.Schema({
    animal: {
      type: mongoose.Schema.ObjectId,
      ref: "Animal",
      required: true
    },
    lote: {
      type: mongoose.Schema.ObjectId,
      ref: "Lote",
      default: null
    },
    funcionario: {
      type: mongoose.Schema.ObjectId,
      ref: "Funcionario",
      default: null
    },
    data: {
      type: Date,
      default: Date.now
    },
    observacao: {
      type: String,
      default: undefined
    },
    produtosAplicados: [{
      type: String,
      default: null
    }]
  })

  return mongoose.model('Sanidade', schema, 'sanidades')
}
