window.onload = function () {
    this.document.querySelector('form').addEventListener('submit', login)
}

function login() {
    event.preventDefault()
    var data = new FormData(event.target)

    var email = data.get('email')
    var password = data.get('password')

    var currUser = User.get(id = 0, email = email)
    console.log(currUser)

    if (!currUser || (currUser.password != password)) {
        renderError()
        return
    }

    Logged.create(currUser)
    if (currUser.isAdmin) {
        location.href = 'admin.html'
    }
    location.href = 'restaurents.html'
}

function renderError(a) {
    console.log('user not found')
}