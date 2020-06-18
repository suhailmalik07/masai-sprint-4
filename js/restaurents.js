window.onload = function () {
    this.isDetailorList()
    this.renderNavAtoUser()
    this.createCartModel()

    this.document.getElementById('paginationUL').addEventListener('click', changePage)
    this.document.getElementById('clearCartBtn').addEventListener('click', clearCart)
}

function isDetailorList() {
    var tmp = new URLSearchParams(location.search)
    var id = Number(tmp.get('restaurent'))
    if (id) {
        renderRestaurentPage(id)
        document.getElementById('searchBar').style.display = 'none'
    } else {
        renderDOM()
    }
}

function renderRestaurentPage(id) {
    var target = document.getElementById('res')
    target.innerHTML = ""
    var res = Restaurent.get(id)
    var dishes = res.dishes

    var page = createRestaurentPage(res)
    target.appendChild(page)
    if (res.dishes) {
        var dishes = createDishesPage(res.dishes)
        target.appendChild(dishes)
    }
}

function createRestaurentPage(res) {
    var card = document.createElement('div')
    card.className = 'card bg-dark text-white mb-3'
    var t = '<div class="row no-gutters">' +
        '<div class="col-md-3 col-lg-2">' +
        '<img src="http://via.placeholder.com/120" class="card-img img-fluid" alt="...">' +
        '</div>' +
        '<div class="col-md-9 col-lg-10">' +
        '<div class="card-body">' +
        `<h4 class="card-title">${res.name}</h4>` +
        `<p class="mb-0">${res.shortDesc}</p>`

    if (res.type == 'veg') {
        t += '<small class="bg-success p-1 px-3 rounded-pill">Veg</small><br>'
    } else {
        t += '<small class="bg-danger p-1 px-3 rounded-pill">Non-Veg</small><br>'
    }
    t += `<small class="text-light">${res.location}</small>` +
        '<small class="border-left ml-2 pl-2"> Ratings: 3.7/5</small>' +
        '</div>' +
        '</div>' +
        '</div>'

    card.innerHTML = t
    return card
}

function createDishesPage(res) {
    var row = document.createElement('div')
    row.className = 'row'
    row.id = 'dishes'
    row.addEventListener('change', addToCart)
    for (var i = 0; i < res.length; i++) {
        var card = document.createElement('div')
        card.className = "col-12 col-md-6 col-lg-4 mt-2 mt-lg-4"

        var t =
            `<div class="card" id=${i}>` +
            '<div class="d-flex flex-md-column">' +
            '<img src="http://via.placeholder.com/240x180" class="img-fluid" alt="...">' +
            '<div class="card-body">' +
            `<h5 class="card-title" id="dish-name">${res[i].name}</h5>`
        if (res[i].type == 'veg') {
            t += '<small class="bg-success p-1 px-3 rounded-pill">Veg</small><br>'
        } else {
            t += '<small class="bg-danger p-1 px-3 rounded-pill">Non-Veg</small><br>'
        }
        t += `<p class="card-text text-success">$ ${res[i].price}</p>` +
            '<input type="number" value="0" min="0" max="100" class="w-100">' +
            '</div>' +
            '</div>' +
            '</div>'

        card.innerHTML = t
        row.appendChild(card)
    }
    return row
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

function createCartModel() {
    var target = document.getElementById('cartItems')
    var frag = document.createDocumentFragment()

    var items = Cart.all()
    var totalBill = 0

    if (items.length == 0) {
        document.getElementById('orderBtn').className += '  disabled'
    }

    for (var i = 0; i < items.length; i++) {
        var itemPriceTotal = items[i].qty * items[i].price
        var elem = document.createElement('li')
        elem.className = 'list-group-item d-flex justify-content-between'


        var t = `<span>${items[i].name} <span class="text-muted ml-2">${items[i].qty}</span></span>` +
            `<span class="text-success text-right font-weight-bold">$ ${itemPriceTotal}</span>`

        elem.innerHTML = t
        frag.appendChild(elem, document.createElement('hr'))
        totalBill += itemPriceTotal

    }
    var total = document.createElement('li')
    total.className = "list-group-item d-flex justify-content-between"
    var t = `<span>Total </span> <span
            class="text-success text-right font-weight-bold">$ ${totalBill}</span>`
    total.innerHTML = t

    frag.appendChild(total)
    target.appendChild(frag)
}



function addToCart() {
    // console.log('yes')
    if (!isUser) {
        alert('You must LogIn First!')
    }
    var dishID = Number(event.target.parentElement.parentElement.parentElement.id)
    var qty = Number(event.target.value)


    var tmp = new URLSearchParams(location.search)
    var resID = Number(tmp.get('restaurent'))


    var dishes = Restaurent.get(resID).dishes
    var dish = dishes[dishID]


    var cartAll = Cart.all()

    var flag = true
    for (var i = 0; i < cartAll.length; i++) {
        var item = cartAll[i]
        if (item.cartId == dishID) {
            item.qty = qty
            cartAll[i] = item
            flag = false
            Cart.updateDB(cartAll)
            renderNavAtoUser()
            return
        }
    }
    if (flag) {
        dish.qty = qty
        dish.resID = resID
        dish.cartId = Number(dishID)
        Cart.create(dish)
        renderNavAtoUser()
        return
    }
    console.log(dishID)

}

function clearCart() {
    Cart.updateDB([])
    location.reload()
}