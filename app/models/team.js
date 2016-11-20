function Team(name){
    this.name = name;
}

function createTeams(res, number, firstnameres, secondnameres){
    var firstNameList = getNameList(number, firstnameres);
    var secondNameList = getNameList(number, secondnameres);

    if(number == 1){
        res.json(createTeam(firstNameList[0], secondNameList[0]))
    } else {
        var teamList = [];
        for(var i=0; i<number; i++){
            teamList[i] = createTeam(firstNameList[i], secondNameList[i])
        }
        res.json(teamList);
    }
}

function createTeam(firstName, secondName){
    return new Team(firstName.name + " " + secondName.name);
}

function getNameList(number, res){
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
    createTeams: function(res, number, firstnameres, secondnameres){
        return createTeams(res, number, firstnameres, secondnameres)
    }
};