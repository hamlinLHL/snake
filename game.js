var game = new Game()
game.score = 0;
game.timer = null;
game.init = function () {
    ground.init();
    snake.init();
    createFood()
    var th = throatle(cb, 1000)
    document.onkeydown = function (e) {
        th(e)
    }
    //e.which 37左  38上  39右 40下
}
function createFood() {
    var x, y, flag = true;
    while (flag) {
        x = Math.floor(1 + Math.random() * 23)
        y = Math.floor(1 + Math.random() * 23)
        var ok = true
        for (var i = snake.head; i.next != null; i = i.next) {
            if (x == i.x && y == i.y) {
                ok = false;
                break;
            }
        }
        if (ok) {
            flag = false
        }
    }
    var food = Squarefactory.create("Food", x, y, "red")
    ground.remove(x, y)
    ground.append(food)
}
function throatle(fn, wait) {
    var fir = 0
    return function (e) {
        var last = new Date().getTime()
        if (last - fir > wait) {
            fn.apply(this, arguments)
            fir = last
        }

    }
}

function cb(e) {
    console.log(this, e)
    switch (e.which) {
        case 37:
            snake.direction = snake.direction == dirPosition.right ? dirPosition.right : dirPosition.left;
            break;
        case 38:
            snake.direction = snake.direction == dirPosition.down ? dirPosition.down : dirPosition.top;
            break;
        case 39:
            snake.direction = snake.direction == dirPosition.left ? dirPosition.left : dirPosition.right;
            break;
        case 40:
            snake.direction = snake.direction == dirPosition.top ? dirPosition.top : dirPosition.down;
            break;
    }
}
game.start = function () {
    game.timer = setInterval(function () {
        snake.move()
    }, moveTime)
}
game.over = function () {
    clearInterval(game.timer)
    alert(game.score)
}
game.init();