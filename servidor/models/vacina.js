var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

module.exports = () => {
    var schema = mongoose.Schema({
        propriedade: {
            type: mongoose.Schema.ObjectId,
            ref: "Propriedade",
            default: null
        },
        produto: [{
            type: mongoose.Schema.ObjectId,
            ref: "Produto",
            required: true
        }],
        inicio: {
            type: Date,
            default: null
        },
        fim: {
            type: Date,
            default: null
        },
        observacao: {
            type: String,
            default: undefined
        },
        nome: {
            type: String,
            required: true
        },
        admin: {
            type: Boolean,
            default: false
        }
    })

    return mongoose.model('Vacina', schema, 'vacinas')
}
