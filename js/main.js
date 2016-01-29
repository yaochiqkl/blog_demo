//工具函数库
var utils = (function(){
	var xmlHttp;
	var commom_url = "http://fed.hz.netease.com/api/";
	var createxmlHttpRequest = function(){
		if(window.ActiveXObject){
			xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
		}else if(window.XMLHttpRequest)
			xmlHttp=new XMLHttpRequest();
	};
	var doGet = function(url) {
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
	};
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
	var getDateT = function()
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
	};
	//直接插入排序
	var insertSort = function(array){
		if (! (array instanceof Array)) {
			console.log("Not Array!");
			return;
		}
		var A = array;
		var key = null;
		var i = null;
		for (var j = 1; j< A.length; j++) {
			key = A[j];
			i = j - 1;
			while( i > -1 && A[i].publishTime < key.publishTime){
				A[i+1] = A[i];
				i--;
			}
			A[i+1] = key;
		}
	};
	return {
		doGet: doGet,
		removeClass: removeClass,
		addClass: addClass,
		getDateT: getDateT,
		sort: insertSort
	};
})();
//页面初始化函数库
var pageInit = (function(){
	var regBtn = function(){
		//左侧菜单栏点击
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
		//标签栏切换
		var ls2 = document.querySelectorAll(".m-tab li");
		var tabClick = function(){
			if (this.innerHTML == "日志") {
				ls2[1].setAttribute("class", "");
				utils.addClass(this,"active");
				utils.addClass(document.querySelector(".m-label"),"f-dn");
				utils.removeClass(document.querySelector(".m-ipt"),"f-dn");
				utils.removeClass(document.querySelector(".m-ctt"),"f-dn");
			} else {
				ls2[0].setAttribute("class", "");
				utils.addClass(this,"active");
				utils.removeClass(document.querySelector(".m-label"),"f-dn");
				utils.addClass(document.querySelector(".m-ipt"),"f-dn");
				utils.addClass(document.querySelector(".m-ctt"),"f-dn");
			}
		};
		for (i = 0; i < ls2.length; i++) {
			ls2[i].onclick = tabClick;  
		}
	};
	var insertBlogs = function(){
		//根据时间来排序
		utils.sort(data);
		var html = '';
		var piece = null;
		//顶置日志
		for( var i = 0; i < data.length; i++){
			if( data[i].rank == 5 ){
				data[i].private_id = i;
				piece = '<div class="slt" data-id="'+i+'" >\
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
	                                <li><a class="top">取消顶置</a></li>\
	                            </ul>\
	                        </div>\
	                        <a class="edt  f-cr2">编辑</a>\
	                    </div>';
	            html += piece;
			}
		}
		//普通日志
		for( var i = 0; i < data.length; i++){
			if( data[i].rank != 5 ){
				data[i].private_id = i;
				piece = '<div class="slt" data-id="'+i+'" >\
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
		}
        document.querySelector(".m-ctt .mn").innerHTML = html ;
        //初始化单个的删除顶置事件
        blogsRegBtn();
        editRegBtn();
	};
	var blogsRegBtn = function(){
		//单个删除选项
		var dlt = document.querySelectorAll(".m-ctt .dlt-single");
		var dltClick = function(){
			var child = this.parentNode.parentNode.parentNode.parentNode;
			var id = null;
			//兼容低版本IE 取消使用 child.dataset.id
			data.splice(child.getAttribute("data-id"),1);
			pageInit.insertBlogs();
		};
		for (var i = 0; i < dlt.length; i++) {
			dlt[i].onclick = dltClick;  
		}
		//单个顶置选项
		var top = document.querySelectorAll(".m-ctt .top");
		var child = null;
		var topClick = function(){
			if ( this.innerHTML =="顶置" ) {
				child = this.parentNode.parentNode.parentNode.parentNode;
				child.parentNode.removeChild(child);
				var theFirstChild = document.querySelector(".m-ctt .slt");
				//更新数组
				data[child.getAttribute("data-id")].rank = 5;
			} else {
				//已顶置时
				child = this.parentNode.parentNode.parentNode.parentNode;
				data[child.getAttribute("data-id")].rank = 0;
			}
			pageInit.insertBlogs();
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
			 	document.querySelector(".all").checked = false;
			 	for( var j = 0; j < data.length; j++) {
			 		if(data[j].private_id == i ){
			 			data.splice(j,1);
			 		}
			 	}
			 }
			}
			pageInit.insertBlogs();
		};
	};
	var pubRegBtn = function(){
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
				//slt.dataset.id = data.length;
				slt.setAttribute("data-id",data.length)
				var new_item = {
					"title" : title.value,
					"blogContent":textarea.value,
					"publishTime": new Date().getTime(),
					"allowView": -100,
					"accessCount": 0,
					"commentCount": 0,
					"publishTimeStr":utils.getDateT(),
					"shortPublishDateStr":""
				};
				data.push(new_item);
				pageInit.insertBlogs();
				title.value = "日志标题";
				textarea.value = ""; 
			}
		};

	};
	var editRegBtn = function(){
		//编辑选项
		var edt = document.querySelectorAll(".m-ctt .edt");
		var edtClick = function(){
			var child = this.parentNode;
			editPubRegBtn(child.getAttribute("data-id"));
		};
		for (var i = 0; i < edt.length; i++) {
			edt[i].onclick = edtClick;  
		}
	};
	var scrollInit = function(lh,speed,delay){ 
		var t = null; 
		var o = document.querySelector(".m-sd2 .content");
		var h = false;
		o.onmouseover = function() {
			h = true;
		}
		o.onmouseout = function() {
			h = false;
		}
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
	var editPubRegBtn = function(id) {
		console.log("suc " + id);
		//日志发布模块
		var title = document.querySelector(".m-ipt .tt");
		var textarea = document.querySelector(".m-ipt textarea");
		var clear = document.querySelector(".m-ipt .clear");
		var release = document.querySelector(".m-ipt .release");
		title.value = data[id].title;
		textarea.value  = data[id].blogContent;
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
				data[id].title = title.value;
				data[id].blogContent = textarea.value;
				pageInit.insertBlogs();
				title.value = "日志标题";
				textarea.value = ""; 
				//重新绑定新日志的发布功能
				pubRegBtn();
			}
		};
	};
	var insertFriendLog = function(){
		var html = '';
		for( var i = 0; i < 13 ; i++ ) {
			html += '<div class="slt">\
                        <img class="f-fl" src="img/avatar.jpg" alt="">\
                        <div class="hd">小油菜</div>\
                        <div class="bd">2hit:教你如何吧美妞拍的...</div>\
                    </div>'
		}
		document.querySelector(".m-sd2 .content").innerHTML = html;
	};
	return {
		regBtn: regBtn,
		insertBlogs: insertBlogs,
		blogsRegBtn: blogsRegBtn,
		insertFriendLog: insertFriendLog,
		allRegBtn: allRegBtn,
		pubRegBtn: pubRegBtn,
		editRegBtn: editRegBtn,
		editPubRegBtn: editPubRegBtn,
		scrollInit: scrollInit
	};
})();

	//静态模拟数据
	pageInit.insertBlogs();
	pageInit.insertFriendLog();

window.onload = function(){
	//CORS没有配置，暂时无法跨域
	//utils.doGet("getblogs");
	pageInit.regBtn();
	pageInit.pubRegBtn();
	pageInit.allRegBtn();
	pageInit.editRegBtn();
	pageInit.scrollInit(48,40,2000);
};



