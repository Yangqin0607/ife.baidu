MonthDate={
//-------------获取 某年某月 的第一天是星期几-----------------
//------------0:周日  1：周一。。。 6：周六-------------------
	getStartDate:function(year,month){
		var date=new Date(year,month-1,1);
		return date.getDay();
	},
//-------------获取 某年某月 的天数------------------------------------------------------
	getMonthDays:function(year,month){
		switch(month){
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				return 31;
			case 4:
			case 6:
			case 9:
			case 11:
				return 30;
			case 2:
				if(year%4==0&&year%100!=0||year%400==0){
					return 29;
				}else{
					return 28;
				}
		}
	},
//----------------------------得到 某年某月 的日期数组-----------------------------
	getMonthArr:function(year,month){
		var arr=[];
		var monthdays=this.getMonthDays(year,month);
		for(var i=1;i<=monthdays;i++){
			arr.push(i);
		}
		return arr;
	},
//--------------------------获取月份排布中 前一个月  后一个月 应该显示在当月的天数---------------
	preAndnextDays:function(year,month){
		var startWeek=this.getStartDate(year,month);  //获取本月的第一天是周几
		var monthdays=this.getMonthDays(year,month);  //获取本月的天数
		var preMonth=startWeek==0?7:startWeek;        //获取在表格中显示的上一个月的天数
		var nextMonth=42-(preMonth+monthdays);        //获取在表格中显示的下一个月的天数
		return{
			preMonth:preMonth,
			nextMonth:nextMonth
		}
	},
//获取一个长度为42位的数组
	displayMonth:function(year,month){
		var preMonthArr=[];//上一个月的所有日期
		var nextMonthArr=[];//下一个月的所有日期

		var temp=this.preAndnextDays(year,month);

		var monthArr=this.getMonthArr(year,month);//本月的所有日期

		//为一些特殊情况初始化上一个月和下一个月日期数组
		if(month==1){
			preMonthArr=this.getMonthArr(year-1,12);
		}else{
			preMonthArr=this.getMonthArr(year,month-1);
		}
		if(month==12){
			nextMonthArr=this.getMonthArr(year+1,1);
		}else{
			nextMonthArr=this.getMonthArr(year,month+1);
		}
		
		var preMonthLen=preMonthArr.length;
		for(var i=0;i<temp.preMonth;i++){
			monthArr.unshift(preMonthArr[preMonthLen-1-i]);
		}
		for(var i=0;i<temp.nextMonth;i++){
			monthArr.push(nextMonthArr[i]);
		}
		return monthArr;
	},
}