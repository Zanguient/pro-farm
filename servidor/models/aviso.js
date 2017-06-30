let mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

module.exports = () => {
    let schema = mongoose.Schema({
        atualizado_em: {
            type: Date,
            default: Date.now
        },
        inicia_em: {
            type: Date,
            required: true
        },
        finaliza_em: {
            type: Date,
            required: true
        },
        concluido: {
            type: Date,
            default: null
        },
        descricao: {
            type: String,
            required: true
        },
        restando: {
            type: String,
            required: true
        },
        ignorar: {
            type: Date,
            default: null
        },
        lote: {
            type: mongoose.Schema.ObjectId,
            ref: "Lote"
        },
        lote: {
            type: mongoose.Schema.ObjectId,
            ref: "Propriedade",
            required: true
        },
        aplicacao: {
            type: mongoose.Schema.ObjectId,
            ref: "Aplicacao"
        },
        rota: {
            type: String,
            default: null
        }
    })

    return mongoose.model('Aviso', schema, 'avisos')
}
