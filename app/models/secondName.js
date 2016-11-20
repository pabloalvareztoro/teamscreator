var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SecondNameSchema = new Schema({
    name: String
});

module.exports = mongoose.model('secondname', SecondNameSchema);