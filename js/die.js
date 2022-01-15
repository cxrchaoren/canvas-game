(function (ns){

var drawDie = ns.drawDie = function(){}
drawDie.prototype.init = function(){
	this.x = 30;
	this.timer = 0;
	this.run = 0;
	this.zero = 1;
}
drawDie.prototype.draw = function(){
	if(ns.girl.die){
		if(this.timer < this.x){
			this.timer++;
			this.run = this.run + ns.deltaTime * this.zero;
			if(this.run > 50){
				this.run = 0;
				ns.girl.peo++;
				if(ns.girl.peo > 11)ns.girl.peo = 0;
			}
			ns.girl.x = ns.girl.x + 1;
		}else{
			ns.girl.y+=10;
			this.zero = 0;
			if(ns.girl.y > ns.windowHeight){
				ns.girl.die = false;
				ns.gameEnd();
			}
		}
	}
}

})(window.game);