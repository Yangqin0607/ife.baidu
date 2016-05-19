var table=document.getElementById('sortTable');

function sortTable(table,tableHead,srcData){
	this.dom=table;    //指向table的dom元素
	this.head=tableHead;  //表头对象
	this.data=srcData;   //tbody数据区
	this.init();   //初始化
}
sortTable.prototype={
//----------------初始化----------------------------------------------------
//默认排序为第一个可排序列的升序排列
	init:function(){
		this.createThead();
		var arrHead=this.createArrHead();
		var name=null;
		for(var i=0;i<arrHead.length;i++){
			if(arrHead[i][1]==true){
				name=arrHead[i][0];
				break;
			}
		}
		this.sort(name,'up');
	},
//------------------------排序-------------------------------------------
	sort:function(name,classname){
		var arrBody=this.createArrBody();
		var arrHead=this.createArrHead();
		var col=0;
		//找到要排序的是第几列，返回列号
		for(var i=0;i<arrHead.length;i++){
			if(arrHead[i][0]==name){
				col=i;
				break;
			}
		}
		var arrBody=this.BubbleSort(arrBody,classname,col);
		//更新tbody区数据
		this.createTBody(arrBody);
	},
//-----------------冒泡排序-----------------------------------
	BubbleSort:function(arr,classname,col){
		if(classname=='up'){
			for(var i=0;i<arr.length;i++){
				for(var j=0;j<arr.length-i-1;j++){
					if(arr[j][col]>arr[j+1][col]){
						var temp=arr[j];
						arr[j]=arr[j+1];
						arr[j+1]=temp;
					}
				}
			}
		}
		if(classname=='down'){
			for(var i=0;i<arr.length;i++){
				for(var j=0;j<arr.length-i-1;j++){
					if(arr[j][col]<arr[j+1][col]){
						var temp=arr[j];
						arr[j]=arr[j+1];
						arr[j+1]=temp;
					}
				}
			}
		}
		return arr;
	},
//---------------利用this.data产生用于tbody的数据组成的数组----------------------
	createArrBody:function(){
		var arrBody=[],j=0;
		for(var item in this.data){
			arrBody[j]=new Array();
			arrBody[j].unshift(item);
			arrBody[j]=arrBody[j].concat(this.data[item]);
			j++;
		}
		console.log(arrBody);
		return arrBody;
	},
//------------利用this.head产生用于表头的数据组成的数组-----------------------
	createArrHead:function(){
		var arrTHead=[],j=0;
		for(var item in this.head){
			arrTHead[j]=new Array();
			arrTHead[j].push(item);
			arrTHead[j].push(this.head[item]);
			j++;
		}
		return arrTHead;
	},
//------------根据传入的数组创建tbody内容------------------------
	createTBody:function(arrBody){
		var tbody=this.dom.tBodies[0];
		tbody.innerHTML='';
		//开始向tbody中插入数据
		for(var i=0;i<arrBody.length;i++){
			tbody.insertRow(i);
			for(var j=0;j<arrBody[i].length;j++){
				tbody.rows[i].insertCell(j);
				tbody.rows[i].cells[j].appendChild(document.createTextNode(arrBody[i][j]));
			}
		}
	},
//-----------创建表格的表头部分以及tbody-------------------------
	createThead:function(){
		this.dom.createTHead();
		var arrTHead=this.createArrHead();
		for(var i=0;i<arrTHead.length;i++){
			var th=document.createElement('th');
			var sp=document.createElement('span');
			sp.appendChild(document.createTextNode(arrTHead[i][0]))
			th.appendChild(sp);
			if(arrTHead[i][1]==true){
				var log1=document.createElement('i');
				log1.className='up';
				var log2=document.createElement('i');
				log2.className='down';
				th.appendChild(log1);
				th.appendChild(log2);
			}
			this.dom.tHead.appendChild(th);
		}
//---------------------------------添加事件------------------------
		var self=this;
		this.dom.tHead.addEventListener('click',function(e){
			if(e.target.className=='up'||e.target.className=='down'){
				var name=e.target.parentNode.getElementsByTagName('span')[0].innerHTML;
				self.sort(name,e.target.className);
			}
		});
		var tbody=document.createElement('tbody');
		this.dom.appendChild(tbody);
	},
}

new sortTable(table, tableHead, srcData);