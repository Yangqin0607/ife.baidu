function Calendar(ele,fromdate,todate){
	this.dom=ele;
	this.fromdate=fromdate==null?new Date(1900,0,1):fromdate;
	this.todate=todate==null?new Date(2050,11,31):todate;
	this.d=0;
	this.init();
}
Calendar.prototype={
//----------------------------初始化------------------------------------------------------
	init:function(){
	//获取现在的时间对象
		var date=new Date();
		var y=parseInt(date.getFullYear());
		var m=parseInt(date.getMonth()+1);
		var d=parseInt(date.getDate());
		this.d=d;
	//创建日历头部，初始化年月选择框
		this.createHeader();

	//给box和输入框添加事件
		this.clickBox();
		this.inputchange();
		
		if(this.InvalidDateRender(y,m,d)){
			this.render(y,m,d);
		}else{
			this.render(this.fromdate.getFullYear(),parseInt(this.fromdate.getMonth())+1,this.fromdate.getDate());
		}
			
	},
		
//-------------------------------创建header----------------------------------------------------
	createHeader:function(){
		//显示日期范围
		var daterange=document.createElement('span');
		daterange.className='range';
		this.dom.parentNode.appendChild(daterange);
		var fy=parseInt(this.fromdate.getFullYear());
		var fm=parseInt(this.fromdate.getMonth())+1;
		fm=fm<10?'0'+fm:fm;
		var fd=parseInt(this.fromdate.getDate());
		fd=fd<10?'0'+fd:fd;
		var ty=this.todate.getFullYear();
		var tm=parseInt(this.todate.getMonth())+1;
		tm=tm<10?'0'+tm:tm;
		var td=parseInt(this.todate.getDate());
		var datetext='可选日期范围为：'+fy+'/'+fm+'/'+fd+'——'+ty+'/'+tm+'/'+td;
		daterange.appendChild(document.createTextNode(datetext));

		//显示错误提示
		var error=document.createElement('span');
		error.className='error';
		this.dom.parentNode.appendChild(error);

		var str='<div class="header"><i class="preYear sj pre"></i><select id="year"></select><i class="nextYear sj next"></i><i class="preMonth sj pre"></i><select id="month"></select><i class="nextMonth sj next"></i><div class="week"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div></div><div class="box"></div>';
		var container=document.createElement('div');
		container.className='container';
		this.dom.parentNode.appendChild(container);
		container.innerHTML=str;

		this.dom.parentNode.position='relative';
		container.style.position='absolute';
		container.style.left=this.dom.offsetLeft+'px';
		container.style.top=(this.dom.offsetTop+this.dom.offsetHeight+2)+'px';
		
		//初始化年月选择框，并添加选择框改变事件
		this.initSelectYear();
		this.initSelctMonth();
		this.yearormonthChange();
	},
//-------------------------------判断给定日期是否在日期范围内，如果在范围内返回true，否则false------
	InvalidDateRender:function(year,month,day){
		
		var date=new Date(year,month-1,day);
		var fd=this.fromdate.getTime();
		var td=this.todate.getTime();
		var d=date.getTime();

		if(d>=fd&&d<=td){
			return true;
		}else{
			return false;
		}
		
	},
//-------------------------------绘制box-------------------------------------------------------
	render:function(year,month,day){
		document.getElementsByClassName('error')[0].innerHTML='';
		year=parseInt(year);
		month=parseInt(month);
		if(day==undefined){
			day=this.d;
		}else{
			day=parseInt(day);
		}
		var box=document.getElementsByClassName('box')[0];
		
		var arr=MonthDate.displayMonth(year,month);
		var str='';
		var flag=false;
		var preyear=year;
		var premonth=month;
		var nextyear=year;
		var nextmonth=month;
		switch(month){
			case 1:
				preyear-=1;
				premonth=12;
				break;
			case 12:
				nextyear+=1;
				nextmonth=1;
				break;
			default:
				premonth-=1;
				nextmonth+=1;
		}
		var othermonth=MonthDate.preAndnextDays(year,month);
		for(var i=0;i<othermonth.preMonth;i++){
			if(this.InvalidDateRender(preyear,premonth,arr[i])){
				str+='<span class="day predays">'+arr[i]+'</span>';
			}else{
				str+='<span class="day predays invalid">'+arr[i]+'</span>';
			}
		}
		var dayNumber=MonthDate.getMonthDays(year,month);
		for(var j=i;j<dayNumber+i;j++){
			if(this.InvalidDateRender(year,month,arr[j])){
				if(flag==false&&arr[j]==day){
					flag=true;
					str+='<span class="day chosen">'+arr[j]+'</span>';
				}else{
					str+='<span class="day">'+arr[j]+'</span>';
				}
			}else{
				str+='<span class="day invalid">'+arr[j]+'</span>';
			}
		}
		for(var i=j;i<42;i++){
			if(this.InvalidDateRender(nextyear,nextmonth,arr[i])){
				str+='<span class="day nextdays">'+arr[i]+'</span>';
			}else{
				str+='<span class="day nextdays invalid">'+arr[i]+'</span>';	
			}
		}
		box.innerHTML='';
		box.innerHTML=str;

		this.setMonthandYear(year,month);
		if(this.InvalidDateRender(year,month,day)){
			this.setInputValue(year,month,day);	
		}else{
			year=parseInt(this.fromdate.getFullYear());
			month=parseInt(this.fromdate.getMonth())+1;
			day=parseInt(this.fromdate.getDate());
			this.setInputValue(year,month,day);
		}
		
	},
//-----------------------初始化年选择框-------------------------------------------------------
	initSelectYear:function(){
		var year=document.getElementById('year');
		var month=document.getElementById('month');
		for(var i=1900;i<=2050;i++){
			var newoption=new Option(i+'年',i);
			year.add(newoption,undefined);
		}
	},
//----------------------初始化月选择框-------------------------------------------------------
	initSelctMonth:function(){
		var year=document.getElementById('year');
		var month=document.getElementById('month');
		for(var i=1;i<=12;i++){
			var newoption=new Option(i+'月',i);
			month.add(newoption,undefined);
		}
	},
//----------------------设置输入框的值---------------------------------------------------
	setInputValue:function(year,month,day){
		if(parseInt(month)<10){
			month='0'+month;
		}
		if(parseInt(day)<10){
			day='0'+day;
		}
		this.dom.value=year+'/'+month+'/'+day;
	},

//-------------------给box添加事件----------------------------------------------------
	clickBox:function(){
		var box=document.getElementsByClassName('box')[0];
		var self=this;

		EventUtil.addHandler(box,'click',function(e){
			var selectedyear=parseInt(year.options[year.selectedIndex].value);
			var selectedmonth=parseInt(month.options[month.selectedIndex].value);
			var d=e.target.innerHTML;
			self.d=parseInt(d);
			if(e.target.className.indexOf('invalid')!=-1){
				document.getElementsByClassName('error')[0].innerHTML='点击的日期超出了范围';
			}else if(e.target.className.indexOf('predays')!=-1){
				if(selectedmonth==1&&selectedyear==1900){
					document.getElementsByClassName('error')[0].innerHTML='点击的日期超出了范围';
				}else if(selectedmonth==1){
					self.render(selectedyear-1,12,d);
				}else{
					self.render(selectedyear,selectedmonth-1,d);
				}
			}else if(e.target.className.indexOf('nextdays')!=-1){
				if(selectedmonth==12&&selectedyear==2050){
					document.getElementsByClassName('error')[0].innerHTML='点击的日期超出了范围';
				}else if(selectedmonth==12){
						self.render(selectedyear+1,1,d);
				}else{
					self.render(selectedyear,selectedmonth+1,d);
				}
			}else if(e.target.className.indexOf('day')!=-1){
				self.render(selectedyear,selectedmonth,d);
			}
			
		});
	},
//-------------------------输入框改变事件-------------------------------------------------
	inputchange:function(){
		var self=this;
		EventUtil.addHandler(this.dom,'change',function(e){
			validate(this.value);
		});
		function validate(text){
			var reg=/^\d{4}(\/)\d{1,2}\1\d{1,2}$/g;
			if(reg.exec(text)){
				var arr=text.split('/');
				var year=parseInt(arr[0]);
				var month=parseInt(arr[1]);
				var day=parseInt(arr[2]);
				if(self.InvalidDateRender(year,month,day)){
					self.render(year,month,day);
				}else{
					document.getElementsByClassName('error')[0].innerHTML='请输入指定范围内的日期';
				}
				
			}else{
				document.getElementsByClassName('error')[0].innerHTML='请输入正确的日期形式 xxxx/xx/xx';
			}
		}
	},

//------------------------给选择框和两个小耳朵添加事件--------------------------------------
	yearormonthChange:function(){
		var year=document.getElementById('year');
		var month=document.getElementById('month');
		var header=document.getElementsByClassName('header')[0];
		var box=document.getElementsByClassName('box')[0];
		var self=this;
		
		EventUtil.addHandler(month,'change',change);
		EventUtil.addHandler(year,'change',change);
		EventUtil.addHandler(header,'click',clickEvent); //给两个小耳朵添加事件
		

		function change(){
			var selectedyear=year.options[year.selectedIndex].value;
			var selectedmonth=month.options[month.selectedIndex].value;
			self.render(parseInt(selectedyear),parseInt(selectedmonth));
		}
		function clickEvent(event){
			event=EventUtil.getEvent(event);
			var target=EventUtil.getTarget(event);
			var selectedyear=parseInt(year.options[year.selectedIndex].value);
			var selectedmonth=parseInt(month.options[month.selectedIndex].value);
			if(target.className.indexOf('preYear')!=-1){
				if(selectedyear!=1900){
					self.render(selectedyear-1,selectedmonth);
				}else{
					document.getElementsByClassName('error')[0].innerHTML='点击的日期超出了范围';
				}
			}
			if(target.className.indexOf('nextYear')!=-1){
				if(selectedyear!=2050){
					self.render(selectedyear+1,selectedmonth);
				}else{
					document.getElementsByClassName('error')[0].innerHTML='点击的日期超出了范围';
				}
			}
			if(target.className.indexOf('preMonth')!=-1){
				if(selectedmonth==1&&selectedyear==1900){
					document.getElementsByClassName('error')[0].innerHTML='点击的日期超出了范围';
				}else if(selectedmonth==1){
					self.render(selectedyear-1,12);
				}else{
					self.render(selectedyear,selectedmonth-1);
				}
			}
			if(target.className.indexOf('nextMonth')!=-1){
				if(selectedmonth==12&&selectedyear==2050){
					document.getElementsByClassName('error')[0].innerHTML='点击的日期超出了范围';
				}else if(selectedmonth==12){
					self.render(selectedyear+1,1);
				}else{
					self.render(selectedyear,selectedmonth+1);
				}
			}
		}
	},
//---------------------------------------设置选择框的值------------------------------------------
	setMonthandYear:function(y,m){
		y=parseInt(y);
		m=parseInt(m);
		var year=document.getElementById('year');
		var month=document.getElementById('month');
		year.options[y-1900].selected=true;
		month.options[m-1].selected=true;
	},
}


