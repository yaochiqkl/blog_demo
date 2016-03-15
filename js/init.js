/**
 * 大作业初始化函数库
 * @author lishuangzhuang<hzlishuangzhuang@corp.netease.com>
 * @version 1.0
 */

var pageInit = (function(){
	//菜单栏、标签栏点击事件
	var menuRegBtn = function(){
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
	//插入博客模块
	var insertBlogs = function(){
		//根据时间来排序
		utils.sort(data,"publishTime");
		var html = '';
		var piece = null;
		//顶置日志初始化
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
		//普通日志初始化
		for( i = 0; i < data.length; i++){
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
        //初始化单个日志的删除和顶置事件
        blogsRegBtn();
        editRegBtn();
	};
	//单个日志的删除和顶置事件
	var blogsRegBtn = function(){
		//单个删除选项
		var dlt = document.querySelectorAll(".m-ctt .dlt-single");
		var dltClick = function(){
			var child = utils.getNtnParent(this,4);
			var id = null;
			//兼容低版本IE 取消使用 child.dataset.id
			data.splice(child.getAttribute("data-id"),1);
			insertBlogs();
		};
		for (var i = 0; i < dlt.length; i++) {
			dlt[i].onclick = dltClick;  
		}
		//单个顶置选项
		var top = document.querySelectorAll(".m-ctt .top");
		var child = null;
		var topClick = function(event){
			child = utils.getNtnParent(this,4);
			if ( this.innerHTML =="顶置" ) {
				child.parentNode.removeChild(child);
				var theFirstChild = document.querySelector(".m-ctt .slt");
				data[child.getAttribute("data-id")].rank = 5;
			} else {
				data[child.getAttribute("data-id")].rank = 0;
			}
			insertBlogs();
		};
		for (var j = 0; j < top.length; j++) {
			top[j].onclick = topClick;  
		}
	};
	//全选、删除模块
	var allRegBtn = function(){
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
			insertBlogs();
		};
	};
	//新日志发布的提交
	var pubRegBtn = function(){
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
				insertBlogs();
				title.value = "日志标题";
				textarea.value = ""; 
			}
		};
	};
	//编辑选项初始化
	var editRegBtn = function(){
		var edt = document.querySelectorAll(".m-ctt .edt");
		var edtClick = function(){
			var child = this.parentNode;
			editPubRegBtn(child.getAttribute("data-id"));
		};
		for (var i = 0; i < edt.length; i++) {
			edt[i].onclick = edtClick;  
		}
	};
	//编辑后的提交事件
	var editPubRegBtn = function(id) {
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
				insertBlogs();
				title.value = "日志标题";
				textarea.value = ""; 
				//重新绑定新日志的发布功能
				pubRegBtn();
			}
		};
	};
	//好友日志初始化
	var insertFriendLog = function(){
		var html = '';
		for( var i = 0; i < 13 ; i++ ) {
			html += '<div class="slt">\
                        <img class="f-fl" src="img/avatar.jpg" alt="">\
                        <div class="hd">小油菜</div>\
                        <div class="bd">2hit:教你如何吧美妞拍的...</div>\
                    </div>'
		}
		document.querySelector(".m-sd .content").innerHTML = html;
	};
	
	return {
		menuRegBtn: menuRegBtn,
		insertBlogs: insertBlogs,
		insertFriendLog: insertFriendLog,
		allRegBtn: allRegBtn,
		pubRegBtn: pubRegBtn,
		editRegBtn: editRegBtn
	};
})();
