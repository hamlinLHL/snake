var ground = new Ground(baseX, baseY, xLen * squareWidth, yLen * squareWidth)
ground.init = function () {
    this.viewContent.style.position = "absolute";
    this.viewContent.style.left = this.x + "px";
    this.viewContent.style.top = this.y + "px";
    this.viewContent.style.width = this.width + "px";
    this.viewContent.style.height = this.height + "px";
    this.viewContent.style.backgroundColor = "#0f0";
    document.body.appendChild(this.viewContent)
    //填充广场
    //二维数组
    this.squareTable=[]
    for(var i = 0; i < yLen; i++){
        this.squareTable[i]=[]
        for(var j = 0; j < xLen; j++){
            if(i==0||i==yLen-1||j==0||j==xLen-1){
                //生成障碍物
                var newSquare=Squarefactory.create("Stone",j,i,"black")
            }else{
                //生成地板
                var newSquare = Squarefactory.create("Floor",j,i,"#eee")
            }
            this.squareTable[i][j]=newSquare
            this.viewContent.appendChild(newSquare.viewContent)
        }
    }

}
ground.remove=function(x,y){
    this.squareTable[y][x].viewContent.remove();
    this.squareTable[y][x]=null;
}
ground.append=function(square){
    // console.log(square)
    this.squareTable[square.y][square.x] = square;
    this.viewContent.appendChild(square.viewContent)
}
ground.init()
