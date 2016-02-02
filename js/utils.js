/**
 *------------------------------------------------------------------
 * 工具类函数库
 * GET请求、类名增减、排序、递归获取父节点
 * 
 * @version 1.0
 * @date    2016-02-02
 * @author  lishuangzhuang<hzlishuangzhuang@corp.netease.com>
 * ------------------------------------------------------------------
 */
var utils = (function(){
	/**
	*	Ajax请求GET方法
	*	@param {string} url 请求的地址
	*	@return  void
	*/
	var commom_url = "http://fed.hz.netease.com/api/";
	var doGet = function(url) {
		var xmlHttp;
		var createxmlHttpRequest = function(){
			if(window.ActiveXObject){
				xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
			}else if(window.XMLHttpRequest)
				xmlHttp=new XMLHttpRequest();
		};
		//createxmlHttpRequest();
		xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET",commom_url + url);
		var data = "test=asd";
		xmlHttp.send(data);
		xmlHttp.onreadystatechange=function(){
			if(xmlHttp.readyState==4 && xmlHttp.status==200){
				alert('success');
			}else{
				alert('fail');
			}
		};
	};
	/**
	 * 增减类名的实现
	 *
	 * @param   {node}   obj   修改类名的DOM节点
	 * @param  {string}  cls   className
	 * @return   void
	 */
	var hasClass = function(obj, cls) {  
	    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
	};
	var removeClass = function(obj, cls) {  
	    if (hasClass(obj, cls)) {  
	        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
	        obj.className = obj.className.replace(reg, ' ');  
	    }  
	};
	var addClass = function(obj, cls) {  
	    if (!hasClass(obj, cls)) obj.className += " " + cls;  
	};
	/**
	 *	格式化获取时间
	 *	
	 *	@param : void
	 *	@return : {string}  如"2016-02-02 14:42"
	 */
	var getDateT = function() {
		var d,s;
		d = new Date();
		s = 1900 + d.getYear() + "-";            
		s = s + (d.getMonth() + 1) + "-";
		s += d.getDate() + " ";        
		s += d.getHours() + ":";      
		s += d.getMinutes() + ":";    
		s += d.getSeconds();        
		return(s);  
	};
	/**
	*	直接插入排序，直接修改原数组，降序
	*	
	*	@param  {array}  array  需要排序的数组
	*	@param  {string} param  比较大小的目标属性
	*	@return {array}
	*/
	var insertSort = function(array,param){
		//直接插入排序
		var x = param;
		if (! (array instanceof Array)) {
			alert("Not Array!");
			return;
		}
		var A = array;
		var key = null;
		var i = null;
		//点表示法不支持通过变量来访问属性，故使用方括号表示法
		for (var j = 1; j< A.length; j++) {
			key = A[j];
			i = j - 1;
			while( i > -1 && A[i][param] < key[param]){
				A[i+1] = A[i];
				i--;
			}
			A[i+1] = key;
		}
	};

	/**
	*	递归获取父节点
	*	@param    {node}  elem   子节点
	*	@param   {number}  n     向上递归的次数
	*	@return   {node}         目标节点
	*/
	var getNtnParent = function(elem,n) {
		return n === 0 ? elem : arguments.callee(elem.parentNode, n - 1);
	};
	return {
		doGet: doGet,
		removeClass: removeClass,
		addClass: addClass,
		getDateT: getDateT,
		sort: insertSort,
		getNtnParent: getNtnParent
	};
})();