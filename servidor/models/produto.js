var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

module.exports = () => {
    var schema = mongoose.Schema({
        propriedade: {
            type: mongoose.Schema.ObjectId,
            ref: "Propriedade",
            default: null
        },
        tipo: {
            type: String,
            required: true
        },
        historico_preco: [{
            valor: {
                type: Number
            },
            data: {
                type: Date
            }
        }],
        periodo_aplicacao: {
            type: String,
            required: true
        },
        indicacao: {
            type: String,
            required: true
        },
        formula: {
            type: String,
            default: undefined
        },
        foto: {
            type: String,
            default: undefined
        },
        dosagem: {
            type: String,
            required: true
        },
        nome: {
            type: String,
            required: true
        },
        empresa: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        bula: {
            type: String,
            default: undefined
        },
        admin: {
            type: Boolean,
            default: false
        }
    })

    return mongoose.model('Produto', schema, 'produtos')
}
