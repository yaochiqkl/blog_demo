/**
 * ------------------------------------------------------------------
 * 垂直滚动组件
 * 实现循环滚动，滚动完延迟和悬停的功能
 * 
 * @version  1.0
 * @date     2016-02-02
 * @author   lishuangzhuang<hzlishuangzhuang@corp.netease.com>
 * ------------------------------------------------------------------
 */
var scroll = (function(){
	/**
	 * 滚动组件初始化
	 *
	 * 首先会有delay的延迟，之后开始由speed决定的速度向上滚动lh的px
	 *
	 * @param    {string}  selector    需要滚动的目标元素节点
	 * @param    {number}    lh        每次滚动的高度（单位：px）
	 * @param    {number}   speed      速度，越小越快
	 * @param    {number}   delay      滚动完的延迟（单位：ms）
	 * @returns   void
	 *
	 */
	var scrollInit = function(selector,lh,speed,delay){ 
		var t = null; 
		var o = document.querySelector(selector);
		var h = false;
		o.onmouseover = function() {
			h = true;
		};
		o.onmouseout = function() {
			h = false;
		};
		function start(){ 
			t = setInterval(scrolling,speed); 
			if (!h ) {
				o.scrollTop += 1;	
			} 
		} 
		function scrolling(){ 
			if(o.scrollTop%lh !== 0){
				o.scrollTop += 1; 
				if(o.scrollTop >= 384){
					o.scrollTop = 0;
				} 
			} else {
				clearInterval(t); 
				setTimeout(start,delay); 
			} 
		} 
		setTimeout(start,delay); 
	};
	return {
		scrollInit: scrollInit
	};
})();
