function TreeNode(obj){
	this.parent=obj.parent;
	this.childs=obj.childs;
	this.data=obj.data;
	this.domeName=obj.domeName;
	this.domeName.TreeNode=this;//为了将Dom地址映射到TreeNode
}

TreeNode.prototype={
	constructor:TreeNode,
	hasChilds:function(){
		return this.childs.length>0?true:false;
	},
	addChilds:function(nodeTitle){
		// alert(typeof nodeTitle);
		if(nodeTitle.trim()=='') return this;
		var parNode=document.createElement('div');
		parNode.className='parent visibleP';

		var headNode=document.createElement('div');
		headNode.className='header';
		parNode.appendChild(headNode);

		var sjNode=document.createElement('img');
		sjNode.className='sj visi_hide rsj';
		sjNode.src="img/rsj.svg";
		headNode.appendChild(sjNode);

		var spanNode=document.createElement('span');
		spanNode.className='data';
		spanNode.appendChild(document.createTextNode(nodeTitle));
		headNode.appendChild(spanNode);

		var tjNode=document.createElement('img');
		tjNode.className='tj display_none';
		tjNode.src='img/add.png';
		headNode.appendChild(tjNode);

		var delNode=document.createElement('img');
		delNode.className='del display_none';
		delNode.src='img/delete.svg';
		headNode.appendChild(delNode);

		//将孩子都新建为TreeNode对象并存入childs数组，只有div class=parent才是子孩子，header不是
		this.childs.push(new TreeNode({parent: this, childs: [], data: nodeTitle, domeName: parNode}));
		this.domeName.appendChild(parNode);
		this.render();
		return this;
	},
	deleteChilds:function(){
		//这里用递归删除而不是直接childs=[]，是因为所有的child都是TreeNode对象，方便回收
		if(this.hasChilds()){
			for(var i=0;i<this.childs.length;i++){
				this.childs[i].deleteChilds();
			}
		}
		var childrens=this.parent.childs;
		for(var i=0;i<childrens.length;i++){
			if(childrens[i]==this){
				this.parent.childs.splice(i,1);
				break;
			}
		}
		this.parent.render();
		this.parent.domeName.removeChild(this.domeName);
	},
	render:function(){
		var str1,str2;
		if(this.hasChilds()){
			if(this.isToggle()){
				str1='sj dsj';
				str2='img/dsj.svg'
			}else{
				str1='sj rsj';
				str2='img/rsj.svg';
			}
			this.domeName.children[0].children[0].className=str1;
			this.domeName.children[0].children[0].src=str2;
		}else{
			this.domeName.children[0].children[0].className='sj visi_hide rsj';
		}
	},
	toggleClass:function(){
		var temp;
		if(this.hasChilds()){
			if(this.isToggle()){
				temp='parent hideP';
			}else{
				temp='parent visibleP';
			}
			this.domeName.className=temp;
		}
		this.render();
	},
	isToggle:function(){
		var flag=false;
		if(this.hasChilds()){
			if(this.domeName.className.indexOf('visible')!=-1){
				flag=true;//折叠返回false
			}
		}
		return flag;
	}
	
}

//新建根部TreeNode
var treeObj={
	parent:[],
	childs:[],
	data:"前端工程师",
	domeName:document.getElementsByClassName("parent")[0]
}
var treeRoot=new TreeNode(treeObj);

//给treearea绑定委托事件
treearea=document.getElementById("treearea");
treearea.addEventListener("click",function(e){
	var target=e.target;
	
	if(target.className.indexOf('tj')!=-1){
		var str=prompt('请输入子节点名称');
		while(target.className.indexOf('parent')==-1){
			target=target.parentNode;
		}
		target.TreeNode.addChilds(str);
		// e.stopPropagation();
	}
	if(target.className.indexOf('del')!=-1){
		while(target.className.indexOf('parent')==-1){
			target=target.parentNode;
		}
		target.TreeNode.deleteChilds();
	}
	if(target.className.indexOf('data')!=-1||target.className.indexOf('sj')!=-1){
		while(target.className.indexOf('parent')==-1){
			target=target.parentNode;
		}
			target.TreeNode.toggleClass();
		}
});

//查找功能
var search=document.getElementById('searchText');
var searchtext='';
search.onchange=function(){
	if(this.value.trim()!=''){
		searchtext=this.value;
	}
}
var clearbutton=document.getElementById('clear');
clearbutton.onclick=function(){
	search.value='';
}

treeRoot.search=function(text){
	var queue=[];
	var resultNode=[];
	var resultdata=[];
	queue.push(this);
	while(queue.length>0){
		var temp=queue.shift();
		resultNode.push(temp);
		resultdata.push(temp.data);
		for(var i=0;i<temp.childs.length;i++){
			queue.push(temp.childs[i]);
		}
	}
	
	var result=[];
	for(var i=0;i<resultdata.length;i++){
		var reg=new RegExp(text,'g');
		if(reg.exec(resultdata[i])){
			result.push(resultNode[i]);
		}
	}
	return result;
}
var searchbutton=document.getElementById('search');
searchbutton.onclick=function(){
	var div=treearea.getElementsByTagName('div')
	for(var i=0;i<div.length;i++){
		div[i].style.backgroundColor='#fff';
	}
	if(searchtext==''){
		 document.getElementById('result').innerHTML='请输入您要查找的节点名称';
	}else{
	var result=treeRoot.search(searchtext);
	if(result==0){
		document.getElementById('result').innerHTML='没有找到符合条件';
	}else{
			document.getElementById('result').innerHTML='找到了'+result.length+'个'+searchtext;
			for(var i=0;i<result.length;i++){
				var temp=result[i];
				// temp.render();
				result[i].domeName.children[0].style.backgroundColor='pink';
				while(temp.parent!=null&&temp.parent instanceof TreeNode){//这里要一级一级判断是否隐藏了，同时判断parent是否为TreeNode对象
					if(!temp.parent.isToggle()){
						temp.parent.toggleClass();
					}
					temp=temp.parent;
				}
			}
		}
	}
}

//demo
treeRoot.addChilds('child01').addChilds('child02').addChilds('child03');
treeRoot.childs[0].addChilds('child11').addChilds('child12').addChilds('child13');
treeRoot.childs[0].childs[0].addChilds('child42');
treeRoot.childs[1].addChilds('child21').addChilds('child22').addChilds('child23');
treeRoot.childs[2].addChilds('child31').addChilds('child32').addChilds('child33');
treeRoot.childs[2].childs[2].addChilds('children');