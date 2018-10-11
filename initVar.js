//定义游戏场景 广场 宽度系数 和 高度系数
var xLen=25;
var yLen=25;

//每个方格的宽度
var squareWidth=20;

//🐍移动时间间隔
var moveTime=300;

//广场位置
var baseX=200;
var baseY=100;

//定义基类
function Square (x,y,width,height,dom){
    this.x=x||0;
    this.y=y||0;
    this.width=width||0;
    this.height=height||0;
    this.viewContent=dom||document.createElement("div")
}
Square.prototype.upDate = function (x, y) {
    this.x = x;
    this.y = y;
    this.viewContent.style.left = x * squareWidth + "px";
    this.viewContent.style.top = y * squareWidth + "px";
}
//定义子类
var Floor = tool.extends(Square)
var Stone = tool.extends(Square)
var SnakeBody = tool.extends(Square)
var SnakeHead = tool.single(Square)
var Snake = tool.single(Square)
var Food = tool.single(Square)
var Ground = tool.single(Square)
var Game = tool.single()

//定义策略
var strategies={
    move:"move",
    die:"die",
    eat:"eat"
}
