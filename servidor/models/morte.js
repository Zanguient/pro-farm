var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

module.exports = function() {
    var schema = mongoose.Schema({
        data: {
            type: Date,
            default: Date.now
        },
        motivo: {
            acidente: {
              type: Boolean,
              default: false
            },
            curso: {
              type: Boolean,
              default: false
            },
            outros: {
              type: Boolean,
              default: false
            }
        },
        obs: {
            type: String,
            default: null
        }
    });

    return mongoose.model('Morte', schema, 'mortes');
};
