var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = function() {
    var schema = mongoose.Schema({
        data: {
            type: Date,
            default: Date.now
        }
    });

    return mongoose.model('Compra', schema, 'compras');
};
