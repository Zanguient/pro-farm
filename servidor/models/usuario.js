let mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

module.exports = () => {
    let schema = mongoose.Schema({
        nome: {
            type: String,
            required: true
        },
        sobrenome: {
            type: String,
            required: true
        },
        username: {
            type: String,
            required: true
        },
        email: {
          type: String,
          required: true
        },
        password: {
            type: String,
            required: true
        },
        token: {
            type: String
        },
        role: {
            type: String,
            required: true
        },
        ativo: {
            type: Boolean,
            default: false
        },
        superior: {
            usuario: {
                type: mongoose.Schema.ObjectId,
                ref: "Usuario"
            },
            propriedade: {
                type: mongoose.Schema.ObjectId,
                ref: "Propriedade"
            }
        }
    })
    
    return mongoose.model('Usuario', schema, 'usuarios')
}
