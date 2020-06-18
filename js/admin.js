window.onload = function () {
    if (!isAdmin()) {
        location.href = '../index.html'
    }

    this.document.getElementById('addRestaurentForm').addEventListener('submit', this.addRestaurent)
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

function renderDOM() {
    var res = Restaurent.all().reverse()
    renderRestaurents(res)
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
