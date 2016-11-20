var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FistNameSchema = new Schema({
    name: String
});

module.exports = mongoose.model('firstname', FistNameSchema);