let mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

module.exports = () => {
    let schema = mongoose.Schema({
        propriedade: { //geral
            type: mongoose.Schema.ObjectId,
            ref: "Propriedade",
            required: true
        },
        morte: { //geral
            type: mongoose.Schema.ObjectId,
            ref: "Morte",
            default: null
        },
        parto: { //para bezerro
            type: mongoose.Schema.ObjectId,
            ref: "Parto"
        },
        compra: { //geral
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
        venda: { //geral
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
        codigo: { //geral
            type: String,
            required: true
        },
        nascimento: { //geral
            type: Date,
            default: Date.now
        },
        sexo: { //geral
            type: String,
            required: true
        },
        relacao_desmama: { //bezerro
            peso: {
                type: Number,
                default: null
            },
            resultado: {
                type: Number,
                default: null
            }
        },
        peso_entrada: {
            type: Number,
            default: null
        },
        peso: [{ //geral
            valor: {
                type: Number,
                required: true
            },
            data: {
                type: Date,
                default: Date.now
            }
        }],
        ultima_relacao_desmama: { //reprodutoras
            type: Number
        },
        idade_primeiro_parto: { //reprodutoras
            type: Number
        },
        intervalo_entre_partos: { //reprodutoras
            type: Number
        },
        ultimo_intervalo_entre_partos: { //reprodutoras
            type: Number
        },
        machos: [{
            type: mongoose.Schema.ObjectId,
            ref: "Animal"
        }],
        femeas: [{
            type: mongoose.Schema.ObjectId,
            ref: "Animal"
        }],
        raca: { //reprodutor
            type: String
        },
        nome: { //reprodutor
            type: String
        },
        idade: { //reprodutor
            type: Number
        },
        touro: { //geral
            type: Boolean,
            default: false
        }
    })

    return mongoose.model('Animal', schema, 'animais')
}
