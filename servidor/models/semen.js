let mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

module.exports = () => {
    let schema = mongoose.Schema({
        usuario: { //geral
            type: mongoose.Schema.ObjectId,
            ref: "Usuario"
        },
        animal: { //geral
            type: mongoose.Schema.ObjectId,
            ref: "Animal"
        },
        raca: {
            type: String,
            required: true
        },
        nome_touro: {
            type: String,
            required: true
        },
        fornecedor: {
            type: String,
            required: true
        }
    })

    return mongoose.model('Semen', schema, 'semens')
}
