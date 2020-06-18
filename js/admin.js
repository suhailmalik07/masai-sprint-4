window.onload = function () {
    if (!isAdmin()) {
        location.href = '../index.html'
    }

    this.document.getElementById('addRestaurentForm').addEventListener('submit', this.addRestaurent)
    this.document.getElementById('paginationUL').addEventListener('click', changePage)
    this.renderDOM()
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