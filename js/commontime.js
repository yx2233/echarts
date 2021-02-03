$(document).ready(function(){
	fnDate();
})
function fnDate(){
	var d=new Date();
	var year=d.getFullYear();
	var month=d.getMonth();
	var date=d.getDate();
	var hours=d.getHours();
	var minute=d.getMinutes();
	var second=d.getSeconds();
	var time=year+'-'+fnW((month+1))+'-'+fnW(date)+' '+fnW(hours)+':'+fnW(minute)+':'+fnW(second);
	$("#realtime").html(time);
}
function fnW(str){
	var num;
	str>=10?num=str:num='0'+str;
	return num;
}
setInterval(function(){
	fnDate()
},1000);