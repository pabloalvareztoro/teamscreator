module.exports =
{
    getTeams: function (number) {
        return new League(number).getTeams()
    }
}

function League(number) {
    this.number = number;

    this.getTeams = function () {
        var teamsList = [];
        for (var i = 0; i < number; i++) {
            teamsList[i] = new Team("equipo" + i);
        }
        return teamsList;
    }
}

function Team(name) {
    this.name = name;
}