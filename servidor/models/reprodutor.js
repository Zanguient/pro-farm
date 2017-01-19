var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

module.exports = () => {
    var schema = mongoose.Schema({
        propriedade: {
            type: mongoose.Schema.ObjectId,
            ref: "Propriedade",
            required: true
        },
        morte: {
            type: mongoose.Schema.ObjectId,
            ref: "Morte",
            default: null
        },
        compra: {
            id: {
                type: mongoose.Schema.ObjectId,
                ref: "Compra",
                default: null
            },
            peso: {
                type: Number,
                default: null
            },
            valor: {
                type: Number,
                default: null
            }
        },
        venda: {
            id: {
                type: mongoose.Schema.ObjectId,
                ref: "Venda",
                default: null
            },
            peso: {
                type: Number,
                default: null
            },
            valor: {
                type: Number,
                default: null
            }
        },
        codigo: {
            type: String,
            required: true
        },
        nascimento: {
            type: Date,
            default: Date.now
        },
        raca: {
            type: String,
            required: true
        },
        nome: {
            type: String,
            default: undefined
        },
        idade: {
            type: Number,
            default: null
        },
        peso_entrada: {
            type: Number,
            default: null
        }
    })

    return mongoose.model('Reprodutor', schema, 'reprodutores')
}
