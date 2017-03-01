var mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

module.exports = () => {
    var schema = mongoose.Schema({
        animal: {
            type: mongoose.Schema.ObjectId,
            ref: "Animal",
            required: true
        },
        data: {
            type: Date,
            default: Date.now
        },
        tipo: [{
            type: String
        }],
        peso_entrada: {
            type: Number,
            required: true
        },
        peso_saida: {
            type: String,
            default: null
        },
        acompanhamento: [{
            data: {
                type: Date,
                default: Date.now
            },
            peso: {
                type: Number,
                required: true
            }
        }]
    })

    return mongoose.model('Engorda', schema, 'engordas')
}
