window.requestAnimFrame = (function() {
	//return返回一个function,根据浏览器的类型,比如webkit,去返回,如果不是,就是用setTimeout,设定一个帧率
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();

/**  
*  
* @param x1 第一个矩形的X 坐标  
* @param y1 第一个矩形的Y 坐标  
* @param w1 第一个矩形的宽  
* @param h1 第一个矩形的高  
* @param x2 第二个矩形的X 坐标  
* @param y2 第二个矩形的Y 坐标  
* @param w2 第二个矩形的宽  
* @param h2 第二个矩形的高  
* @return  
*/  
function isCollsionWithRect(x1,y1,w1,h1,x2,y2,w2,h2){  
x1 = x1 - w1*0.5;
x2 = x2 - w2*0.5;
//当矩形1 位于矩形2 的左侧
if (x1 >= x2 && x1 >= x2 + w2) {  
return false;  
//当矩形1 位于矩形2 的右侧  
} else if (x1 <= x2 && x1 + w1 <= x2) {  
return false;  
//当矩形1 位于矩形2 的上方  
} else if (y1 >= y2 && y1 >= y2 + h2) {  
return false;  
//当矩形1 位于矩形2 的下方  
} else if (y1 <= y2 && y1 + h1 <= y2) {  
return false;  
}  
//所有不会发生碰撞都不满足时，肯定就是碰撞了  
return true;  
}

/*两个坐标点之间的距离的平方*/
function calLength2(x1, y1, x2, y2) {
	return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
}

/*取屏幕高度宽度*/
function getPageSize() {
	var xScroll, yScroll;
	if (window.innerHeight && window.scrollMaxY) {
		xScroll = window.innerWidth + window.scrollMaxX;
		yScroll = window.innerHeight + window.scrollMaxY;
	} else {
		if (document.body.scrollHeight > document.body.offsetHeight) { // all but Explorer Mac    
			xScroll = document.body.scrollWidth;
			yScroll = document.body.scrollHeight;
		} else { // Explorer Mac...would also work in Explorer 6 Strict, Mozilla and Safari    
			xScroll = document.body.offsetWidth;
			yScroll = document.body.offsetHeight;
		}
	}
	var windowWidth, windowHeight;
	if (self.innerHeight) { // all except Explorer    
		if (document.documentElement.clientWidth) {
			windowWidth = document.documentElement.clientWidth;
		} else {
			windowWidth = self.innerWidth;
		}
		windowHeight = self.innerHeight;
	} else {
		if (document.documentElement && document.documentElement.clientHeight) { // Explorer 6 Strict Mode    
			windowWidth = document.documentElement.clientWidth;
			windowHeight = document.documentElement.clientHeight;
		} else {
			if (document.body) { // other Explorers    
				windowWidth = document.body.clientWidth;
				windowHeight = document.body.clientHeight;
			}
		}
	}       
	// for small pages with total height less then height of the viewport    
	if (yScroll < windowHeight) {
		pageHeight = windowHeight;
	} else {
		pageHeight = yScroll;
	}    
	// for small pages with total width less then width of the viewport    
	if (xScroll < windowWidth) {
		pageWidth = xScroll;
	} else {
		pageWidth = windowWidth;
	}
	arrayPageSize = new Array(pageWidth, pageHeight, windowWidth, windowHeight);
	return arrayPageSize;
}

function randomColor() {
	var col = [0, 1, 2];
	col[0] = Math.random() * 100 + 155;
	col[0] = col[0].toFixed();
	col[1] = Math.random() * 100 + 155;
	col[1] = col[1].toFixed();
	col[2] = Math.random() * 100 + 155;
	col[2] = col[2].toFixed();
	var num = Math.floor(Math.random() * 3);
	col[num] = 0;
	return "rgba(" + col[0] + "," + col[1] + "," + col[2] + ",";
}

/*
	趋于角度转换
*/
function lerpAngle(a, b, t) {
	var d = b - a;
	if (d > Math.PI) d = d - 2 * Math.PI;
	if (d < -Math.PI) d = d + 2 * Math.PI;
	return a + d * t;
}

/*
	aim是目标值;
	cur是当前值;
	ratio是百分比;
	delta是目标与当前之间的距离;
*/
function lerpDistance(aim, cur, ratio) {
	var delta = cur - aim;
	return aim + delta * ratio;
}

function inOboundary(arrX, arrY, l, r, t, b) { //在l r t b范围内的检测
	return arrX > l && arrX < r && arrY > t && arrY < b;
}

function rgbColor(r, g, b) {
	r = Math.round(r * 256);
	g = Math.round(g * 256);
	b = Math.round(b * 256);
	return "rgba(" + r + "," + g + "," + b + ",1)";
}

function rgbNum(r, g, b) {
	r = Math.round(r * 256);
	g = Math.round(g * 256);
	b = Math.round(b * 256);
	return "rgba(" + r + "," + g + "," + b;
}

function rnd(m) {
	var n = m || 1;
	return Math.random() * n;
}

function rateRandom(m, n) {
	var sum = 0;
	for (var i = 1; i < (n - m); i++) {
		sum += i;

	}

	var ran = Math.random() * sum;

	for (var i = 1; i < (n - m); i++) {
		ran -= i;
		if (ran < 0) {
			return i - 1 + m;
		}
	}
}

function distance(x1, y1, x2, y2, l) {
	var x = Math.abs(x1 - x2);
	var y = Math.abs(y1 - y2);
	if (x < l && y < l) {
		return true;
	}
	return false;
}

function AABBbox(object1, w1, h1, object2, w2, h2, overlap) {
	A1 = object1.x + overlap;
	B1 = object1.x + w1 - overlap;
	C1 = object1.y + overlap;
	D1 = object1.y + h1 - overlap;

	A2 = object2.x + overlap;
	B2 = object2.x + w2 - overlap;
	C2 = object2.y + overlap;
	D2 = object2.y + h2 - overlap;

	if (A1 > B2 || B1 < A2 || C1 > D2 || D1 < C2) return false;
	else return true;
}


function dis2(x, y, x0, y0) {
	var dx = x - x0;
	var dy = y - y0;
	return dx * dx + dy * dy;
}

function rndi2(m, n) {
	var a = Math.random() * (n - m) + m;
	return Math.floor(a);
}

/*抛物线*/