var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = function() {
    var schema = mongoose.Schema({
        cobertura: {
            type: mongoose.Schema.ObjectId,
            ref: "Cobertura",
            required: true
        },
        data: {
            type: Date,
            default: Date.now
        },
        peso_reprodutora_desmama: {
            type: Number,
            default: null
        },
        intervalo_parto_anterior: {
            type: Number,
            default: null
        }
    });

    return mongoose.model('Lote', schema, 'lotes');
};
