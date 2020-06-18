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

LoggedDB.prototype.delete = function () {
    this.init()
    this.updateDB({})
}


var Restaurent = new RestaurentDB()
var User = new UserDB()
var Logged = new LoggedDB()

function isAdmin() {
    var user = Logged.get()
    return user.isAdmin == true
}

function isUser() {
    var user = Logged.get()
    return user
}


// user name and email according to user logged in or not in navigation bar
function renderNavAtoUser() {
    var target = document.getElementById('navDiv')

    var a = document.createElement('a')
    var a2 = document.createElement('a')
    var user = isUser()

    var frag = document.createDocumentFragment()

    if (user.isAdmin == true) {
        var t = document.createElement('a')
        t.href = 'admin.html'
        t.className = "text-white text-decoration-none mr-4"
        t.innerText = 'Admin Panel'
        frag.appendChild(t)
    }

    if (user.email) {
        target.innerHTML = ""

        a.href = "#"
        a.innerText = user.email.split('@')[0]
        a.className = "text-white text-decoration-none mr-4"

        a2.href = 'logout.html'
        a2.innerText = 'Log out'
        a2.className = "text-white text-decoration-none"
        frag.append(a, a2)
    }
    target.appendChild(frag)
}

// create restaurent CARD
function createRestaurentCard(res) {
    var cont = document.createElement('div')
    cont.className = 'col-12 col-md-6 col-lg-6'

    var t = '<div class="card mb-3 shadow-sm">' +
        '<div class="row no-gutters">' +
        '<div class="col-md-4">' +
        '<img src="http://via.placeholder.com/120" class="card-img" alt="...">' +
        '</div>' +
        '<div class="col-md-8">' +
        '<div class="card-body">' +
        '<h5 class="card-title mb-1"><a href="#">' + res.name + '</a></h5>'

    if (res.type == 'veg') {
        t += '<p class="card-text mb-1 text-success"><span>&#8226;</span> Veg</p>'
    } else {
        t += '<p class="card-text mb-1 text-danger"><span>&#8226;</span> Non-Veg</p>'
    }
    t += '<p class="card-text"><small class="text-muted">Naya Gaav, Delhi</small></p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>'

    cont.innerHTML = t
    return cont
}

function createPagination(page, totalPage) {
    // <li class="page-item"><a class="page-link" href="#">1</a></li>
    var frag = document.createDocumentFragment()
    for (var i = 1; i <= totalPage; i++) {
        var li = document.createElement('li')
        li.className = 'page-item'

        var a = document.createElement('span')
        a.className = 'page-link'
        a.innerText = i
        a.id = i

        if (page == i) {
            li.className = 'page-item active'
        }

        li.appendChild(a)
        frag.appendChild(li)
    }
    return frag
}