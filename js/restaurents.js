window.onload = function () {
    this.renderDOM()
    this.renderNavAtoUser()

    this.document.getElementById('paginationUL').addEventListener('click', changePage)
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