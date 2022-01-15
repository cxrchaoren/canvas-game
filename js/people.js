(function(ns){

var drawGirl = ns.drawGirl = function(){}
drawGirl.prototype.init = function(){
	this.x = ns.rectangle.rectangle[0].w-30;//初始x
	this.y = ns.rectangle.rectangle[0].y2-100;//初始y
	this.runWid = Math.abs(ns.rectangle.rectangle[1].w + ns.rectangle.rectangle[1].x - ns.rectangle.rectangle[0].w);//小萝莉走路的x坐标宽度
	this.runHei = Math.abs(ns.rectangle.rectangle[1].y2 - ns.rectangle.rectangle[0].y2);//小萝莉走路的y坐标宽度
	this.runLine = ns.twoTine(ns.rectangle.rectangle[0].w - 30,ns.rectangle.rectangle[1].x + ns.rectangle.rectangle[1].w - 30,ns.rectangle.rectangle[0].y2,ns.rectangle.rectangle[1].y2);//小萝莉走路的总长度
	this.runSpd = this.runHei / this.runWid;//小萝莉提高一个y轴坐标点 所需要走的x坐标距离
	this.muKou = -1;//小萝莉走路的方向
	this.timer = 0;//计时器
	this.time = 0;//小萝莉动画的速度
	this.peo = 0;//小萝莉动画的index
	this.allSpd = 0;//小萝莉停下来之后 建筑物 和小女孩本身后退的速度
	this.die = false;//die动画开关
	this.goFlag = false;//小萝莉走路开关
}
drawGirl.prototype.draw = function(){
	if(ns.rectangle.bigFlag[1] == 1){
		this.muKou = -1;
	}else if(ns.rectangle.bigFlag[1] == 2){
		this.muKou = 1;
	}else{
		this.muKou = 0;
	}//判断方向
	ns.ctx.save();
	if(this.goFlag){
		if(ns.score.addFlag){//大桥成功动画开关以及样式还有所加的分数
			ns.bridge.single = true;
			ns.score.addFlag = false;
			ns.score.num++;
			if(ns.bridge.double){
				//upNum.num = 2;
				ns.score.num++;
				ns.fireworks.text = 'PERFECT !!!~';
				ns.fireworks.colorNum = '#f00';
			}
		}
		if(this.timer <= this.runWid){//小萝莉走路开始
			this.timer++;
			this.x++;
			this.time = this.time + ns.deltaTime;
			if(this.time > 50){
				this.time = 0;
				this.peo++;
				if(this.peo>11)this.peo = 0;
			}
			this.y = this.runSpd * this.muKou + this.y; 
		}else{//小萝莉走路结束
			this.goFlag = false;
			if(ns.bridge.win){//搭桥成功画面向左退
				if(this.allSpd < ns.rectangle.rectangle[1].x){
					this.allSpd += 1;	
					ns.allMove(this.allSpd);
				}else{
					this.allSpd = ns.rectangle.rectangle[1].x;
					ns.allMove(this.allSpd);
					ns.rectangle.nextX = ns.rectangle.rectangle[2].x + ns.rectangle.rectangle[2].w;
					ns.rectangle.randomArray(ns.rectangle.len);
					ns.rectangle.rectangle.shift();
					ns.rectangle.bigFlag.shift();
					ns.bridge.init();
					ns.girl.init();
					ns.fireworks.init();
					ns.bindFun();
				}	
			}else{//搭桥失败die动画开启
				this.die = true;
			}
		}
	}
	ns.ctx.drawImage(ns.imgPeo,0,this.peo * 452,256,452,this.x,this.y,64,113);
	ns.ctx.restore();
}

})(window.game);