window.onload = function () {
    this.document.querySelector('form').addEventListener('submit', login)
}

function login() {
    event.preventDefault()
    var data = new FormData(event.target)

    var email = data.get('email')
    var password = data.get('password')

    var currUser = User.get(email)

    if (!currUser || (currUser.password != password)) {
        renderError()
        return
    }

    Logged.create(currUser)
    location.href = 'index.html'
}

function renderError(a) {
    console.log('user not found')
}