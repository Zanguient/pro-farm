var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = function() {
    var schema = mongoose.Schema({
        propriedade: { //geral
            type: mongoose.Schema.ObjectId,
            ref: "Propriedade",
            required: true
        },
        acao: {
          type: String,
          required: true
        },
        data: {
            type: Date,
            default: Date.now
        },
        codigo: {
            type: String,
            default: undefined
        },
        produtosRelacionados: [{
          type: mongoose.Schema.ObjectId,
          ref: "Produto",
          default: null
        }]
    });

    return mongoose.model('Lote', schema, 'lotes');
};
