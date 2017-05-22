let mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

module.exports = () => {
    let schema = mongoose.Schema({
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
        semen: {
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
                type: Date
            },
            tipo: {
                type: String
            },
            estado: {
                type: Boolean,
                default: false
            }
        }]
    })

    return mongoose.model('Cobertura', schema, 'coberturas')
}
