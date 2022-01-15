(function(ns){

var drawBridge = ns.drawBridge = function(){}
drawBridge.prototype.init = function(){
	this.x = ns.rectangle.rectangle[0].x+ns.rectangle.rectangle[0].w;
	this.y = ns.rectangle.rectangle[0].y2;
	this.h = 0;
	this.angle = 0;
	this.touchFlag = false;
	this.angleFlag = false;
	this.win = false;
	this.single = false;
	this.double = false;
	this.half = 0;
}
drawBridge.prototype.draw = function(){
	ns.ctx.save();
	ns.ctx.translate(this.x,this.y);
	if(this.touchFlag){
		this.h = this.h + 2;	
	}else{
		if(this.angle <= ns.rectangle.rectangle[1].angle && this.angleFlag){
			this.angle++;
			ns.girl.goFlag = false;
		}
		if(this.angle > ns.rectangle.rectangle[1].angle && this.angleFlag){
			this.angle = ns.rectangle.rectangle[1].angle;
			ns.girl.goFlag = true;
			if(this.h >= (this.half - 5 + ns.rectangle.rectangle[1].smallC) && this.h <= (this.half + 5 + ns.rectangle.rectangle[1].smallC)){
				this.double = true;
			}
		}
	}
	var lineArray = [{
			'x': 0,
			'y': 0
		},{
			'x': 0,
			'y': -this.h
		}];
	ns.lineDraw(1,lineArray,'#000',this.angle,3);
	ns.ctx.restore();
}

})(window.game);