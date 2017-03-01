var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = function() {
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
        data_saida: {
            type: Date
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
