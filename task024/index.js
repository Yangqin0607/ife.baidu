var btn1=document.getElementById("btn1");
var btn2=document.getElementById("btn2");
var tool=document.getElementsByClassName("tool")[0];
var div=document.getElementsByClassName("container")[0].getElementsByTagName("div");
var treeroot=document.getElementsByClassName("root")[0];
var find=document.getElementsByClassName("cx")[0];
var add=document.getElementsByClassName("add")[0];
var list=[];
var wordlist=[];
var num=0;
var gdlist=[];
var timer=null;
var val=null;
var addval=" ";
var flag=false;
var dellist=[];
// var index;
treeroot.onclick=function(e){
	dellist=[];
	reset();
	e.target.style.backgroundColor='yellow';
	dellist.push(e.target);
}
find.onchange=function(){
	val=this.value;
}
add.onchange=function(){
	addval=this.value;
}
tool.onclick=function(e){
	if(e.target.name=="buttn"){
		clickbtn(e.target.id);
	}
}
function clickbtn(id){
	list=[];
	num=0;
	wordlist=[];
	flag=false;
	var findError=document.getElementsByClassName('btn2')[0].getElementsByClassName("error")[0];
	findError.innerText="";
	var delError=document.getElementsByClassName("btn3")[0].getElementsByClassName("delError")[0];
	delError.innerText="";
	var addError=document.getElementsByClassName("btn4")[0].getElementsByClassName("addError")[0];
	addError.innerText="";
	switch (id){
		case "btn1":
			clearTimeout(timer);
			reset();
			preOrder(treeroot);
			changeColor(flag);
			break;
		case "btn2":
			clearTimeout(timer);
			reset();
			levelOrderTraversal(treeroot);
			changeColor(flag);
			break;
		case "btn3":
			clearTimeout(timer);
			reset();
			preOrder(treeroot);
			// changeColor();
			cxfind(val);
			break;
		case "btn4":
			clearTimeout(timer);
			reset();
			levelOrderTraversal(treeroot);
			// changeColor(flag);
			cxfind(val);
			break;
		case "btn5":
			del();
			break;
		case "btn6":
			addElement();
			break;
	}
}
function addElement(){
	if(dellist.length==0){
		var addError=document.getElementsByClassName("btn4")[0].getElementsByClassName("addError")[0];
		addError.innerText="请先选中父节点";
	}else{
		dellist[0].innerHTML+='<div class="child" style="background-color:#fff">'+addval+'</div>';
	}
}

function del(){
	if(dellist.length==0){
		var delError=document.getElementsByClassName("btn3")[0].getElementsByClassName("delError")[0];
		delError.innerText="请选择您要删除的节点";
	}else{
		var p=dellist[0].parentNode;
		p.removeChild(dellist[0]);
		dellist=[];
	}
}
function preOrder(treeroot){
	if(!(treeroot==null)){
			list.push(treeroot);
			wordlist.push(treeroot.innerText.split('\n')[0]);
			for(var i=0;i<treeroot.children.length;i++){
				preOrder(treeroot.children[i]);
			}
	}
}
function levelOrderTraversal(treeroot){
	if(treeroot==null) return;
	gdlist.push(treeroot);
	var temp;
	while(gdlist.length!=0){
		var shiftchild=gdlist.shift();
		temp=shiftchild;
		list.push(shiftchild);
		wordlist.push((shiftchild.innerText.split('\n')[0]));
		for(var i=0;i<temp.children.length;i++){
			gdlist.push(temp.children[i]);
		}
	}
}
function cxfind(ftext){
	var index=wordlist.indexOf(ftext);
	if(index!=-1){
		list=list.slice(0,index+1);
		flag=true;
	}else{
		list=list.slice(0);
	}
	changeColor(flag);

}
function reset(){
		for(var i=0;i<div.length;i++){
			div[i].style.backgroundColor="#fff";
		}
}

function changeColor(flag){
	if(num<list.length){
		reset();
		list[num].style.backgroundColor="green";
		num++;
		timer=setTimeout(f(flag),500);
	}else{
		if(flag==false){
			list[num-1].style.backgroundColor="#fff";
			if(wordlist.length!=0&&val!=null){
				var findError=document.getElementsByClassName('btn2')[0].getElementsByClassName("error")[0];
				findError.innerText="没有找到 \""+val+"\"";
			}
		}else{
			list[num-1].style.backgroundColor="pink";
		}
	}
}
function f(flag){
	return function(){
		changeColor(flag);
	}
}
