function RealTeam(name){
    this.name = name;
}

function createRealTeams(res, number, realTeam){
    var realTeamList = getRealTeamList(number, realTeam);

    var jsonRealTeamList = [];
    for(var i=0; i<number; i++){
        jsonRealTeamList[i] = new RealTeam(realTeamList[i].name)
    }
    res.json(jsonRealTeamList);
}

function getRealTeamList(number, res){
    var list = [];
    for(var i=0; i < number; i++){
        list[i] = takeRandomElementFromList(res, res.length - i-1)
    }
    return list;
}

function takeRandomElementFromList(list, pivot){
    randomNumber = getRandomInt(pivot);
    var element = list[randomNumber];
    list[randomNumber] = list[pivot];
    list[pivot] = element;
    return element;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * (max + 1));
}

module.exports = {
    createRealTeams: function(res, number, realTeam){
        return createRealTeams(res, number, realTeam)
    }
};