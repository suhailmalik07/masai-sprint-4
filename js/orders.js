window.onload = function () {
    show()
}

function show() {
    var res = document.getElementById('res')

    var user = Logged.get()
    var userEmail = user.email

    var orders = User.get(0, userEmail).orders.reverse()
    var tt = createList(orders)
    res.appendChild(tt)
}

function createList(orders) {
    var frag = document.createDocumentFragment()

    for (var i = 0; i < orders.length; i++) {
        var tap = createOrderCart(orders[i])
        frag.appendChild(tap)
    }
    return frag
}

function createOrderCart(items) {
    var ul = document.createElement('ul')
    var totalBill = 0

    for (var i = 0; i < items.length; i++) {
        var itemPriceTotal = items[i].qty * items[i].price
        var elem = document.createElement('li')
        elem.className = 'list-group-item d-flex justify-content-between'


        var t = `<span>${items[i].name} <span class="text-muted ml-2">${items[i].qty}</span></span>` +
            `<span class="text-success text-right font-weight-bold">$ ${itemPriceTotal}</span>`

        elem.innerHTML = t
        ul.appendChild(elem, document.createElement('hr'))
        totalBill += itemPriceTotal
    }

    var total = document.createElement('li')
    total.className = "list-group-item d-flex justify-content-between"
    var t = `<span>Total </span> <span
            class="text-success text-right font-weight-bold">$ ${totalBill}</span>`
    total.innerHTML = t

    ul.appendChild(total)
    return ul
}