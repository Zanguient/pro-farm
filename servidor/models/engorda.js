var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = function() {
    var schema = mongoose.Schema({
        recria: {
            type: mongoose.Schema.ObjectId,
            ref: "Recria",
            required: true
        },
        data: {
            type: Date,
            default: Date.now
        },
        tipo: {
            pasto: {
                type: Boolean,
                default: false
            },
            semiconfinamento: {
                type: Boolean,
                default: false
            },
            confinamento: {
                type: Boolean,
                default: false
            }
        },
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
    });

    return mongoose.model('Engorda', schema, 'engordas');
};
