// JavaScript Document
/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}/*返回时间的“年-月-日”表示*/
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;/*存储的是年月日对应的数据*/
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: "北京",
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
	var color = '',text = '';
	for (var i in chartData) {
		color = '#' + Math.floor(Math.random() * 0xFFFFFF).toString(16);
		text += '<div title="'+i+":"+chartData[i]+'" style="height:'+chartData[i]+'px; background-color:'+color+'"></div>';
		}
	document.getElementsByClassName("aqi-chart-wrap")[0].innerHTML=text;
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
	var radio=document.getElementsByName("gra-time");
	for(var i=0;i<radio.length;i++){
		if(radio[i].checked){
			str=radio[i].value;
			break;
			}
		}
	if(pageState.nowGraTime==str){
		return;
	}else{
		pageState.nowGraTime=str;
		}
  // 设置对应数据
	initAqiChartData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
	if(pageState.nowSelectCity==this.value){
		return;
		}else{
			pageState.nowSelectCity=this.value;
			}
  // 设置对应数据
	initAqiChartData();
  // 调用图表渲染函数
   renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
	var form_gra_time=document.getElementById("form-gra-time");
	form_gra_time.addEventListener("click",function(e){
		if(e.target.name=="gra-time"){
			graTimeChange();
			}
		})
}
/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  	var citySelect=document.getElementById("city-select");
	var cityData=new Array();
	for(var i in aqiSourceData){
		cityData.push(i);
		if(i!="北京"){
			var newOption=new Option(i,i);
			citySelect.add(newOption,undefined);
			}
		}
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
	citySelect.addEventListener("change",citySelectChange);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  var city=pageState.nowSelectCity;
  var time=pageState.nowGraTime;
  var data=aqiSourceData[city];
  if(time=="day"){
	  chartData=data;
	  }
  if(time=="week"){
	  chartData={};
	  var sum=0,day=0,week=0;
	  for(var i in data){
		  sum+=data[i];
		  day++;
		  if(new Date(i).getDay()==6){
			  week++;
			  chartData["第"+week+"周"]=Math.floor(sum/day);
			  sum=0;
			  day=0;
			  }
		  }
	 if(day!=0){
		  week++;
		  chartData["第"+week+"周"]=Math.floor(sum/day);
		  }
	  }
   if(time=="month"){
	   chartData={};
	   var sum=0,day=0,m=0;
	   for(var i in data){
		   if(new Date(i).getMonth()!=m){
			   m++;
			   chartData["第"+m+"月"]=Math.floor(sum/day);
			   sum=0;
			   day=0;
			   }
		   sum+=data[i];
		   day++;
		   }
		if(day!=0){
			m++;
			chartData["第"+m+"月"]=Math.floor(sum/day);
			}
	   }
	  renderChart();
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}
window.onload=function(){
	init();
	}
/*init();*/