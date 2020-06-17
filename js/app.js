function RestaurentDB() {
    this.db = localStorage

    this.init = function () {
        var res = localStorage.getItem('Restaurent')
        if (!res) {
            this.updateDB([])
        }
    }

    this.updateDB = function (data) {
        this.db.setItem('Restaurent', JSON.stringify(data))
    }

    this.all = function () {
        this.init()
        return JSON.parse(this.db.getItem('Restaurent'))
    }
}

RestaurentDB.prototype.create = function (item) {
    var Restaurents = this.all()
    if (Restaurents.length > 0) {
        var lastID = Restaurents[Restaurents.length - 1]['id']
    } else {
        var lastID = 0
    }
    var id = Number(lastID) + 1
    item['id'] = id
    Restaurents.push(item)
    this.updateDB(Restaurents)
    return id
}

RestaurentDB.prototype.get = function (id) {
    var restaurents = this.all()

    for (var i = 0; i < restaurents.length; i++) {
        if (restaurents[i].id == id) {
            return restaurents[i]
        }
    }
}

RestaurentDB.prototype.update = function (id, data) {
    var res = this.all()

    for (var i = 0; i < res.length; i++) {
        if (res[i].id == id) {
            data.id = id
            res[i] = data
            this.updateDB(res)
            return id
        }
    }
}

function UserDB() {
    this.db = localStorage

    this.init = function () {
        var res = localStorage.getItem('Users')
        if (!res) {
            this.updateDB([])
        }
    }

    this.updateDB = function (data) {
        this.db.setItem('Users', JSON.stringify(data))
    }

    this.all = function () {
        this.init()
        return JSON.parse(this.db.getItem('Users'))
    }
}

UserDB.prototype.create = function (item) {
    var Users = this.all()
    if (Users.length > 0) {
        var lastID = Users[Users.length - 1]['id']
    } else {
        var lastID = 0
    }
    var id = Number(lastID) + 1
    item['id'] = id
    Users.push(item)
    this.updateDB(Users)
    return id
}

UserDB.prototype.get = function (email) {
    var Users = this.all()

    for (var i = 0; i < Users.length; i++) {
        if (Users[i].email == email) {
            return Users[i]
        }
    }
}

function LoggedDB() {
    this.db = localStorage

    this.init = function () {
        var res = localStorage.getItem('Logged')
        if (!res) { 
            this.updateDB({})
        }
    }

    this.updateDB = function (data) {
        this.db.setItem('Logged', JSON.stringify(data))
    }
}

LoggedDB.prototype.get = function () {
    this.init()
    return JSON.parse(this.db.getItem('Logged'))
}

LoggedDB.prototype.create = function (item) {
    this.init()
    this.updateDB(item)
}


var Restaurent = new RestaurentDB()
var User = new UserDB()
var Logged = new LoggedDB()

