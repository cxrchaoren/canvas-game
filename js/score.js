(function(ns){

var drawScore = ns.drawScore = function(){}
drawScore.prototype.init = function(){
	this.x = 20;
	this.y = 40;
	this.num = 0;
	this.addFlag = false;
}
drawScore.prototype.draw = function(){
	ns.ctx.save();
	ns.ctx.fillStyle = '#000';
	ns.ctx.font = '20px Microsoft YaHei';
	ns.ctx.fillText('总分 : '+ this.num,this.x,this.y);
	ns.ctx.restore();
}

})(window.game);