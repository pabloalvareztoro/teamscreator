var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var FistNameSchema = new Schema({
    name: String
});

var SecondNameSchema = new Schema({
    name: String
});

module.exports = {
    firstName: mongoose.model('firstname', FistNameSchema),
    secondName: mongoose.model('secondname', SecondNameSchema)
}