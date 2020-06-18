window.onload = function () {
    var items = Cart.all()
    if (items.length == 0) {
        location.href = 'restaurents.html'
    } else {
        order()
    }
}

function order() {
    var user = Logged.get()
    var userEmail = user.email

    var users = User.all()

    for (var i = 0; i < users.length; i++) {
        var user = users[i]
        if (user.email == userEmail) {
            if (!user.orders) {
                user.orders = []
            }
            user.orders.push(Cart.all())
            users[i] = user
        }
    }

    var resID = Cart.all()[0].resID
    console.log(resID)
    var restaurents = Restaurent.all()

    for (var i = 0; i < restaurents.length; i++) {
        var restaurent = restaurents[i]
        if (restaurent.id == resID) {
            if (!restaurent.orders) {
                restaurent.orders = []
            }
            restaurent.orders.push(Cart.all())
            restaurents[i] = restaurent
        }
    }


    Restaurent.updateDB(restaurents)
    User.updateDB(users)
    Cart.updateDB([])

    setTimeout(function () {
        location.href = 'orders.html'
    }, 1000)
}