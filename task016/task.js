// JavaScript Document
/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
function dom(id){
	return document.getElementById(id);
	}
var aqiData = new Array();

/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
	var city=document.getElementById("aqi-city-input").value.trim();
	var value=Number(document.getElementById("aqi-value-input").value.trim());
	var reg1=/[\u4e00-\u9fa5a-zA-Z]{2,10}/;
	var reg2=/^(\d|[1-9]\d|100)$/;
	var cityName,valueNumber;
	if(reg1.test(city)){
		cityName=city;
		}else{
			alert("请输入中英文字符");
			}
	if(reg2.test(value)){
		valueNumber=value;
		}else{
			alert("请输入0-100的整数");
			}
	aqiData.push([cityName,valueNumber]);
	/*return aqiData;*/
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
	var table=document.getElementById("aqi-table");
	table.innerHTML="<tr><td>城市</td><td>空气质量</td><td>操作</td></tr>";
	var len=aqiData.length;
	for(var i=0;i<aqiData.length;i++){
		table.innerHTML+="<tr><td>"+aqiData[i][0]+"</td><td>"+aqiData[i][1]+"</td><td><button>删除</button></td></tr>";	
		}
}

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(obj) {
  // do sth.
  var trdel=obj.parentElement.parentElement;
  var city=trdel.getElementsByTagName("td")[0].innerHTML;
  for(var i in aqiData){
	  if(city==aqiData[i][0]){
		  /*aqiData[i]=null;*/
		  aqiData.splice(i,1);
		  }
	  }
  renderAqiList();
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
	var button=document.getElementById("add-btn");
	button.addEventListener("click",addBtnHandle);
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数
	 var table =document.getElementById("aqi-table");
     var btn=table.getElementsByTagName("button");
	 table.addEventListener("click",function(e){
		 if(e.target.nodeName.toLowerCase()=="button"){
			 delBtnHandle(e.target);
			 }
		 });
 /* for(var i=0;i<btn.length;i++){
	  alert(3);
	  btn[i].addEventListener("click",function(){
	  	alert("click");
	  });
	  }*/
}
/*window.onload=function(){
	alert("ok");
	init();
	}*/
window.onload=function(){
	init();
	}

