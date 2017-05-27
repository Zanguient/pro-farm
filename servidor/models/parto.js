let mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

module.exports = () => {
    let schema = mongoose.Schema({
        cobertura: {
            type: mongoose.Schema.ObjectId,
            ref: "Cobertura",
            required: true
        },
        animal: {
            type: mongoose.Schema.ObjectId,
            ref: "Animal",
            required: true
        },
        data: {
            type: Date,
            default: Date.now
        },
        primeiro: {
            type: Boolean,
            default: false
        },
        intervalo_parto_anterior: {
            type: String,
            default: undefined
        }
    })

    return mongoose.model('Parto', schema, 'partos')
}
