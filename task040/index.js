//组件初始化时，可配置可选日期上下限
//提供设定日期的接口，指定具体日期，日历面板响应日期选中
//提供获取日期的接口，获取面板中当前选中的日期，返回一个日期对象
//
//--------------------------第一个calendar--------------------------------
var calendarbox=document.getElementById('calendarbox');
var calendarContainer=document.getElementById('calendarContainer');
var err=document.getElementById('error');
var fromdate=new Date(2015,3,1);
var todate=new Date(2016,3,30);

new Calendar(calendarbox,calendarContainer,fromdate,todate,err);

//--------------------------第二个calendar------------------------------
var calendarbox2=document.getElementById('calendarbox2');
var calendarContainer2=document.getElementById('calendarContainer2');

new Calendar(calendarbox2,calendarContainer2,null,null,null);