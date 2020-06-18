window.onload = function () {
    Logged.delete()
    // Cart.delete()
    this.setTimeout(function () {
        location.href = 'restaurents.html'
    }, 1000)
    this.Cart.updateDB([])
}