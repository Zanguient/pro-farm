let mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

module.exports = () => {
    let schema = mongoose.Schema({
        data: {
            type: Date,
            default: Date.now
        },
        motivo: {
          type: mongoose.Schema.ObjectId,
          ref: "Doenca",
          required: true
        },
        obs: {
            type: String,
            default: null
        }
    })

    return mongoose.model('Morte', schema, 'mortes')
}
