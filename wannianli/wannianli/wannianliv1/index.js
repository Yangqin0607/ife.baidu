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
	year.options[toyear-1900].selected=true;
	month.options[tomonth].selected=true;
	}
	
/*
	*初始化年和月的选择框,并给选择框添加事件
*/
function initYearMonth(){
	for(var i=1900;i<=2050;i++){
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
	/*alert(dayNumber);*/
	for(var i=0;i<(7-startIndex);i++){
		var str=comments(month,(i+1));
		/*alert(str);*/
		document.getElementById("rol1").getElementsByClassName("day")[startIndex+i].innerHTML=(i+1)+str+nlTOgl(year,(month-1),(i+1));
		}
	for(var j=i;j<dayNumber;j++){
		var str=comments(month,(j+1));
		var rol=Math.floor((j-i)/7)+2;
		var col=(j-i)%7;
		document.getElementById("rol"+rol).getElementsByClassName("day")[col].innerHTML=(j+1)+str+nlTOgl(year,(month-1),(j+1));
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
	if(seconds<10){
		var now=document.getElementById("now").getElementsByTagName("i")[0].innerHTML=hour+":"+minutes+":0"+seconds;
		}else{
			var now=document.getElementById("now").getElementsByTagName("i")[0].innerHTML=hour+":"+minutes+":"+seconds;
		}
	setTimeout(arguments.callee,1000);
	}
	
/*
	*显示备注
*/
function comments(month,day){
	month=Number(month);
	day=Number(day);
	var str1=calendar(month,day);
	str=str1;
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

/*计算农历Y年的总天数,
y表示农历年份对应的阴历年天数*/
function nYearDays(ny) {
   var yearDays = 348;
   for(var i=0x8000; i>0x8; i>>=1){
	   if(lunar[ny-1900]&i){
		   yearDays=yearDays+1;
		   }
	   }
   var rmonthDays=nYearRmonthDays(ny);
   yearDays=yearDays+rmonthDays;
   return yearDays;
}

/*农历 y年闰月的天数*/
function nYearRmonthDays(ny) {
	var rmonthDays=0;
	if(anyRMonth(ny)){
		if(lunar[ny-1900]&0x10000){
			rmonthDays=30;
			}else{
				rmonthDays=29;
				}
		}
	return rmonthDays;
}

/*农历 y年闰哪个月 1-12 , 没闰传回 0*/
function anyRMonth(ny) {
	var rMonth=lunar[ny-1900] & 0xf;
    return rMonth;
}

/*农历 y年m月的总天数*/
function nYearMmonthDays(ny,nm) {
	var days=29;
	if(lunar[ny-1900]&(0x10000>>nm)){
		days=30;
		}
   return days;
}

nlTOgl(1914,0,26);
/*function Lunar(objDate) {*//*objDate为阳历毫秒数*/
function nlTOgl(gy,gm,gd) {/*输入阳历年份y，月份（m+1）月，d日，输出阴历年份year,月份month,日期date，gm=0表示1月*/
   var y1900=new Date(1900,0,31);
   var y=new Date(gy,gm,gd);
   var days=(y-y1900)/(1000*3600*24);
  
   var dayCyl = days + 40;
   var monCyl = 14;
   var temp;
   for(var i=1900; i<2050 && days>0; i++) {
      temp = nYearDays(i);
      days=days-temp;
      monCyl=monCyl+12;
   }
    if(days<0) {
      days=days+temp;
      i--;
      monCyl=monCyl-12;
   }
  
   var nyear=i;
   var yearCyl=i-1864;
   var rmonth=anyRMonth(nyear);
   var rflag=false;
   for(var i=1;i<13&&days>0;i++){
	   if(rmonth>0&&i==(rmonth+1)&&rflag==false){
		   --i;
		   rflag=true;
		   temp=nYearRmonthDays(nyear);
		   }else{
			   temp=nYearMmonthDays(nyear,i);
			   }
	   if(rflag==true&&i==(rmonth+1)){
		   rflag=false;
		   }
	   days=days-temp;
	   if(rflag==false){
		   monCyl++;
		   }
	   }
   if(days==0&&rmonth>0&&i==rmonth+1){
	  
		if(rflag){/*闰月后一个月出循环*/
			rflag=false;
			
			}else{/*闰月初一出*/
				
				rflag=true;
				--i;
				--monCyl;
				}	   
	   }
	if(days<0){
	   days+=temp;
	   --i;
	   --monCyl;
	   }
	var nmonth=i;
	var nday=days+1;
	var d=nldisplayDay(nday);
	var m=ndisplayMonth(nmonth);
	
	if(rflag==true){
		m="闰"+m;
		
		}
	var str="<br/><span class='nl'>"+m+"月"+d+"</span>";
	return str;
  /* alert(nyear+":"+nmonth+":"+nday);*/
}
/*按农历显示日期*/
function nldisplayDay(d){
   var str;
   var s=new Array('一','二','三','四','五','六','七','八','九','十');
   if(d<10){
	   str="初";
	   }else if(d<20&&d!=10){
		   str="十";
		   }else if(d<30&&d!=20){
			   str="廿";
			   }
	str=str+s[d%10-1];
	if(d==10){
		str="初十";
		}
	if(d==20){
		str="廿";
		}
	if(d==30){
		str="卅";
		}
   return(str);
}
/*农历月份显示*/
function ndisplayMonth(m){
	var str;
	var s=new Array('正','二','三','四','五','六','七','八','九','十','十一','十二');
	str=s[m-1];
	return str;
	}