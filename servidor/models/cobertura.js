var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

module.exports = function() {
    var schema = mongoose.Schema({
        reprodutora: {
            type: mongoose.Schema.ObjectId,
            ref: "Reprodutora",
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
        funcionario: {
            type: mongoose.Schema.ObjectId,
            ref: "Semen",
            default: null
        },
        data: {
            type: Date,
            default: Date.now
        },
        data_final: {
            type: Date,
            default: null
        },
        tipo: {
            type: String,
            required: true
        },
        aborto: {
            type: Boolean,
            default: false
        },
        peso_entrada: {
            type: Number,
            default: null
        },
        diagnostico: [{
            data: {
                type: Date,
                default: Date.now
            },
            tipo: {
                type: String,
                default: null
            },
            estado: {
                type: Boolean,
                default: false
            }
        }]
    })

    return mongoose.model('Cobertura', schema, 'coberturas')
}
