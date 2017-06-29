let mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

module.exports = () => {
    let schema = mongoose.Schema({
        nome: { 
            type: String,
            required: true
        }
    })

    return mongoose.model('Doenca', schema, 'doencas')
}
