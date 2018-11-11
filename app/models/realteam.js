var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RealTeamSchema = new Schema({
    _id: { type: String, default: uuid.v1 },
    name: String,
    league: String,
    city: String,
    country: String,
    stadium: String
});

module.exports = {
    realTeam: mongoose.model('realteam', RealTeamSchema)
}