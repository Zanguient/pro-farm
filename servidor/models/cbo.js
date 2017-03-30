let mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

module.exports = () => {
    let schema = mongoose.Schema({
        codigo: { //reprodutor
            type: Number,
            required: true
        },
        descricao: { //reprodutor
            type: String,
            required: true
        }
    })

    return mongoose.model('Cbo', schema, 'cbos')
}
