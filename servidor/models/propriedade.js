let mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

module.exports = () => {
    let schema = mongoose.Schema({
        usuario: {
            type: mongoose.Schema.ObjectId,
            ref: "Usuario",
            required: true
        },
        criado_em: {
            type: Date,
            default: Date.now
        },
        nome: {
            type: String,
            required: true
        },
        extensao: {
            type: Number,
            default: true
        },
        cidade: {
            type: String,
            required: true
        },
        estado: {
            type: String,
            required: true
        },
        latitude: {
            type: Number
        },
        longitude: {
            type: Number
        },
        ativo: {
            type: Boolean,
            default: true
        }
    })

    return mongoose.model('Propriedade', schema, 'propriedades')
}
