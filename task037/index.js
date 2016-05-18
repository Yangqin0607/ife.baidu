function surface(ele){
	this.visible=false;
	this.dom=ele;
	this.x=0;
	this.y=0;
	this.cover=null;
	this.init();

}
surface.prototype={
	init:function(){
		this.setDragNode(this.dom);
		this.resize();	
		this.cover=this.createCover();
		this.show();
	},
	createCover:function(){  //创建cover，并返回，方便render中使用
		var cover=document.createElement('div');
		this.dom.parentNode.appendChild(cover);
		cover.className='cover';
		cover.style.cssText='background-color: rgba(255,84,0,0.2);position: fixed;top: 0;left: 0;display: none;z-index: 1;'
		var self=this;
		cover.addEventListener('click',function(){
			self.hide();
		});
		return cover;
	},
	centerShow:function(){  //设置居中显示
		var clientW=this.getViewport().width;  //获取视口宽度和高度
		var clientH=this.getViewport().height;
		var offsetW=this.dom.offsetWidth; //获取弹出框宽度和高度
		var offsetH=this.dom.offsetHeight;
		this.x=(clientW-offsetW)/2+'px';
		this.y=(clientH-offsetH)/2+'px';
		return {
			x:this.x,
			y:this.y
		}
	},
	render:function(){
		if(this.visible==true){
			this.dom.style.display='block';
			var temp=this.centerShow();
			this.dom.style.left=temp.x;
			this.dom.style.top=temp.y;
			this.cover.style.display='block';
			this.cover.style.width=this.getViewport().width+'px';
			this.cover.style.height=this.getViewport().height+'px';
		}else{
			this.dom.style.display='none';
			this.cover.style.display='none';
		}
	},
	show:function(){  //显示弹出框
		this.visible=true;
		this.render();
	},
	hide:function(){  //隐藏弹出框
		this.visible=false;
		this.render();
	},
	setDragNode:function(node){    //设置拖放点
		var self=this;   //this值存在self中
		node.style.cursor='move';    //设置鼠标样式
		node.addEventListener('mousedown',function(event){   //鼠标按下时触发
			var classname=event.target.className;
			if(event.target.className.indexOf('resize')==-1){//判断类名，没有resize，则点击了拖拽区
				mouseX=event.pageX-self.dom.offsetLeft;   //获取鼠标点击的横坐标
				mouseY=event.pageY-self.dom.offsetTop;    //获取鼠标点击的纵坐标   在弹出窗口中得坐标不是整个页面中的坐标
			}else{//点击了放大缩小区
				event.stopPropagation();
			}
			var move=function(event){
				if(classname.indexOf('resize')==-1){
					var x=event.pageX-mouseX;   //x是弹出层左边框到浏览器左边框的距离  注意这里的event和上面的event不是同一个对象
					var y=event.pageY-mouseY;   //y是弹出层上边框到浏览器上边框的距离
					var offsetW=self.dom.offsetWidth;  //获取弹出框的宽高
					var offsetH=self.dom.offsetHeight;
					var disx=self.getViewport().width-offsetW;  //视口宽度减去弹出框的宽度就是弹出框左侧距离浏览器左侧的最大距离
					var disy=self.getViewport().height-offsetH;  //主要是为了限制弹出框不能超出视口
					self.dom.style.left=Math.min(Math.max(0,x),disx)+'px';
					self.dom.style.top=Math.min(Math.max(0,y),disy)+'px';
				}else{
					var maxW=self.getViewport().width-self.dom.offsetLeft;  //获取当前位置可以放大的最大宽高
					var maxH=self.getViewport().height-self.dom.offsetTop;
					var W=event.pageX-self.dom.offsetLeft; //获取当前的弹出框的宽高度
					var H=event.pageY-self.dom.offsetTop;
					switch(classname){ //根据不同的类名采取不同的方案
						case 'resize divright':
							self.dom.style.width=Math.min(maxW,Math.max(W,300))+'px';//为了限制最小和最大宽高
							// self.dom.style.width=event.pageX-self.dom.offsetLeft+'px';
							break;
						case 'resize divbottom':
							self.dom.style.height=Math.min(maxH,Math.max(H,200))+'px';
							// self.dom.style.height=event.pageY-self.dom.offsetTop+'px';
							break;
						case 'resize divrb':
							self.dom.style.width=Math.min(maxW,Math.max(W,300))+'px';
							self.dom.style.height=Math.min(maxH,Math.max(H,200))+'px';
							// self.dom.style.width=event.pageX-self.dom.offsetLeft+'px';
							// self.dom.style.height=event.pageY-self.dom.offsetTop+'px';
							break;
					}
				}
			};
			document.addEventListener('mousemove',move);
			document.addEventListener('mouseup',function(){
				document.removeEventListener('mousemove',move);
			});
		});
	},
	resize:function(){// 这个函数主要用来添加右边，下边，右下角拖拉框
		var divright=document.createElement('div');
		divright.className='resize divright';
		divright.style.cssText='position:absolute;right:0;top:0;width:5px;height:100%;background-color:transparent;cursor:e-resize;';
		this.dom.appendChild(divright);
		var divbottom=document.createElement('div');
		divbottom.className='resize divbottom';
		divbottom.style.cssText='position:absolute;left:0;bottom:0;height:5px;width:100%;background-color:transparent;cursor:s-resize;';
		this.dom.appendChild(divbottom);
		var divrb=document.createElement('div');
		divrb.className='resize divrb';
		divrb.style.cssText='position:absolute;right:0;bottom:0;width:5px;height:5px;background-color:transparent;cursor:se-resize;';
		this.dom.appendChild(divrb);
	},
	getViewport:function(){
		if(document.compatMode=='BackCompat'){
			return{
				width:document.body.clientWidth,
				height:document.body.clientHeight
			};
		}else{
			return{
				width:document.documentElement.clientWidth,
				height:document.documentElement.clientHeight
			};
		}
	}
}



var fbox=document.getElementById('floatbox');
var sur=new surface(fbox);//创建一个弹出框对象

var btn=document.getElementsByClassName('btn')[0];  //给'弹出浮出层'按钮添加点击事件
btn.addEventListener('click',function(){
	sur.show();
});

// var fm=fbox.getElementsByTagName('form')[0];  //给弹出层的form添加事件,form每次单击都会刷新，
// // 因此如果一开始就显示弹出层，点击了按钮后，弹出层先消失，然后刷新又显示
// // 所以这里采用一开始没有弹出层

// fm.addEventListener('click',function(e){
// 	if(e.target.tagName.toLowerCase()=='button'){
// 		sur.hide();
// 	}
// });

// 如果希望一开始就有弹出层，就把init中this.show()注销取消了，给单独的按钮添加事件，并且要阻止默认行为
// 这样可以实现单击按钮后弹出层消失，并且页面不会刷新
var sub=document.getElementById('submit');
sub.addEventListener('click',function(e){
	sur.hide();
	e.preventDefault();
})

var re=document.getElementById('reset');
re.addEventListener('click',function(e){
	sur.hide();
	e.preventDefault();
})


