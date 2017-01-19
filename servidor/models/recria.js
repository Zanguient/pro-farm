var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = function() {
    var schema = mongoose.Schema({
        bezerro: {
            type: mongoose.Schema.ObjectId,
            ref: "Bezerro",
            required: true
        },
        data: {
            type: Date,
            default: Date.now
        },
        ganho_peso_medio: {
            type: Number,
            default: null
        },
        peso_entrada: {
            type: Number,
            required: true
        },
        peso_saida: {
            type: String,
            default: null
        }
    });

    return mongoose.model('Recria', schema, 'recrias');
};
