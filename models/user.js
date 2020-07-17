const fs = require('fs');

let users = [];
function joinUser(socketId, userName, roomName) {
    const user = {
        socketID :  socketId,
        username : userName,
        roomname : roomName
    }
    users.push(user)
    return user;
}

function removeUser(id) {
    const getID = users => users.socketID === id;
    const index =  users.findIndex(getID);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
}

class User {
    constructor(username, login, password) {
        this.username = username;
        this.login = login;
        this.password = password;
    }
    check() {
        let data = fs.readFileSync("../data/users.json", 'utf-8');
        let users = JSON.parse(data);
        for (let i = 0; i < users.length; i++) {
            if (this.login === users[i].login) return true;
        }
        return false
    }
    save() {
        let data = fs.readFileSync("../data/users.json", 'utf-8');
        let users = JSON.parse(data);
        users.push(this);
        let json = JSON.stringify(users);
        fs.writeFileSync("../data/users.json", json);
    }
}

module.exports = {
    User,
    joinUser,
    removeUser
};