(function(){
window.onload = function(){
	game.imgReady();
}
var game = window.game = {
	windowSize: getPageSize(),
	windowWidth: 0,//取屏幕宽度
	windowHeight: 0,//取屏幕高度
	imgPeo: new Image(),//小萝莉图片
	imgSun: new Image(),//太阳图片
	imgMoney: new Image(),//钱
	imgLen: 2,//所有图片总数
	imgNum: 0,//记录图片加载数量,
	lastTime: 0,
	deltaTime: 0,

	gameStart:null,//start
	gameEnd:null,//end
	canvas: null,//canvas
	ctx: null,//canvas 2d
	rectangle: null,//各个建筑
	girl: null,//小萝莉
	bridge: null,//桥
	die: null,//掉下去的动画
	fireworks: null,//提示成功效果
	score: null,//得分
	back: null,//背景

	imgReady:function(){
		this.imgPeo.src = 'images/people.png';
		this.imgLoad(this.imgPeo);
		this.imgSun.src = 'images/sun.png';
		this.imgLoad(this.imgSun);
	},
	imgLoad:function(obj){
		var that = this;
		obj.onload = function(){
			that.imgNum++;
			if(that.imgNum == that.imgLen) that.initStage();
		}
	},
	initStage:function(){
		this.canvas = document.getElementById('canvas');
		this.ctx = this.canvas.getContext("2d");
		this.windowWidth = this.windowSize[0];
		this.windowHeight = this.windowSize[1];
		this.canvas.width = this.windowWidth;
		this.canvas.height = this.windowHeight;

		this.start = document.getElementById('start');
		this.end = document.getElementById('end');
		this.total = this.end.getElementsByTagName('span')[0];

		this.rectangle = new this.drawRectangle();
		this.girl = new this.drawGirl();
		this.bridge = new this.drawBridge();
		this.die = new this.drawDie();
		this.score = new this.drawScore();
		this.fireworks = new this.drawFireworks();
		this.back = new this.drawBack();

		this.rectangle.init();
		this.girl.init();
		this.bridge.init();
		this.gameLoop();
		this.die.init();
		this.fireworks.init();
		this.score.init();

		this.bindFun();

		this.start.addEventListener('click',this.gameStart,false);
		this.end.addEventListener('click',this.gameReset.bind(this),false);
	},
	gameStart:function(){
		this.className += ' hid';
	},
	gameEnd:function(){
		this.end.className = 'back';
		this.total.innerText = '总分 : ' + this.score.num; 
	},
	gameReset:function(){
		this.end.className = 'back hid';
		this.rectangle.init();
		this.girl.init();
		this.bridge.init();
		this.die.init();
		this.score.init();
		this.bindFun();
	},
	bindFun:function(){
		var that = this;
		var touchStart = function(ev){
			that.touchStart(ev);
		}
		var touchEnd = function(ev){
			that.touchEnd(ev);
		}
		this.canvas.addEventListener("touchstart",touchStart,false);
		this.canvas.addEventListener("touchend",touchEnd,false);
		this.canvas.addEventListener("touchend",function(ev){
			that.canvas.removeEventListener('touchstart', touchStart, false);
			that.canvas.removeEventListener('touchend', touchEnd, false);
		});
	},
	arrayRemove:function(array){//删除数组内元素
		array.splice(0,array.length);
	},
	twoTine:function(x1,x2,y1,y2){//两点间距离公式
		return Math.abs(Math.sqrt(Math.pow((x1-x2),2) + Math.pow((y1-y2),2)))
	},
	lineDraw:function(method,array,color,angle,width){//method区分fill和stroke 其余如英文意思
		if(color){
			this.ctx.fillStyle = color;
			this.ctx.strokeStyle = color;
		}
		if(width)this.ctx.lineWidth = width;
		if(angle)this.ctx.rotate(angle*Math.PI/180);
		this.ctx.beginPath();
		this.ctx.moveTo(array[0].x, array[0].y);
		for(var i = 1;i < array.length;i++){
			this.ctx.lineTo(array[i].x, array[i].y);
		}
		this.ctx.closePath();
		method == 0 ? this.ctx.fill() : this.ctx.stroke();
	},
	allMove:function(num){
		for(var i = 0;i < this.rectangle.rectangle.length;i++){
			this.rectangle.rectangle[i].x -= num;
		}
		this.bridge.x -= num;
		this.girl.x -= num;
	},
	gameLoop:function(){//启动定时器
		var that = this;
		(function loop(){
			window.requestAnimFrame(loop);
			var now = Date.now();
			that.deltaTime = now - that.lastTime;
			if(that.deltaTime>40)that.deltaTime = 40;
			that.lastTime = now;
			that.ctx.clearRect(0,0,that.windowWidth,that.windowHeight);

			that.rectangle.draw();
			that.bridge.draw();
			that.die.draw();
			that.fireworks.draw();
			that.score.draw();
			that.back.draw();
			that.girl.draw();

		})();
	},
	touchStart:function(e){
		event.preventDefault();
		this.bridge.touchFlag = true;
		this.bridge.angleFlag = false;
	},
	touchEnd:function(e){
		event.preventDefault();
		var hBig = this.rectangle.rectangle[1].bigC;
		var hSml = this.rectangle.rectangle[1].smallC;
		this.bridge.half = (hBig - hSml) / 2;
		this.bridge.touchFlag = false;
		this.bridge.angleFlag = true;
		if(this.bridge.h >= hSml && this.bridge.h <= hBig){
			this.bridge.win = true;
			this.score.addFlag = true;
		}else{
			this.girl.runWid = this.girl.runWid / (this.girl.runLine / this.bridge.h);
		}
	}
}

})();