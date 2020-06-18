function DB(name) {
    this.db = localStorage
    this.name = name

    this.init = function () {
        var res = localStorage.getItem(this.name)
        if (!res) {
            this.updateDB([])
        }
    }

    this.updateDB = function (data) {
        this.db.setItem(this.name, JSON.stringify(data))
    }

    this.all = function () {
        this.init()
        return JSON.parse(this.db.getItem(this.name))
    }
}

DB.prototype.create = function (item) {
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

DB.prototype.get = function (id, email) {
    var restaurents = this.all()

    if (id) {
        for (var i = 0; i < restaurents.length; i++) {
            if (restaurents[i].id == id) {
                return restaurents[i]
            }
        }
    }
    if (email) {
        // console.log('ey')
        // console.log(restaurents)
        for (var i = 0; i < restaurents.length; i++) {
            // console.log(restaurents[i])
            if (restaurents[i].email == email) {
                return restaurents[i]
            }
        }
    }

}

DB.prototype.update = function (id, data) {
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

function SingleDB(name) {
    this.db = localStorage
    this.name = name

    this.init = function () {
        var res = localStorage.getItem(name)
        if (!res) {
            this.updateDB({})
        }
    }

    this.updateDB = function (data) {
        this.db.setItem(name, JSON.stringify(data))
    }
}

SingleDB.prototype.get = function () {
    this.init()
    return JSON.parse(this.db.getItem(this.name))
}

SingleDB.prototype.create = function (item) {
    this.init()
    this.updateDB(item)
}

SingleDB.prototype.delete = function () {
    this.init()
    this.updateDB({})
}


var Restaurent = new DB('Restaurent')
var User = new DB('Users')
var Logged = new SingleDB('Logged')
var Cart = new DB('Cart')



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
        a.innerText = 'Hi! ' + user.email.split('@')[0]
        a.className = "text-white text-decoration-none mr-4"

        var cart = document.createElement('a')
        cart.className = 'btn text-decoration-none text-white mr-4'
        cart.setAttribute('data-toggle', 'modal')
        cart.setAttribute('data-target', '#cartModal')
        var totalItem = Cart.all().reduce(function(a, c){
            return a + c.qty
        }, 0)
        cart.innerHTML = 'Cart ' + `<span class="badge badge-pill badge-primary">${totalItem}</span>`



        a2.href = 'logout.html'
        a2.innerText = 'Log out'
        a2.className = "text-white text-decoration-none"
        frag.append(a, cart, a2)
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
        `<h5 class="card-title mb-1"><a class='text-dark' href="?restaurent=${res.id}"> ${res.name} </a></h5>`

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
