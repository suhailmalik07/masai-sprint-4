window.onload = function () {
    if (!isAdmin()) {
        location.href = '../index.html'
    }

    this.document.getElementById('addRestaurentForm').addEventListener('submit', this.addRestaurent)
    this.document.getElementById('paginationUL').addEventListener('click', changePage)
    this.document.getElementById('addDishModel').addEventListener('submit', this.addDish)
    this.isEditOrList()
}

function isEditOrList() {
    var tmp = new URLSearchParams(location.search)
    var id = Number(tmp.get('restaurent'))
    if (id) {
        renderEditDOM(id)
    } else {
        renderDOM()
    }
}


function addRestaurent() {
    event.preventDefault()
    var formData = new FormData(event.target)

    var data = {}
    formData.forEach(function (value, key) {
        data[key] = value
    })
    Restaurent.create(data)
    renderDOM()
}

function addDish() {
    event.preventDefault()
    var formData = new FormData(event.target)
    var tmp = new URLSearchParams(location.search)
    var id = Number(tmp.get('restaurent'))

    var data = {}
    formData.forEach(function (value, key) {
        data[key] = value
    })
    var restaurent = Restaurent.get(id)
    // console.log(restaurent)
    if (restaurent) {
        if (!restaurent.dishes) {
            restaurent.dishes = []
        }
        restaurent.dishes.push(data)

        var restaurents = Restaurent.all();
        for (var i = 0; i < restaurents.length; i++) {
            if (restaurents[i].id == id) {
                restaurents[i] = restaurent
            }
        }
        Restaurent.updateDB(restaurents)

        renderEditDOM(id)
    } else {
        renderError()
    }
}

function renderDOM(page) {
    var page = page || 1
    // render restaurents
    var res = Restaurent.all().reverse()
    renderRestaurents(res.slice((page - 1) * 10, page * 10))


    // render Pagination
    var totalPage = Math.ceil(res.length / 10)
    var pagination = createPagination(page, totalPage)
    renderPagination(pagination)
}

function renderRestaurents(res) {
    var target = document.getElementById('res')
    target.innerHTML = ""

    var row = document.createElement('div')
    row.className = 'row'
    for (var i = 0; i < res.length; i++) {
        var card = createRestaurentCard(res[i])
        row.appendChild(card)
    }
    target.appendChild(row)
}

function renderPagination(pagination) {
    var target = document.getElementById('paginationUL')
    target.innerHTML = ""
    target.appendChild(pagination)

}

function changePage() {
    if (Number(event.target.id)) {
        renderDOM(Number(event.target.id))
    }
}

function renderEditDOM(id) {
    addBtn = document.getElementById('addBtn').style.display = 'none'
    var target = document.getElementById('restaurentDetails')
    var res = Restaurent.get(id)
    // console.log(res)
    var card = createRestaurentDetails(res)
    target.innerHTML = card

    // dishes render 
    var target = document.getElementById('dishes')
    target.innerHTML = ""
    if (res.dishes) {
        var dishes = createDishes(res.dishes)
        target.appendChild(dishes)
    }
}

function createRestaurentDetails(res) {
    var t = '<div class="col-12 col-md-4 col-lg-4 p-4">' +
        '<div class="card">' +
        '<img src="http://via.placeholder.com/320" alt="">' +
        '</div>' +
        '</div>' +
        '<div class="col-12 col-md-8 col-lg-8 p-4">' +
        '<div class="card border-0">' +
        `<h3>${res.name}</h3>`
    if (res.type == 'veg') {
        t += '<p class="card-text mb-1 text-success"><span>&#8226;</span> Veg</p>'
    } else {
        t += '<p class="card-text mb-1 text-danger"><span>&#8226;</span> Non-Veg</p>'
    }


    t += '<label for="phone" class="text-muted mb-0">Phone No:</label>' +
        `<p class="phone mt-0">${res.phone}</p>` +
        '' +
        '<label for="address" class="text-muted mb-0">Address:</label>' +
        `<p class="address mt-0">${res.location}</p>` +
        '' +
        '<label for="description" class="text-muted mb-0">Description: </label>' +
        `<p class="description mt-0">${res.description}</p>` +
        '<div>' +
        '<button class="btn btn-primary" data-toggle="modal" data-target="#addDishModel">Add Dish</button>' +
        '</div>' +
        '</div>' +
        '</div>'

    return t
}

function createDishes(res) {
    var frag = document.createDocumentFragment()

    for (var i = 0; i < res.length; i++) {
        var card = createDish(res[i])
        frag.appendChild(card)
    }
    return frag
}

function createDish(res) {
    var cont = document.createElement('div')
    cont.className = 'col-12 mt-2'
    var t =
        '<div class="card" id="1">' +
        '<div class="row">' +
        '<div class="col-2">' +
        '<img src="http://via.placeholder.com/120" class="img-fluid" alt="Dish image">' +
        '</div>' +
        '<div class="col-10 p-4">' +
        '<div class="d-flex justify-content-between">' +
        `<h5 class="mb-1">${res.name}</h5>` +
        `<p class="text-success mb-1">$ ${res.price}</p>` +
        '</div>'

    if (res.type == 'veg') {
        t += '<p class="card-text mb-1 text-success"><span>&#8226;</span> Veg</p>'
    } else {
        t += '<p class="card-text mb-1 text-danger"><span>&#8226;</span> Non-Veg</p>'
    }
    t += '</div>' +
        '</div>' +
        '</div>'

    cont.innerHTML = t
    return cont
}