// JavaScript Document
var year=document.getElementById("year");
var month=document.getElementById("month");

window.onload=function(){
	init();
	}
	
/*
	*初始化函数，显示当月的日期分布
*/
function init(){
	initYearMonth();
	setToday();
	pain();
	setTimeout(setNowTime,1000);
	}
	
/*
	*绘制日期分布函数
*/
function pain(){
	var sYear=selectedYear();
	var sMonth=selectedMonth();
	var monthday=monthDayNumber(sYear,sMonth);
	var startIndex=findStartIndex(sYear,sMonth);
	var day=document.getElementsByClassName("day");
	for(var i=0;i<day.length;i++){
		day[i].innerHTML="";
		}
	display(startIndex,monthday,sMonth,sYear);
	}
	
/*
	*设置现在的年和月份
*/
function setToday(){
	var today=new Date();
	var toyear=today.getFullYear();
	var tomonth=today.getMonth();
	year.options[toyear-1901].selected=true;
	month.options[tomonth].selected=true;
	}
	
/*
	*初始化年和月的选择框,并给选择框添加事件
*/
function initYearMonth(){
	for(var i=1901;i<=2050;i++){
		var newOption=new Option(i+"年",i);
		year.add(newOption,undefined);
		}
	for(var i=1;i<=12;i++){
		var newOption=new Option(i+"月",i);
		month.add(newOption,undefined);
		}
	year.addEventListener("change",pain);
	month.addEventListener("change",pain);
	}

/*
	*selectedYear函数用于返回选中的年份
*/
function selectedYear(){
	var selectedYear=year.options[year.selectedIndex].value;
	return selectedYear;
	}

/*
	*selectedMonth函数用于返回选中的月份
*/
function selectedMonth(){
	var selectedMonth=month.options[month.selectedIndex].value;
	return selectedMonth;
	}

/*
	*findStartIndex找到开始的那天是周几
	*输入为年和月
*/
function findStartIndex(year,month){
	var y1900=new Date(Date.UTC(1900,0));
	var y=new Date(Date.UTC(year,(month-1)));
	var day=(y-y1900)/(1000*3600*24)+1;
	return startIndex=day%7;
	}

/*
	*monthDayNumber函数判断一个月有多少天
	*输入year,month为月份
*/
function monthDayNumber(year,month){
	if(month==4||month==6||month==9||month==11){
		monthday=30;
	}else{
		if(month==2){
			if(year%4==0&&year%100!=0||year%400==0){
				monthday=29;
			}else{
				monthday=28;
			}
		}else{
			monthday=31;
		}
	}
	
	return monthday;
}

/*
	*显示日期的函数
	*startIndex表示月份的第一天位置。startIndex=0 表示开始为周日，startIndex=1，表示开始为周一。。。
	*dayNumber表示该月天数
*/
function display(startIndex,dayNumber,month,year){
	
	var weekHoliday=false;
	var number=0;
	var str=null;
	for(var i=0;i<(7-startIndex);i++){
		if((month==5&&(startIndex+i)==0)||(month==6&&(startIndex+i)==0)||(month==11&&(startIndex+i)==4)){
			++number;
			}
		var str=comments(month,(i+1),false);
		document.getElementById("rol1").getElementsByClassName("day")[startIndex+i].innerHTML=(i+1)+displayNL(year,month,(i+1))+str;
		}
	for(var j=i;j<dayNumber;j++){
		
		var rol=Math.floor((j-i)/7)+2;
		var col=(j-i)%7;
		if((month==5&&col==0)||(month==6&&col==0)||(month==11&&col==4)){
			++number;
			}
		if((month==5&&number==2&&weekHoliday==false)||(month==6&&number==3&&weekHoliday==false)||(month==11&&number==4&&weekHoliday==false)){
			weekHoliday=true;
			str=comments(month,(j+1),true);
			}else{
				str=comments(month,(j+1),false);
			}
		document.getElementById("rol"+rol).getElementsByClassName("day")[col].innerHTML=(j+1)+displayNL(year,month,(j+1))+str;
		}
}

/*
	*设置右侧的时间计时
*/
function setNowTime(){
	var date=new Date();
	var hour=date.getHours();
	var minutes=date.getMinutes();
	var seconds=date.getSeconds();
	if(hour<10){
		hour="0"+hour;
		}
	if(minutes<10){
		minutes="0"+minutes;
		}
	if(seconds<10){
		seconds="0"+seconds;
		}
	/*if(seconds<10){
		var now=document.getElementById("now").getElementsByTagName("i")[0].innerHTML=hour+":"+minutes+":0"+seconds;
		}else{*/
	var now=document.getElementById("now").getElementsByTagName("i")[0].innerHTML=hour+":"+minutes+":"+seconds;
		/*}*/
	setTimeout(arguments.callee,1000);
	}
	
/*
	*显示备注，阳历假期
*/
function comments(month,day,flag){
	month=Number(month);
	day=Number(day);
	var str1=calendar(month,day);
	str=str1;
	if(flag==true){
		switch(month){
			case 5:
				str="<br/><span class='comment'>母亲节</span>";
				break;
			case 6:
				str="<br/><span class='comment'>父亲节</span>";
				break;
			case 11:
				str="<br/><span class='comment'>感恩节</span>";
				break;
			}
		}
	return str;
	}
	
/*
	*储存公历假期
*/
function calendar(month,day){
	var str1=" ";
	if(month==1&&day==1){
		str1="<br/><span class='comment'>元旦</span>";
		/*flag1=1;*/
		}
	
	if(month==2){
		switch(day){
		case 2:
			str1="<br/><span class='comment'>世界湿地日</span>";
			break;
		case 14:
			str1="<br/><span class='comment'>情人节</span>";
			break;
		/*default:
			flag1=0;*/
		}
	}
	
	if(month==3){
		switch(day){
			case 3:
				str1="<br/><span class='comment'>全国爱耳日</span>";
				break;
			case 8:
				str1="<br/><span class='comment'>妇女节</span>";
				break;
			case 9:
				str1="<br/><span class='comment'>保护母亲河日</span>";
				break;
			case 12:
				str1="<br/><span class='comment'>植树节</span>";
				break;
			case 14:
				str1="<br/><span class='comment'>白色情人节</span>";
				break;
			case 15:
				str1="<br/><span class='comment'>消费者权益日</span>";
				break;
			case 22:
				str1="<br/><span class='comment'>世界水日</span>";
				break;
			/*default:
				flag1=0;*/
			}
		}
	if(month==4){
		switch(day){
			case 1:
				str1="<br/><span class='comment'>愚人节</span>";
				break;
			case 7:
				str1="<br/><span class='comment'>世界卫生日</span>";
				break;
			case 22:
				str1="<br/><span class='comment'>世界地球日</span>";
				break;
			/*default:
				flag1=0;*/
			}
		}
	if(month==5){
		switch(day){
			case 1:
				str1="<br/><span class='comment'>劳动节</span>";
				break;
			case 4:
				str1="<br/><span class='comment'>青年节</span>";
				break;
			case 8:
				str1="<br/><span class='comment'>世界红十字日</span>";
				break;
			case 17:
				str1="<br/><span class='comment'>世界电信日</span>";
				break;
			case 31:
				str1="<br/><span class='comment'>世界无烟日</span>";
				break;
			/*default:
				flag1=0;*/
			}
		}
	if(month==6){
		switch(day){
			case 1:
				str1="<br/><span class='comment'>儿童节</span>";
				break;
			case 6:
				str1="<br/><span class='comment'>全国爱眼日</span>";
				break;
			case 25:
				str1="<br/><span class='comment'>全国土地日</span>";
				break;
			case 26:
				str1="<br/><span class='comment'>国际禁毒日</span>";
				break;
			/*default:
				flag1=0;*/
			}
		}
	if(month==7){
		switch(day){
			case 1:
				str1="<br/><span class='comment'>建党节</span>";
				break;
			case 7:
				str1="<br/><span class='comment'>抗战纪念日</span>";
				break;
			/*default:
				flag1=0;*/
			}
		}
	if(month==8){
		switch(day){
			case 1:
				str1="<br/><span class='comment'>建军节</span>";
				break;
			case 12:
				str1="<br/><span class='comment'>国际青年节</span>";
				break;
			/*default:
				flag1=0;*/
			}
		}
	if(month==9){
		switch(day){
			case 8:
				str1="<br/><span class='comment'>国际扫盲日</span>";
				break;
			case 10:
				str1="<br/><span class='comment'>中国教师节</span>";
				break;
			case 16:
				str1="<br/><span class='comment'>中国脑健康日</span>";
				break;
			case 20:
				str1="<br/><span class='comment'>全国爱牙日</span>";
				break;
			/*default:
				flag1=0;*/
			}
		}
	if(month==10){
		switch(day){
			case 1:
				str1="<br/><span class='comment'>国庆节</span>";
				break;
			case 4:
				str1="<br/><span class='comment'>世界动物日</span>";
				break;
			case 31:
				str1="<br/><span class='comment'>万圣节</span>";
				break;
			/*default:
				flag1=0;*/
			}
		}
	if(month==11){
		switch(day){
			case 8:
				str1="<br/><span class='comment'>中国记者节</span>";
				break;
			case 9:
				str1="<br/><span class='comment'>消防宣传日</span>";
				break;
			/*default:
				flag1=0;*/
			}
		}
	if(month==12){
		switch(day){
			case 4:
				str1="<br/><span class='comment'>法制宣传日</span>";
				break;
			case 25:
				str1="<br/><span class='comment'>圣诞节</span>";
				break;
			/*default:
				flag1=0;*/
			}
		}
	return str1;
	}

/*信息*/
var lunar=new Array(
0x04bd8,0x04ae0,0x0a570,0x054d5,0x0d260,0x0d950,0x16554,0x056a0,0x09ad0,0x055d2,
0x04ae0,0x0a5b6,0x0a4d0,0x0d250,0x1d255,0x0b540,0x0d6a0,0x0ada2,0x095b0,0x14977,
0x04970,0x0a4b0,0x0b4b5,0x06a50,0x06d40,0x1ab54,0x02b60,0x09570,0x052f2,0x04970,
0x06566,0x0d4a0,0x0ea50,0x06e95,0x05ad0,0x02b60,0x186e3,0x092e0,0x1c8d7,0x0c950,
0x0d4a0,0x1d8a6,0x0b550,0x056a0,0x1a5b4,0x025d0,0x092d0,0x0d2b2,0x0a950,0x0b557,
0x06ca0,0x0b550,0x15355,0x04da0,0x0a5d0,0x14573,0x052d0,0x0a9a8,0x0e950,0x06aa0,
0x0aea6,0x0ab50,0x04b60,0x0aae4,0x0a570,0x05260,0x0f263,0x0d950,0x05b57,0x056a0,
0x096d0,0x04dd5,0x04ad0,0x0a4d0,0x0d4d4,0x0d250,0x0d558,0x0b540,0x0b5a0,0x195a6,
0x095b0,0x049b0,0x0a974,0x0a4b0,0x0b27a,0x06a50,0x06d40,0x0af46,0x0ab60,0x09570,
0x04af5,0x04970,0x064b0,0x074a3,0x0ea50,0x06b58,0x055c0,0x0ab60,0x096d5,0x092e0,
0x0c960,0x0d954,0x0d4a0,0x0da50,0x07552,0x056a0,0x0abb7,0x025d0,0x092d0,0x0cab5,
0x0a950,0x0b4a0,0x0baa4,0x0ad50,0x055d9,0x04ba0,0x0a5b0,0x15176,0x052b0,0x0a930,
0x07954,0x06aa0,0x0ad50,0x05b52,0x04b60,0x0a6e6,0x0a4e0,0x0d260,0x0ea65,0x0d530,
0x05aa0,0x076a3,0x096d0,0x04bd7,0x04ad0,0x0a4d0,0x1d0b6,0x0d250,0x0d520,0x0dd45,
0x0b5a0,0x056d0,0x055b2,0x049b0,0x0a577,0x0a4b0,0x0aa50,0x1b255,0x06d20,0x0ada0
)

function displayNL(gy,gm,gd){
	var nobj=GLtoNL(gy,gm,gd);
	var nmonth=ndisplayMonth(nobj.nmonth);
	if(nobj.rflag==true){
		nmonth="闰"+nmonth;
		}
	var nday=nldisplayDay(nobj.nday);
	var str="<br/><span class='nl'>"+nmonth+"月"+nday+"</span>";
	switch(nobj.nmonth){
		case 1:
			if(nobj.nday==1){
				str="<br/><span class='nl comment'>春节</span>";
				}else if(nobj.nday==15){
					str="<br/><span class='nl comment'>元宵节</span>";
					}
			break;
		case 5:
			if(nobj.nday==5){
				str="<br/><span class='nl comment'>端午节</span>";
				}
			break;
		case 7:
			if(nobj.nday==7){
				str="<br/><span class='nl comment'>七夕</span>";
				}
			break;
		case 8:
			if(nobj.nday==15){
				str="<br/><span class='nl comment'>中秋</span>";
				}
			break;
		case 9:
			if(nobj.nday==9){
				str="<br/><span class='nl comment'>重阳</span>";
				}
			break;
		case 12:
			if(nobj.nday==24){
				str="<br/><span class='nl comment'>小年</span>";
				}
			break;
		}
	if(nobj.nmonth==12){
		var daysfor12=nMonthDays(nobj.nyear,nobj.nmonth);
		if((daysfor12==29&&nobj.nday==29)||(daysfor12==30&&nobj.nday==30)){
				str="<br/><span class='nl comment'>除夕</span>";
		}
	}
	return str;
	}
/*输入公历日期，返回农历对象，包含农历年，月，日*/
function GLtoNL(gy,gm,gd){
	var days=totalDays(gy,gm,gd);
	/*确定农历年*/
	var temp=0;
	for(var i=1900;i<2050;i++){
		temp=totalDaysforNL(i);
		days=days-temp;
		if(days<=0){
			break;
			}
		}
	if(days==0){
		++i;
		}
	if(days<0){
		days=days+temp;
		}
	var nyear=i;
	
	
	/*确定农历月*/
	var rm=RMIndex(nyear);
	var flag=false;
	for(var i=1;i<13&&days>0;i++){	
		if(rm>0&&i==(rm+1)&&flag==false){
			--i;
			temp=rmDays(nyear);
			flag=true;
			}else{
				temp=nMonthDays(nyear,i);
				}
		if(i==(rm+1)&&flag==true){
			flag=false;
			}
		days=days-temp;
		}
	/*如果是每月的初一*/
	if(days==0&&rm>0&&i==(rm+1)){
		if(flag){/*闰月后一个月初一*/
			flag=false;
			}else{/*闰月初一*/
				--i;
				flag=true;
				}
		}
	if(days<0){/*每月的非初一，如果是每月的初一，那么它的前一个月被减去时，days=0，此时i++后出循环刚好是月份，因此这种情况不做处理*/
		--i;
		days=days+temp;
		}
	var nmonth=i;
	var nday=days+1;
	var nobj=new Object();
	nobj.nyear=nyear;
	nobj.nmonth=nmonth;
	nobj.nday=nday;
	nobj.rflag=flag;
	return nobj;
	}
	
/*返回输入的公历日期距离1900,1,31的天数*/
function totalDays(gy,gm,gd){
	var date1=new Date(1900,0,31);
	var date2=new Date(gy,gm-1,gd);
	var date=(date2-date1)/(1000*3600*24);
	return date;
	}
	
/*返回农历y年的天数*/
function totalDaysforNL(ny){
	/*假设都是小月，小月是29天，12个月就是348天*/
	var year=348;
	/*通过lunar查看该年有几个大月，大月为30天*/
	var lu=lunarToBinary(ny);
	var m12=lu.substring(4,16);
	var number=0;
	for(var i=0;i<m12.length;i++){
		if(m12[i]=="1"){
			number++;
			}
		}
	year=year+number;
	if(RMIndex(ny)>0){
		year=year+rmDays(ny);
		}
	return year;
	}
	
/*返回lunar的二进制字符串表示*/
function lunarToBinary(ny){
	var a=lunar[ny-1900].toString(16);
	var lu=parseInt(a,16).toString(2);
	if(lu.length!=20){
		var temp=lu.length;
		for(var i=0;i<20-temp;i++){
			lu="0"+lu;
			}
		}
	return lu;
	}
	
/*返回闰月天数*/
function rmDays(ny){
	var lu=lunarToBinary(ny);
	var first4=lu.substring(0,4);
	var str=parseInt(first4,2);
	if(str=="1"){
		return 30;
		}else{
			return 29;
			}
	}
	
/*返回闰月月号，没有闰月返回0*/
function RMIndex(ny){
	var rm=0;
	var lu=lunarToBinary(ny);
	var last4=lu.substring(16);
	rm=parseInt(last4,2);
	return rm;
	}

/*农历y年，m月的天数*/
function nMonthDays(ny,nm){
	var lu=lunarToBinary(ny);
	var m12=lu.substring(4,16);
	var number=0;
	switch(m12[nm-1]){
		case "1":
			number=30;
			break;
		case "0":
			number=29;
			break;
		}
	return number;
	}
/*按农历显示日期*/
function nldisplayDay(nd){
   var str;
   var s=new Array('一','二','三','四','五','六','七','八','九','十');
   if(nd<10){
	   str="初";
	   }else if(nd<20&&nd!=10){
		   str="十";
		   }else if(nd<30&&nd!=20){
			   str="廿";
			   }
	str=str+s[nd%10-1];
	if(nd==10){
		str="初十";
		}
	if(nd==20){
		str="廿";
		}
	if(nd==30){
		str="卅";
		}
   return(str);
}
/*农历月份显示*/
function ndisplayMonth(nm){
	var str;
	var s=new Array('正','二','三','四','五','六','七','八','九','十','十一','十二');
	str=s[nm-1];
	return str;
	}