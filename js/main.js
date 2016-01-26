var utils = (function(){
	var xmlHttp;
	var commom_url = "http://fed.hz.netease.com/api/";
	function createxmlHttpRequest(){
	if(window.ActiveXObject){
		xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
	}else if(window.XMLHttpRequest)
		xmlHttp=new XMLHttpRequest();
	}
	function doGet(url){
		//createxmlHttpRequest();
		var xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET",commom_url + url);
		xmlHttp.send(null);
		xmlHttp.onreadystatechange=function(){
			if(xmlHttp.readyState==4&&xmlHttp.status==200){
				alert('success');
			}else{
				alert('fail');
			}
		};
	}
	return {
		doGet: doGet,
	};
})();
var pageInit = (function(){
	var regBtn = function(){
		var ls = document.querySelectorAll(".u-lst li");
		var menuClick = function(){
			for (var i = 0; i < ls.length; i++) {
				ls[i].setAttribute("class", "");
			}
			this.setAttribute("class", "active");
		};
		for (var i = 0; i < ls.length; i++) {
			ls[i].onclick = menuClick;  
		}

	};
	var regBtn2 = function(){
		var ls = document.querySelectorAll(".m-tab li");
		var menuClick = function(){
			for (var i = 0; i < ls.length; i++) {
				ls[i].setAttribute("class", "");
			}
			this.setAttribute("class", "active");
		};
		for (var i = 0; i < ls.length; i++) {
			ls[i].onclick = menuClick;  
		}
	};
	return {
		regBtn: regBtn,
		regBtn2: regBtn2,
	};
})();
window.onload = function(){
	//utils.doGet("getblogs");
	pageInit.regBtn();
	pageInit.regBtn2();
};