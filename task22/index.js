var timer2=null;
var root=document.getElementsByClassName("root")[0];
var child1=document.getElementsByClassName("child1");
var child2=document.getElementsByClassName("child2");
var child3=document.getElementsByClassName("child3");
var treeroot=document.getElementsByClassName("root")[0];
var btn1=document.getElementById("btn1");
var btn2=document.getElementById("btn2");
var btn3=document.getElementById("btn3");
var btn=document.getElementsByClassName("btn")[0];
var nodelist=[];
resetColor();

// 事件委托，点击按钮栏触发
btn.addEventListener("click",function(event){
	if(event.target.name=="butt"){
		clickbtn(event.target.id);
	}
})

// 点击事件，根据不同的id触发不同的事件
function clickbtn(id){
	nodelist=[];
	i=0;
	switch (id){
		case btn1.id:
			clearTimeout(timer2);
			resetColor();
			preOrder(treeroot);
			changeColor('blue');
			break;
		case btn2.id:
			clearTimeout(timer2);
			resetColor();
			inOrder(treeroot);
			changeColor('green');
			break;
		case btn3.id:
			clearTimeout(timer2);
			resetColor();
			postOrder(treeroot);
			changeColor('pink');
			break;
	}
}

// 前序遍历
function preOrder(node){
	if(!(node==null)){
		nodelist.push(node);
		preOrder(node.children[0]);
		preOrder(node.children[1]);
	}
}

// 中序遍历
function inOrder(node){
	if(!(node==null)){
		inOrder(node.children[0]);
		nodelist.push(node);
		inOrder(node.children[1]);
	}
}

// 后序遍历
function postOrder(node){
	if(!(node==null)){
		postOrder(node.children[0]);
		postOrder(node.children[1]);
		nodelist.push(node);
	}
}

// 颜色重置
function resetColor(){
	var div=document.getElementsByClassName("container")[0].getElementsByTagName("div");
	for(var i=0;i<div.length;i++){
		div[i].style.backgroundColor="#fff";
	}
}

// 改变颜色动画
function changeColor(color){
	setTimeout(ff(color),500);	
}
function ff(color){
	return function(){
		f(color);
	}
}
function f(color){
	if(i<nodelist.length){
		resetColor();
		nodelist[i].style.backgroundColor=color;
		i++;
		timer2=setTimeout(ff(color),500);
	}else{
		nodelist[i-1].style.backgroundColor="#fff";
	}
}