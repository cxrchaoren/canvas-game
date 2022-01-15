(function(ns){

var drawFireworks = ns.drawFireworks = function(){}
drawFireworks.prototype.init = function(){
	this.x = ns.rectangle.rectangle[1].w / 2 + ns.rectangle.rectangle[1].x;
	this.y = ns.rectangle.rectangle[1].y - (ns.rectangle.rectangle[1].y - ns.rectangle.rectangle[1].y2) / 2;
	this.text = 'GOOD !!!~';
	this.alpha = 1;
	this.colorNum = '#ff0';
}
drawFireworks.prototype.draw = function(){
	if(ns.bridge.single && this.alpha > 0){
		this.y-=2;
		this.alpha -= 0.02;
		if(this.alpha < 0)this.alpha = 0;
		ns.ctx.save();
		ns.ctx.fillStyle = this.colorNum;
		ns.ctx.globalAlpha= this.alpha;
		ns.ctx.font = 'bold 40px Arial';
		ns.ctx.fillText(this.text,this.x - 180,this.y);
		ns.ctx.restore();
	}
}

})(window.game);