var snake = new Snake()
snake.head = null;
snake.tail = null;
var dirPosition = {
    left: {
        x: -1,
        y: 0
    },
    right: {
        x: 1,
        y: 0
    },
    top: {
        x: 0,
        y: -1
    },
    down: {
        x: 0,
        y: 1
    }
}
snake.init = function () {
    //创建蛇头和蛇身
    var snakeHead = Squarefactory.create("SnakeHead", 3, 1, "blue")
    var snakeBody1 = Squarefactory.create("SnakeBody", 2, 1, "deeppink")
    var snakeBody2 = Squarefactory.create("SnakeBody", 1, 1, " deeppink")
    //创建双向链表
    this.head = snakeHead
    this.tail = snakeBody2

    snakeHead.pre = null;
    snakeHead.next = snakeBody1;

    snakeBody1.pre = snakeHead;
    snakeBody1.next = snakeBody2;

    snakeBody2.pre = snakeBody1;
    snakeBody2.next = null;

    //show snake
    ground.remove(snakeHead.x, snakeHead.y);
    ground.append(snakeHead)

    ground.remove(snakeBody1.x, snakeBody1.y);
    ground.append(snakeBody1)

    ground.remove(snakeBody2.x, snakeBody2.y);
    ground.append(snakeBody2)
}
snake.direction = dirPosition.right
//不同的策略封装不同的函数
snake.stratigies = {
    move: function (square,fromEat) {
        //创建一个新的body
        var newBody = Squarefactory.create("SnakeBody", snake.head.x, snake.head.y, "deeppink")
        newBody.next = snake.head.next;
        newBody.next.pre = newBody;
        newBody.pre = null;

        //渲染蛇身
        ground.remove(snake.head.x, snake.head.y)
        ground.append(newBody)

        //新的蛇头
        var newHead = Squarefactory.create("SnakeHead", square.x, square.y, "blue")
        newHead.next = newBody;
        newHead.next.pre = newHead;
        newHead.pre = null;

        //渲染蛇头
        ground.remove(square.x, square.y)
        ground.append(newHead)
        
        if(!fromEat){
            //删尾巴，补地板
            var newFloor = Squarefactory.create("Floor", snake.tail.x, snake.tail.y, "#eee")
            ground.remove(snake.tail.x, snake.tail.y)
            ground.append(newFloor)
            snake.tail = snake.tail.pre
        }

        //跟新尾巴和头部
        snake.head = newHead;
    },
    eat: function (square) {
        this.move(square,true)
        game.score++
        createFood()
    },
    die: function (square) {
        game.over()
    }
}
snake.move = function () {
    var square = ground.squareTable[this.head.y + this.direction.y][this.head.x + this.direction.x]
    if (typeof square.touch == "function") {
        this.stratigies[square.touch()](square)
    }
}
// snake.init()