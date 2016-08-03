这次任务的主要难点是：
1、侧边栏导航
2、tab标签的实现

侧边栏导航：
div.nav 
	div.cells一级目录容器
		input checkbox
		i.iconfont图标
		span 文字
		div.cell2二级目录
			input checkbox
			i.iconfont图标
			i.iconfont图标
			span 文字
			div.cell3三级目录
				div.cell
					input checkbox
					i.iconfont图标
					span 文字
每一个目录容器中都有一个input checkbox，这个设置成和相应的目录级别等宽等高，设置opacity=0。
当目录全都是未打开时，div.cells里面就只有input checkbox，iconfont,span；其他的内容都是display:none;
然后判断input[type="checkbox"]:checked~.cell2{display:block;}
当某个checkbox被选中时，他的相邻兄弟节点cell2就被打开了
cell2里面的逻辑也是一样的。
当cell2 input[type="checkbox"]:checked~i:nth-of-type(1){
	transform:rotate(90deg);
	-webkit-transform:rotate(90deg);
}
cell2前面的图标换方向

2、tab标签的实现
div.content容器
	input radio用于指示哪个tab标签被选中
	input radio
	input radio
	input radio
	input radio
	div.lb存放内容的容器
		div.item1 tab页的头部
		div.item2
		div.item3
		div.item4
		div.item5
		div.itemContent1 tab页相应的内容
		div.itemContent2
		div.itemContent3
		div.itemContent4
		div.itemContent5
radio的位置要和相应的item的位置重合，宽高一致，并且opacity=0;
input[type="radio"]:nth-of-type(1):checked~.lb .itemContent1{display:block}
因为item可能是浮动显示的，那么在itemContent中一定要clear
tab的边框加在每个itemContent上，但是选中的那个tab页他的下边框是没有的，因此通过将tab页下移一个边框宽度来遮住边框
input[type="radio"]:nth-of-type(1):checked~.lb .item1{
	position:relative;
	top:1px;
}