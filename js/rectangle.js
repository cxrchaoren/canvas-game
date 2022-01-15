(function(ns){

var drawRectangle = ns.drawRectangle = function(){}
drawRectangle.prototype.init = function(){
	this.len = 3;//建筑默认同屏个数
	this.nextX = 100;//默认下次随机开始的x
	this.oldX = 0;//记录上一个建筑的x 这里是第一个
	this.oldY = ns.windowHeight - 200;//默认上一个建筑的y 这里是第一个
	this.oldH = 200;//默认上一个高度 这里是第一个
	this.bigFlag = [];//记录下一个建筑是 上坡还是下坡还是平的 0平 1上 2下
	this.angleNum = 180 / Math.PI;//π是3.14 是180度 每一度所对应的π值 用于计算上坡和下坡的度数
	this.index = 0;//每个建筑的下标
	this.rectangle = [];//建筑的数组里面包含所有构成建筑的元素
	this.pointArray = [{//每个建筑中间小白点的宽度和高度
		'x': 2.5,
		'y': -5,
	},{
		'x': 2.5,
		'y': 5
	}];
	for(var i = 0;i < this.len;i++){
		if(i == 0){
			this.bigFlag.push(0);
			this.pushArray(0,ns.windowHeight-200,ns.windowHeight-200,100,200,0,0,90);
			this.nextX = 100;
		}else{
			this.randomArray(i);
		}
	}
}
drawRectangle.prototype.pushArray = function(x,y,y2,w,h,small,big,angle){
	this.rectangle.push({
		'x':x,//障碍为x坐标
		'y':y,//障碍物y坐标
		'y2':y2,//障碍物三角定点坐标
		'w':w,//障碍物宽度
		'h':h,//障碍物高度
		'smallC':small,//两个障碍物之间的距离
		'bigC':big,//两个障碍物之间到定点的距离
		'angle':angle//桥倒下的角度
	})
}
drawRectangle.prototype.randomArray = function(index){
	var h = 0;
	var x = Math.floor(Math.random()*40) + 150 + this.nextX;
	var w = Math.floor(Math.random()*30) + 50;
	var y = 0;
	if(Math.random() > 0.7){
		y = this.oldY;
		h = this.oldH;
	}else{
		h = Math.floor(Math.random()*100);
		y = ns.windowHeight - (h + 250);
	}//是否出现平地
	var c = ns.twoTine(this.nextX,x,this.oldY,y);//计算前一个建筑物右上角 到现在建筑物左上角所构成的直角三角形的长边距离 这个三角形看成一个小三角形 c就是小的直角三角形的长边
	var newX = x + w - this.nextX;//计算前一个建筑物结束位置 到 右边建筑物结束位置的距离 这个距离就是桥延长之后形成的大的直角三角形
	var newM = newX / (x - this.nextX);//计算大的直角三角形的底边 是 小的直角三角形底边的 几倍
	var newC = c * newM - c;//已知倍数 小直角三角形长边 求出大直角三角形的长边
	var y2 = 0;
	var angle = 0;
	if(this.oldH < (ns.windowHeight - y)){
		this.bigFlag.push(1);
	}else if(this.oldH > (ns.windowHeight - y)){
		this.bigFlag.push(2);
	}else{
		this.bigFlag.push(0)
	}//两个建筑物高度对比 得出上下坡 用bigFlag记录
	if(this.bigFlag[index] == 1){
		y2 = y - Math.abs(Math.sqrt(Math.pow(newC,2) - Math.pow(w,2)))//两点间距离公式反推出 侧边的长度 根据y坐标算出三角形顶点坐标
		angle = Math.asin((x - this.nextX)/c) * this.angleNum;//通过反正弦值 乘以angleNum  计算出 桥要旋转的度数 
	}else if(this.bigFlag[index] == 2){
		y2 = y + Math.abs(Math.sqrt(Math.pow(newC,2) - Math.pow(w,2)))//两点间距离公式反推出 侧边的长度 根据y坐标算出三角形顶点坐标
		angle = (Math.asin((y-this.oldY)/c)+90*Math.PI/180) * this.angleNum;//通过反正弦值 乘以angleNum  计算出 桥要旋转的度数 
	}else{
		y2 = y;
		angle = 90;
	}
	this.pushArray(x,y,y2,w,h + 250,c,c*newM,angle);
	this.nextX = w + x;
	this.oldX = x;
	this.oldY = y2;
	this.oldH = ns.windowHeight - y2;
}
drawRectangle.prototype.draw = function(){
	for(var i = 0;i < this.len;i++){
		var x = this.rectangle[i].x;
		var y = this.rectangle[i].y;
		var w = this.rectangle[i].w;
		var y2 = this.rectangle[i].y2;

		var trigonArray_01 = [{//上坡绘制三角形的轨迹
			'x': x,
			'y': y
		},{
			'x': x + w,
			'y': y
		},{
			'x': x + w,
			'y': y2
		}];

		var trigonArray_02 = [{//下坡绘制三角形的轨迹
			'x': x,
			'y': y
		},{
			'x': x,
			'y': y2
		},{
			'x': x,
			'y': y2 + 5
		},{
			'x': x + w,
			'y': y2 + 5
		},{
			'x': x + w,
			'y': y2
		}]

		var middle_x = 0;
		var middle_y = 0;
		middle_x = w / 2 + x;
		this.bigFlag[i] != 0 ? middle_y = y - (y - y2) / 2 : middle_y = y;

		ns.ctx.save();
		ns.ctx.fillStyle = "#000";
		ns.ctx.fillRect(x, y, w, this.rectangle[i].h);
		ns.ctx.restore();

		ns.ctx.save();
		if(this.bigFlag[i] == 1){
			ns.lineDraw(0,trigonArray_01,'#000');
		}else if(this.bigFlag[i] == 2){
			ns.ctx.clearRect(x, y, w, y2 - y);
			ns.lineDraw(0,trigonArray_02,'#000');
		}
		ns.ctx.restore();
		ns.ctx.save();
		ns.ctx.translate(middle_x,middle_y);
		ns.lineDraw(1,this.pointArray,'#fff',this.rectangle[i].angle,5);
		ns.ctx.restore();
	}
}

})(window.game);