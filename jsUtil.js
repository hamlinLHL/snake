//工具方法
tool={
    inherit:function(target,origin){
        target.prototype=Object.create(origin.prototype)
        target.prototype.constructor=target
    },
    extends:function(origin){
        var result=function(){
            origin.apply(this,arguments)
        };
        this.inherit(result,origin)
        return result
    },
    single:function(origin){
        var singleResult=(function(){
            var instance=null
            return function(){
                if(instance){
                    return instance
                }else{
                    origin&&origin.apply(this,arguments)
                    instance=this
                }
            }
        })()
        origin&&this.inherit(singleResult,origin)
        return singleResult
    }
}
// function Square(x,y,width,height){
//     this.x=x;
//     this.y=y;
//     this.width=width;
//     this.height=height;
// }
// Square.prototype.touch=function(){
//     console.log(111)
// }
// var Food=tool.single(Square)
// var f1=new Food(10,20,200,100);
// var f2=new Food(20,20,200,200);