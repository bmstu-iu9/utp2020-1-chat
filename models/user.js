const fs = require('fs')

class User{
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }
    check(){
        let data = fs.readFileSync("../data/users.json", 'utf-8');
        let users = JSON.parse(data);
        for(let i=0;i<users.length;i++){
            if (this.username === users[i].username) return true;
        }
        return false
    }
    save(){
        let data = fs.readFileSync("../data/users.json", 'utf-8');
        let users = JSON.parse(data);
        users.push(this);
        let json = JSON.stringify(users);
        fs.writeFileSync("../data/users.json", json);
    }
}

module.exports = User;

