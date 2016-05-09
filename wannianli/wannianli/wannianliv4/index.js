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
	// setToday();
	pain();
	setNowTime();
	document.getElementById("today").addEventListener("click",clickToday);
	document.getElementById("today").click();
	document.getElementsByClassName("lHandle")[0].addEventListener("click",preAction);
	document.getElementsByClassName("rHandle")[0].addEventListener("click",nextAction);
	document.getElementsByClassName("lHandleY")[0].addEventListener("click",preYear);
	document.getElementsByClassName("rHandleY")[0].addEventListener("click",nextYear);
	}

/*
	*初始化年和月的选择框,并给选择框添加事件
*/
function initYearMonth(){
	for(var i=1901;i<=2049;i++){
		var newOption=new Option(i+"年",i);
		year.add(newOption,undefined);
	}
	for(var i=1;i<=12;i++){
		var newOption=new Option(i+"月",i);
		month.add(newOption,undefined);
		}
	year.addEventListener("change",changeSelected);
	month.addEventListener("change",changeSelected);
	}
	
/*选择框改变事件*/
function changeSelected(){
	pain();
	var sYear=selectedYear();
	var sMonth=selectedMonth();
	var startIndex=findStartIndex(sYear,sMonth);//获取当前年月下，该月的第一天是周几
	var day=document.getElementsByClassName("day");
	for(var i=0;i<day.length;i++){
		if(i==startIndex){
			day[i].click();
			}
		}
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
		
		removeClass(day[i],"pre");
		removeClass(day[i],"next");
		removeClass(day[i],"clicked");
		day[i].removeEventListener("click",preAction);
		day[i].removeEventListener("click",nextAction);
		day[i].removeEventListener("click",showAside);
		day[i].index=i;
		day[i].innerHTML="";
		}
	var arr=null;
	arr=display(startIndex,monthday,sMonth,sYear);
	
	for(var i=0;i<day.length;i++){
		if(arr[i]==null){
			day[i].removeEventListener("click",showAside);
			}
		if(arr[i]!=null){
			day[i].addEventListener("click",showAside);
			}
		}
	
	var pre=document.getElementsByClassName("pre");
	for(var i=0;i<pre.length;i++){
		pre[i].addEventListener("click",preAction);
		}
	var next=document.getElementsByClassName("next");
	for(var i=0;i<next.length;i++){
		next[i].addEventListener("click",nextAction);
		}
	
	function showAside(){
		var day=document.getElementsByClassName("day");
		for(var i=0;i<day.length;i++){
			removeClass(day[i],"clicked");
		}

		addClass(this," clicked");
		var obj=arr[this.index];
		document.getElementById("number").innerHTML=obj.gday;
		var array=['日','一','二','三','四','五','六'];
		var weekIndex=obj.week;
		var week=array[weekIndex];
		var rq=obj.gyear+"-"+obj.gmonth+"-"+obj.gday+"-星期"+week;
		document.getElementById("rq").innerHTML=rq;
		var nobj=GLtoNL(obj.gyear,obj.gmonth,obj.gday);
		var nmonth=ndisplayMonth(nobj.nmonth)+"月";
		var nday=nldisplayDay(nobj.nday);
		if(nobj.rflag==true){
			nmonth="闰"+nmonth;
			}
		document.getElementById("asideNl").innerHTML=nmonth+nday;
		var days=totalDays(obj.gyear,obj.gmonth,obj.gday);
		var yearCyl=nobj.yearCyl;
		var monthCyl=nobj.monthCyl;
		var dayCyl=nobj.dayCyl;
		document.getElementById("y").innerHTML=cyclical(yearCyl)+"年"+"【"+Animals[(yearCyl-36+1900-4)%12]+"】";
		document.getElementById("m").innerHTML=cyclical(monthCyl)+"月";
		document.getElementById("d").innerHTML=cyclical(dayCyl)+"日";
		}
	return arr;
	}
	
/*点击年的左边耳朵*/
function preYear(){
	var sYear=Number(selectedYear());
	if(sYear==1901){
		}else{
		year.value=sYear-1;
		changeSelected();
		}
	}
	
/*点击年右边的耳朵*/
function nextYear(){
	var sYear=Number(selectedYear());
	if(sYear==2049){
		}else{
		year.value=sYear+1;
		changeSelected();
		}
	}
	
/*点击回到今天*/
function clickToday(){
	var today=setToday();
	var arr=pain();
	for(var i=0;i<arr.length;i++){
		if(arr[i].gday==today.getDate()&&arr[i].gmonth==(today.getMonth()+1)&&arr[i].gyear==today.getFullYear()){
			document.getElementsByClassName("day")[i].click();
			}
		}
	}
	
/*点击前一个月的操作*/
function preAction(){

	var sYear=Number(selectedYear());
	var sMonth=Number(selectedMonth());
	if(sYear==1901&&sMonth==1){
	}else{
		if(sMonth==1){
			year.value=sYear-1;
			month.value=12;
			}else{
				month.value=sMonth-1;  //这里要用month.value=...  如果用month.options[sMonth-1]=sMonth-1;不会有效果
				}
		changeSelected();
		}
	}
	
/*点击下一个月的操作*/
function nextAction(){
	var sYear=Number(selectedYear());
	var sMonth=Number(selectedMonth());
	if(sYear==2049&&sMonth==12){
		}else{
			if(sMonth==12){
				year.value=sYear+1;
				month.value=1;
				}else{
					month.value=sMonth+1;  //这里要用month.value=...  如果用month.options[sMonth-1]=sMonth-1;不会有效果
					}
			changeSelected();
		}
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
	// year.value=toyear;
	// month.value=tomonth+1;
	return today;
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
	var now=document.getElementById("now").getElementsByTagName("i")[0].innerHTML=hour+":"+minutes+":"+seconds;
	setTimeout(arguments.callee,1000);
	}
	
var Animals=new Array("鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪");
var Gan=new Array("甲","乙","丙","丁","戊","己","庚","辛","壬","癸");
var Zhi=new Array("子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥");
function cyclical(num) {
   return(Gan[num%10]+Zhi[num%12])
}

	
/*
	*显示日期的函数
	*startIndex表示月份的第一天位置。startIndex=0 表示开始为周日，startIndex=1，表示开始为周一。。。
	*dayNumber表示该月天数
*/
function display(startIndex,dayNumber,month,year){
	month=Number(month);
	year=Number(year);
	var rarr=new Array();
	
	/*显示上一个月*/
	var startPre;
	var dayPre;
	var arrayPre;
	var yearPre;
	var monthPre;
	/*设置以上参数*/
	if(year==1901&&month==1){
		for(var i=0;i<startIndex;i++){
			rarr[i]=null;
			}
		}else{
			if(month==1){
				yearPre=year-1;
				monthPre=12;
				}else{
					yearPre=year;
					monthPre=month-1;
					}
		startPre=findStartIndex(yearPre,monthPre);
		dayPre=monthDayNumber(yearPre,monthPre);
		arrayPre=displayWholeMonth(startPre,dayPre,monthPre,yearPre);
		for(var i=0;i<startIndex;i++){
			var obj=document.getElementsByClassName("day")[i];
			
			obj.innerHTML=arrayPre[(dayPre+startPre)-(startIndex-i)];
			if(obj){
				addClass(obj," pre");
			}
			var tempobj=new Object();
			tempobj.index=i;
			tempobj.gyear=yearPre;
			tempobj.gmonth=monthPre;
			tempobj.gday=parseInt(obj.innerHTML);
			tempobj.week=i%7;
			rarr[i]=tempobj;
			
			}
		}
		
	
		
	/*显示当月*/
	var array=displayWholeMonth(startIndex,dayNumber,month,year);
	for(var i=startIndex;i<dayNumber+startIndex;i++){
		var obj=document.getElementsByClassName("day")[i];
		obj.innerHTML=array[i];
		var tempobj=new Object();
		tempobj.index=i;
		tempobj.gyear=year;
		tempobj.gmonth=month;
		tempobj.gday=parseInt(obj.innerHTML);
		tempobj.week=i%7;
		rarr[i]=tempobj;
	}
	
	/*显示下一个月*/
	var startNext;
	var dayNext;
	var arrayNext;
	var yearNext;
	var monthNext;
	if(year==2049&&month==12){
		}else{
			if(month==12){
				yearNext=year+1;
				monthNext=1;
				}else{
					yearNext=year;
					monthNext=month+1;
					}
			startNext=findStartIndex(yearNext,monthNext);
			dayNext=monthDayNumber(yearNext,monthNext);
			arrayNext=displayWholeMonth(startNext,dayNext,monthNext,yearNext);
			var temp=dayNumber+startIndex;
			for(var i=temp;i<42;i++){
				var obj=document.getElementsByClassName("day")[i];
				if(obj){
					addClass(obj," next");
				}
				obj.innerHTML=arrayNext[startNext+(i-temp)];
				var tempobj=new Object();
				tempobj.index=i;
				tempobj.gyear=yearNext;
				tempobj.gmonth=monthNext;
				tempobj.gday=parseInt(obj.innerHTML);
				tempobj.week=i%7;
				rarr[i]=tempobj;
				}
			}
		return rarr;
}

/*
 *显示完整的月份信息
 *输入月份，年份，该年月的第一天星期几，一共多少天
 *输出一个数组，数组中储存了每个day中的日期，农历，阳历假期，即每个day中的内容
*/
function displayWholeMonth(startIndex,dayNumber,month,year){
	var weekHoliday=false;
	var number=0;
	var str;
	var f=100;
	var array=new Array();
	for(var i=startIndex;i<dayNumber+startIndex;i++){
		/*判断母亲节（5月的周日），父亲节（6月的周日），感恩节（11月的周四）*/
		if(month==5&&i%7==0||month==6&&i%7==0||month==11&&i%7==4){
			number++;
			}
		/*是第二个周日或者第3个周日或者第4个周四，将该i下的weekholiday置为true*/
		if(month==5&&number==2||month==6&&number==3||month==11&&number==4){
			f=i;
			weekHoliday=true;
			number=100;
			}
		/*设置了母亲节，父亲节，感恩节后的其他日子，将weekholiday重置回false*/
		if(i>f){
			weekHoliday=false;
			}
		str=comments(month,(i-startIndex+1),weekHoliday);
		array[i]=(i-startIndex+1)+displayNL(year,month,(i-startIndex+1))+str;
		}
	return array;
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
		}
	
	if(month==2){
		switch(day){
		case 2:
			str1="<br/><span class='comment'>世界湿地日</span>";
			break;
		case 14:
			str1="<br/><span class='comment'>情人节</span>";
			break;
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
			}
		}
	return str1;
	}


/*
	*添加类
*/
function addClass(obj,newClass){
	obj.className+=newClass;
	}
/*
	*删除类
*/
function removeClass(obj,moveclass){
	var c=obj.className;
	var a=c.split(" ");
	for(var i=0;i<a.length;i++){
		if(a[i]==moveclass){
			a.splice(i,1);
			}
		}
	obj.className="";
	for(var i=0;i<a.length;i++){
		obj.className=obj.className+" "+a[i];
		}
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

/*
	*显示农历
*/
function displayNL(gy,gm,gd){
	var nobj=GLtoNL(gy,gm,gd);
	var nmonth=ndisplayMonth(nobj.nmonth);
	if(nobj.rflag==true){
		nmonth="闰"+nmonth;
		}
	var nday=nldisplayDay(nobj.nday);
	/*var str="<br/><span class='nl'>"+nmonth+"月"+nday+"</span>";*/
	var str="<br/><span class='nl'>"+nday+"</span>";
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
	var dayCyl=days+40;
	var monthCyl=14;
	for(var i=1900;i<2050;i++){
		temp=totalDaysforNL(i);
		days=days-temp;
		monthCyl+=12;
		if(days<=0){
			break;
			}
		}
	if(days==0){//days==0的时候，是该年的1月31日，所以需要i+1
		++i;
		}
	if(days<0){
		days=days+temp;
		monthCyl-=12;
		}
	var nyear=i;
	var yearCyl=i-1864;
	
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
		if(flag==false){
			monthCyl++;
			}
		}
	/*如果是每月的初一*/
	if(days==0&&rm>0&&i==(rm+1)){
		if(flag){/*闰月后一个月初一*/
			flag=false;
			}else{/*闰月初一*/
				--i;
				flag=true;
				--monthCyl;
				}
		}
	if(days<0){/*每月的非初一，如果是每月的初一，那么它的前一个月被减去时，days=0，此时i++后出循环刚好是月份，因此这种情况不做处理*/
		--i;
		days=days+temp;
		--monthCyl;
		}
	var nmonth=i;
	var nday=days+1;
	var nobj=new Object();
	nobj.nyear=nyear;
	nobj.nmonth=nmonth;
	nobj.nday=nday;
	nobj.rflag=flag;
	nobj.yearCyl=yearCyl;
	nobj.monthCyl=monthCyl;
	nobj.dayCyl=dayCyl;
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
	var a=lunar[ny-1900].toString(16);//去掉0x转化为16进制
	var lu=parseInt(a,16).toString(2);//转化为10进制再转化为2进制
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
	var str=parseInt(first4,2);//将2进制转化为10进制
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
	   str=str+s[nd%10-1];
	   }else if(nd<20&&nd!=10){
		   str="十";
		   str=str+s[nd%10-1];
		   }else if(nd<30&&nd!=20&&nd!=10){
			   str="廿";
			   str=str+s[nd%10-1];
			   }
	
	if(nd==10){
		str="初十";
		}
	if(nd==20){
		str="廿";
		}
	if(nd==30){
		str="卅";
		}
   return str;
}

/*农历月份显示*/
function ndisplayMonth(nm){
	var str;
	var s=new Array('正','二','三','四','五','六','七','八','九','十','十一','十二');
	str=s[nm-1];
	return str;
	}