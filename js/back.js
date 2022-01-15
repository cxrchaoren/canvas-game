(function(ns){

var drawBack = ns.drawBack = function(){
	this.sunW = 100;
	this.sunX = ns.windowWidth - 60;
	this.sunY = 60;
	this.angle = 0;
}
drawBack.prototype.draw = function(){
	this.angle += 1;
	if(this.angle > 360)this.angle = 0;
	ns.ctx.save();
	ns.ctx.translate(this.sunX,this.sunY);
	ns.ctx.rotate(this.angle*Math.PI/180);
	ns.ctx.drawImage(ns.imgSun,-this.sunW/2,-this.sunW/2,this.sunW,this.sunW);
	ns.ctx.restore();
}

})(window.game);