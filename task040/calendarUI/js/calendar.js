function Calendar(ele,container,fromdate,todate,error){
	this.dom=ele;
	this.container=container;
	this.fromdate=fromdate==null?new Date(1900,0,1):fromdate;
	this.todate=todate==null?new Date(2050,11,31):todate;
	this.error=error||null;
	this.d=0;
	this.inputValue={};
	this.init();
	this.visible=false;
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
		this.toggleClass();
		
		if(this.InvalidDateRender(y,m,d)){
			this.render(y,m,d);
		}else{
			this.render(this.fromdate.getFullYear(),parseInt(this.fromdate.getMonth())+1,this.fromdate.getDate());
		}
			
	},
		
//-------------------------------创建header----------------------------------------------------
	createHeader:function(){
		var str='<div class="cyq_header">';
		str+='<i class="cyq_preYear cyq_sj cyq_pre"></i><select class="year cyq_select"></select><i class="cyq_nextYear cyq_sj cyq_next"></i>';
		str+='<i class="cyq_preMonth cyq_sj cyq_pre"></i><select class="month cyq_select"></select><i class="cyq_nextMonth cyq_sj cyq_next"></i>';
		str+='<div class="cyq_week"><span>Mon</span><span>Tue</span><span>Wed</span><span>Thu</span><span>Fri</span><span>Sat</span><span>Sun</span></div>';
		str+='</div>';
		str+='<div class="cyq_box"></div>';
		str+='<div class="cyq_footer"><button id="cyq_submit">确定</button><button id="cyq_reset" type="reset">取消</button></div>';
		var container=document.createElement('div');
		container.className='cyq_container cyq_hide';
		this.container.appendChild(container);
		container.innerHTML=str;

		this.container.position='relative';
		container.style.position='absolute';
		container.style.left=this.dom.offsetLeft+'px';
		container.style.top=(this.dom.offsetTop+this.dom.offsetHeight+2)+'px';
		
		//显示日期范围
		var daterange=document.createElement('span');
		daterange.className='cyq_range';
		container.appendChild(daterange);
		var fy=parseInt(this.fromdate.getFullYear());
		var fm=parseInt(this.fromdate.getMonth())+1;
		fm=fm<10?'0'+fm:fm;
		var fd=parseInt(this.fromdate.getDate());
		fd=fd<10?'0'+fd:fd;
		var ty=this.todate.getFullYear();
		var tm=parseInt(this.todate.getMonth())+1;
		tm=tm<10?'0'+tm:tm;
		var td=parseInt(this.todate.getDate());
		var datetext='可选日期范围为：'+fy+'/'+fm+'/'+fd+'—'+ty+'/'+tm+'/'+td;
		daterange.appendChild(document.createTextNode(datetext));

		//初始化年月选择框，并添加选择框改变事件
		this.initSelectYear();
		this.initSelctMonth();
		this.yearormonthChange();
		this.submitButton();
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
		if(this.visible==true){
			if(this.error!=null){
				this.error.innerHTML='';
			}
			year=parseInt(year);
			month=parseInt(month);
			if(day==undefined){
				day=this.d;
			}else{
				day=parseInt(day);
			}
		
			var box=this.container.getElementsByClassName('cyq_box')[0];

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
					str+='<span class="cyq_day cyq_predays">'+arr[i]+'</span>';
				}else{
					str+='<span class="cyq_day cyq_predays cyq_invalid">'+arr[i]+'</span>';
				}
			}
			var dayNumber=MonthDate.getMonthDays(year,month);
			for(var j=i;j<dayNumber+i;j++){
				if(this.InvalidDateRender(year,month,arr[j])){
					if(flag==false&&arr[j]==day){
						flag=true;
						str+='<span class="cyq_day cyq_chosen">'+arr[j]+'</span>';
					}else{
						str+='<span class="cyq_day">'+arr[j]+'</span>';
					}
				}else{
					str+='<span class="cyq_day cyq_invalid">'+arr[j]+'</span>';
				}
			}
			for(var i=j;i<42;i++){
				if(this.InvalidDateRender(nextyear,nextmonth,arr[i])){
					str+='<span class="cyq_day cyq_nextdays">'+arr[i]+'</span>';
				}else{
					str+='<span class="cyq_day cyq_nextdays cyq_invalid">'+arr[i]+'</span>';	
				}
			}
			box.innerHTML='';
			box.innerHTML=str;

			this.setMonthandYear(year,month);
			if(this.InvalidDateRender(year,month,day)){
				this.inputValue={year:year,month:month,day:day};	
			}else{
				year=parseInt(this.fromdate.getFullYear());
				month=parseInt(this.fromdate.getMonth())+1;
				day=parseInt(this.fromdate.getDate());
				this.inputValue={year:year,month:month,day:day};
			}
		}else{
			this.setInputValue(year,month,day);
		}
	},
//-----------------------初始化年选择框-------------------------------------------------------
	initSelectYear:function(){
		var year=this.container.getElementsByClassName('year')[0];
		var month=this.container.getElementsByClassName('month')[0];
		for(var i=1900;i<=2050;i++){
			var newoption=new Option(i+'年',i);
			year.add(newoption,undefined);
		}
	},
//----------------------初始化月选择框-------------------------------------------------------
	initSelctMonth:function(){
		var year=this.container.getElementsByClassName('year')[0];
		var month=this.container.getElementsByClassName('month')[0];
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
		var box=this.container.getElementsByClassName('cyq_box')[0];
		var year=this.container.getElementsByClassName('year')[0];
		var month=this.container.getElementsByClassName('month')[0];
		var self=this;

		EventUtil.addHandler(box,'click',function(e){
			var selectedyear=parseInt(year.options[year.selectedIndex].value);
			var selectedmonth=parseInt(month.options[month.selectedIndex].value);
			var d=e.target.innerHTML;
			self.d=parseInt(d);
			if(e.target.className.indexOf('cyq_invalid')!=-1){
				if(self.error!=null){
					self.error.innerHTML='您选择的日期超出了范围';
				}
			}else if(e.target.className.indexOf('cyq_predays')!=-1){
				if(selectedmonth==1&&selectedyear==1900){
					if(self.error!=null){
						self.error.innerHTML='您选择的日期超出了范围';
					}
				}else if(selectedmonth==1){
					self.render(selectedyear-1,12,d);
					// self.hide();
				}else{
					self.render(selectedyear,selectedmonth-1,d);
					// self.hide();
				}
			}else if(e.target.className.indexOf('cyq_nextdays')!=-1){
				if(selectedmonth==12&&selectedyear==2050){
					if(self.error!=null){
						self.error.innerHTML='您选择的日期超出了范围';
					}
					
				}else if(selectedmonth==12){
						self.render(selectedyear+1,1,d);
						// self.hide();
				}else{
					self.render(selectedyear,selectedmonth+1,d);
					// self.hide();
				}
			}else if(e.target.className.indexOf('cyq_day')!=-1){
				var allspan=e.target.parentNode.getElementsByTagName('span');
				for(var i=0;i<allspan.length;i++){
					EventUtil.removeClass(allspan[i],'cyq_chosen');
				}
				EventUtil.addClass(e.target,'cyq_chosen');
				self.inputValue={year:selectedyear,month:selectedmonth,day:d};
				// self.hide();
			}
			
		});
	},
//-------------------------输入框改变事件-------------------------------------------------
	inputchange:function(){
		var self=this;
		EventUtil.addHandler(this.dom,'change',function(e){
			// alert(1);
			self.validate(this.value);
		});
	},
//--------------------------------输入框验证函数--------------------------------
	validate:function(text){
		var reg=/^\d{4}(\/)\d{1,2}\1\d{1,2}$/g;
		if(reg.exec(text)){
			var arr=text.split('/');
			var year=parseInt(arr[0]);
			var month=parseInt(arr[1]);
			var day=parseInt(arr[2]);
			if(this.InvalidDateRender(year,month,day)){
				this.render(year,month,day);
			}else{
				if(this.error!=null){
					this.error.innerHTML='请输入指定范围内的日期';
				}
			}
			
		}else{
			if(this.error!=null){
				this.error.innerHTML='请输入正确的日期形式 xxxx/xx/xx';
			}
		}
	},
	

//------------------------给选择框和两个小耳朵添加事件--------------------------------------
	yearormonthChange:function(){
		var year=this.container.getElementsByClassName('year')[0];
		var month=this.container.getElementsByClassName('month')[0];
		var header=this.container.getElementsByClassName('cyq_header')[0];
		var box=this.container.getElementsByClassName('cyq_box')[0];
		var self=this;
		
		EventUtil.addHandler(month,'change',change);
		EventUtil.addHandler(year,'change',change);
		EventUtil.addHandler(header,'click',clickEvent); //给两个小耳朵添加事件
		
		//下拉框改变事件
		function change(){
			var selectedyear=year.options[year.selectedIndex].value;
			var selectedmonth=month.options[month.selectedIndex].value;
			self.render(parseInt(selectedyear),parseInt(selectedmonth));
		}
		//小耳朵改变事件
		function clickEvent(event){
			event=EventUtil.getEvent(event);
			var target=EventUtil.getTarget(event);
			var selectedyear=parseInt(year.options[year.selectedIndex].value);
			var selectedmonth=parseInt(month.options[month.selectedIndex].value);
			if(target.className.indexOf('preYear')!=-1){
				if(selectedyear!=1900){
					self.render(selectedyear-1,selectedmonth);
				}else{
					if(self.error!=null){
						self.error.innerHTML='您选择的日期超出了范围';
					}
				}
			}
			if(target.className.indexOf('nextYear')!=-1){
				if(selectedyear!=2050){
					self.render(selectedyear+1,selectedmonth);
				}else{
					if(self.error!=null){
						self.error.innerHTML='您选择的日期超出了范围';
					}
				}
			}
			if(target.className.indexOf('preMonth')!=-1){
				if(selectedmonth==1&&selectedyear==1900){
					if(self.error!=null){
						self.error.innerHTML='您选择的日期超出了范围';
					}
				}else if(selectedmonth==1){
					self.render(selectedyear-1,12);
				}else{
					self.render(selectedyear,selectedmonth-1);
				}
			}
			if(target.className.indexOf('nextMonth')!=-1){
				if(selectedmonth==12&&selectedyear==2050){
					if(self.error!=null){
						self.error.innerHTML='您选择的日期超出了范围';
					}
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
		var year=this.container.getElementsByClassName('year')[0];
		var month=this.container.getElementsByClassName('month')[0];
		year.options[y-1900].selected=true;
		month.options[m-1].selected=true;
	},
	show:function(){
		var container=this.container.getElementsByClassName('cyq_container')[0];
		this.visible=true;
		EventUtil.removeClass(container,'cyq_hide');
		this.validate(this.dom.value);
	},
	hide:function(){
		var container=this.container.getElementsByClassName('cyq_container')[0];
		this.visible=false;
		EventUtil.addClass(container,'cyq_hide');
		// this.validate(this.dom.value);
	},
//------------------------------------输入框点击事件--------------------------------------------
	toggleClass:function(){
		var self=this;
		
		EventUtil.addHandler(this.dom,'click',function(){
			// alert(this);
			var container=self.container.getElementsByClassName('cyq_container')[0];
			if(container.className.indexOf('cyq_hide')!=-1){
				self.show();
			}else{
				self.hide();
			}
		})
	},
	submitButton:function(){
		var foot=this.container.getElementsByClassName('cyq_footer')[0];
		var self=this;
		EventUtil.addHandler(foot,'click',function(event){
			// alert(event.target.id);
			if(event.target.id=="cyq_submit"){
				self.setInputValue(self.inputValue.year,self.inputValue.month,self.inputValue.day);
			}
			self.hide();
		});
		
	},
}


