var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RealTeamSchema = new Schema({
    name: String,
    league: String
});

module.exports = {
    realTeam: mongoose.model('realteam', RealTeamSchema)
}