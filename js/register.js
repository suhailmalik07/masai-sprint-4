window.onload = function () {
    var form = this.document.querySelector('form')
    form.addEventListener('submit', register)
}

function register() {
    event.preventDefault()
    var data = new FormData(event.target)
    var email = data.get('email')
    var password = data.get('password')
    var isAdmin = data.get('isAdmin') && true

    console.log(email, password, isAdmin)
    var tmp = User.create({
        email,
        password,
        isAdmin
    })

    if (Number(tmp)) {
        setTimeout(function () {
            location.href = 'login.html'
        }, 1000)
        showSuccess()
    }
}

function showSuccess() {

}