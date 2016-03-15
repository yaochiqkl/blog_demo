
/**
 * 大作业主函数库入口
 * @author lishuangzhuang<hzlishuangzhuang@corp.netease.com>
 * @version 1.0
 */


	//静态模拟数据
	pageInit.insertBlogs();
	pageInit.insertFriendLog();

window.onload = function(){
	//utils.doGet("getblogs");
	pageInit.menuRegBtn();
	pageInit.pubRegBtn();
	pageInit.allRegBtn();
	pageInit.editRegBtn();
	scroll.scrollInit(".m-sd .content",48,40,2000);
};