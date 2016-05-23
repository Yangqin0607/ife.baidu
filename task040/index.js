//组件初始化时，可配置可选日期上下限
//提供设定日期的接口，指定具体日期，日历面板响应日期选中
//提供获取日期的接口，获取面板中当前选中的日期，返回一个日期对象
var calendarbox=document.getElementById('calendarbox');
var fromedate=new Date(2015,0,1);
var todate=new Date(2016,0,1);
new Calendar(calendarbox,fromedate,todate,todate);