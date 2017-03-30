let mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

module.exports = () => {
    let schema = mongoose.Schema({
        cargo: { //geral
            type: mongoose.Schema.ObjectId,
            ref: "Cbo",
            required: true
        },
        propriedade: { //geral
            type: mongoose.Schema.ObjectId,
            ref: "Propriedade",
            required: true
        },
        tercerizado: {
            type: Boolean,
            default: false
        },
        empresa: {
            type: String,
            default: undefined
        },
        nome: {
            type: String,
            required: true
        },
        sobrenome: {
            type: String,
            required: true
        },
        nascimento: {
            type: Date,
            default: null
        },
        endereco: {
            type: String,
            default: undefined
        },
        cep: {
            type: String,
            default: undefined
        },
        bairro: {
            type: String,
            default: undefined
        },
        cidade: {
            type: String,
            default: undefined
        },
        estado: {
            type: String,
            default: undefined
        },
        fixo: {
            type: Number
        },
        celular: {
            type: Number
        },
        seg_celular: {
            type: Number
        }
    })

    return mongoose.model('Funcionario', schema, 'funcionarios')
}
