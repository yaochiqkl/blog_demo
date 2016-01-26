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
	function hasClass(obj, cls) {  
	    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));  
	} 
	function removeClass(obj, cls) {  
	    if (hasClass(obj, cls)) {  
	        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');  
	        obj.className = obj.className.replace(reg, ' ');  
	    }  
	}
	function addClass(obj, cls) {  
	    if (!hasClass(obj, cls)) obj.className += " " + cls;  
	}  
	function getDateT()
	{
		var d,s;
		d = new Date();
		s = 1900 + d.getYear() + "-";             //取年份
		s = s + (d.getMonth() + 1) + "-";//取月份
		s += d.getDate() + " ";         //取日期
		s += d.getHours() + ":";       //取小时
		s += d.getMinutes() + ":";    //取分
		s += d.getSeconds();         //取秒
		return(s);  
	} 
	return {
		doGet: doGet,
		removeClass: removeClass,
		addClass: addClass,
		getDateT: getDateT
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
			if (this.innerHTML == "日志") {
				utils.addClass(document.querySelector(".m-label"),"f-dn");
				utils.removeClass(document.querySelector(".m-ipt"),"f-dn");
				utils.removeClass(document.querySelector(".m-ctt"),"f-dn");
			} else {
				utils.removeClass(document.querySelector(".m-label"),"f-dn");
				utils.addClass(document.querySelector(".m-ipt"),"f-dn");
				utils.addClass(document.querySelector(".m-ctt"),"f-dn");
			}
		};
		for (var i = 0; i < ls.length; i++) {
			ls[i].onclick = menuClick;  
		}

	};

	var insertBlogs = function(){
		var html = '';
		for( var i = 0; i < data.length; i++){
			var piece = '<div class="slt">\
                        <input type="checkbox" class="f-fl">\
                        <div class="content">\
                            <div class="f-cr2">'
                            +((data[i].allowView=="10000")?'<img class="icon-private" src="img/private.jpg" alt="">':'')
                            +data[i].title+'</div>\
                            <div>\
                                <span class="time">'+data[i].shortPublishDateStr+' '+data[i].publishTimeStr+'</span>\
                                <span class="read">阅读'+data[i].accessCount+'</span>\
                                <span class="comment">评论'+data[i].commentCount+'</span>\
                            </div>\
                        </div>\
                        <div class="more">\
                            <ul>\
                                更多<a class="rct f-fr"></a>\
                                <li><a class="dlt-single">删除</a></li>\
                                <li><a class="top">顶置</a></li>\
                            </ul>\
                        </div>\
                        <a class="edt  f-cr2">编辑</a>\
                    </div>';
            html += piece;
		}
        document.querySelector(".m-ctt .mn").innerHTML = html ;
	};
	var blogsRegBtn = function(){
		//更多选项的删除顶置选项
		var dlt = document.querySelectorAll(".m-ctt .dlt-single");
		var dltClick = function(){
			var child = this.parentNode.parentNode.parentNode.parentNode;
			child.parentNode.removeChild(child);
		};
		for (var i = 0; i < dlt.length; i++) {
			dlt[i].onclick = dltClick;  
		}
		var top = document.querySelectorAll(".m-ctt .top");
		var topClick = function(){
			var child = this.parentNode.parentNode.parentNode.parentNode;
			child.parentNode.removeChild(child);
			var theFirstChild = document.querySelector(".m-ctt .slt");
			theFirstChild.parentNode.insertBefore(child, theFirstChild);
		};
		for (var j = 0; j < top.length; j++) {
			top[j].onclick = topClick;  
		}
	};
	var allRegBtn = function(){
		//全选删除模块
		document.querySelector(".all").onclick = function(){
			var ls = document.querySelectorAll(".m-ctt .mn input[type=checkbox]");
			if (this.checked){
				for( var i = 0; i < ls.length; i++){
				ls[i].checked = true;
				}
			} else {
				for( var j = 0; j < ls.length; j++){
				ls[j].checked = false;
				}
			}
		};
		document.querySelector(".dlt").onclick = function(){
			var ls = document.querySelectorAll(".m-ctt .mn input[type=checkbox]");
			for( var i = 0; i < ls.length; i++){
			 if(ls[i].checked === true){
			 	var child = ls[i].parentNode;
				child.parentNode.removeChild(child);
			 }
			}
		};
		//日志发布模块
		var title = document.querySelector(".m-ipt .tt");
		var textarea = document.querySelector(".m-ipt textarea");
		var clear = document.querySelector(".m-ipt .clear");
		var release = document.querySelector(".m-ipt .release");
		title.onfocus = function(){
			if(this.value === "日志标题"){
				this.value = "";
			}
		};
		title.onblur = function(){
			if (this.value === "") {
				this.value = "日志标题";
			}
		};
		clear.onclick = function(){
			textarea.value="";
		};
		release.onclick = function(){
			if ( title.value === '日志标题') {
				alert("请输入标题");
			} else if (textarea.value === '' ) {
				alert("请输入内容");
			} else {
				var slt = document.createElement('div');
				slt.innerHTML = '<input type="checkbox" class="f-fl">\
                        <div class="content">\
                            <div class="f-cr2">'+title.value+'</div>\
                            <div>\
                                <span class="time">'+utils.getDateT()+'</span>\
                                <span class="read">阅读0</span>\
                                <span class="comment">评论0</span>\
                            </div>\
                        </div>\
                        <div class="more">\
                            <ul>\
                                更多<a class="rct f-fr"></a>\
                                <li><a class="dlt-single">删除</a></li>\
                                <li><a class="top">顶置</a></li>\
                            </ul>\
                        </div>\
                        <a class="edt  f-cr2">编辑</a>'
				utils.addClass(slt,"slt");
				//document.querySelector(".m-ctt .mn").appendChild(slt);
				var theFirstChild = document.querySelector(".m-ctt .slt");
				theFirstChild.parentNode.insertBefore(slt, theFirstChild);
				//更新点击事件，更优的解决方案是事件代理，暂时搁置
				pageInit.blogsRegBtn();
				pageInit.allRegBtn();
			}
			/*var piece = '<div class="slt">\
                        <input type="checkbox" class="f-fl">\
                        <div class="content">\
                            <div class="f-cr2">'+data[i].title+'</div>\
                            <div>\
                                <span class="time">'+data[i].shortPublishDateStr+' '+data[i].publishTimeStr+'</span>\
                                <span class="read">阅读'+data[i].accessCount+'</span>\
                                <span class="comment">评论'+data[i].commentCount+'</span>\
                            </div>\
                        </div>\
                        <div class="more">\
                            <ul>\
                                更多<a class="rct f-fr"></a>\
                                <li><a class="dlt-single">删除</a></li>\
                                <li><a class="top">顶置</a></li>\
                            </ul>\
                        </div>\
                        <a class="edt  f-cr2">编辑</a>\
                    </div>';*/
		};
	};
	var scrollInit = function(lh,speed,delay){ 
		var t; 
		var o=document.querySelector(".m-sd2 .content");
		function start(){ 
			t=setInterval(scrolling,speed); 
			o.scrollTop += 1;
		} 
		function scrolling(){ 
			if(o.scrollTop%lh !== 0){
				o.scrollTop += 1; 
			} else {
				clearInterval(t); 
				setTimeout(start,delay); 
			} 
		} 
		setTimeout(start,delay); 
	};
	return {
		regBtn: regBtn,
		regBtn2: regBtn2,
		insertBlogs: insertBlogs,
		blogsRegBtn: blogsRegBtn,
		allRegBtn: allRegBtn,
		scrollInit: scrollInit
	};
})();


	pageInit.insertBlogs();
window.onload = function(){
	pageInit.regBtn();
	pageInit.regBtn2();
	pageInit.blogsRegBtn();
	pageInit.allRegBtn();
	pageInit.scrollInit(48,30,2000);
};



