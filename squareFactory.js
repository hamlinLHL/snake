function Squarefactory(){

}
Squarefactory.create=function(type,x,y,color){
    if (Squarefactory.prototype[type]==undefined){
        throw "no this type"
    }
    if (Squarefactory.prototype[type].prototype.__proto__ != Squarefactory.prototype){
        Squarefactory.prototype[type].prototype=new Squarefactory()
    }
    var newSquare=new Squarefactory.prototype[type](x,y,color)
    return newSquare
}
Squarefactory.prototype.init=function(square,color,strategyMsg){
    square.viewContent.style.position="absolute";
    square.viewContent.style.left = square.x * squareWidth + "px";
    square.viewContent.style.top = square.y * squareWidth + "px";
    square.viewContent.style.width = square.width + "px";
    square.viewContent.style.height = square.height + "px";
    square.viewContent.style.backgroundColor=color;
    square.touch = function(){
        return strategyMsg
    }
}
Squarefactory.prototype.Stone = function (x, y, color) {
    var stone=new Stone(x,y,squareWidth,squareWidth)
    this.init(stone,color,strategies.die)
    return stone
}
Squarefactory.prototype.Floor = function (x, y, color) {
    var floor = new Floor(x, y, squareWidth, squareWidth)
    this.init(floor, color, strategies.move)
    return floor
}
Squarefactory.prototype.Food = function (x, y, color) {
    var food = new Food(x, y, squareWidth, squareWidth)
    this.init(food, color, strategies.eat)
    food.upDate(x,y)
    return food
}
Squarefactory.prototype.SnakeHead = function (x, y, color) {
    var snakeHead = new SnakeHead(x, y, squareWidth, squareWidth)
    this.init(snakeHead, color, strategies.die)
    snakeHead.upDate(x,y)
    return snakeHead
}
Squarefactory.prototype.SnakeBody = function (x, y, color) {
    var snakeBody = new SnakeBody(x, y, squareWidth, squareWidth)
    this.init(snakeBody, color, strategies.die)
    return snakeBody
}