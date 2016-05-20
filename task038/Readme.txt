任务三十九和三十八封装在一起
功能是：
	点击表头的排序按钮，按照升序或者降序排列该列数据，默认为升序
	表格滚动时，如果表头消失在视口，表头将以冻结的形式显示在视口中，此时点击排序，将回到表格顶部

任务三十八：
排序表格：

1.把所有的需要用到的表格数据放在index.js中
数据主要分为：
1）表头数据：是一个对象，形式如下
{
    ‘表头数据’:是否可以排序，（true表示可以排序）
}
2）表主体部分数据：也是一个对象，形式如下
{
      '表主体数据'：随机生成数据函数
}

2.排序表格对象放在sortTable.js中
1）构造函数
构造函数中存放，表格的dom引用，表头数据，表主体数据，初始化函数
2）原型
原型中存放了很多方法
init()用于初始化，先创建表头，然后找到第一个允许排序的列，对它进行升序排列，并显示在页面中。

sort()用于排序，找到被点击的元素是第几列，然后将该列的元素按照降序或者升序排列

BubbleSort()冒泡排序，主要用于sort(）中

createArrBody()这个函数主要用于将传入的表主体对象转化为数组表示，这里需要注意的是如果在arrBody[j]=new Array()后直接用arrBody[j]=this.data[item],arrBody[j].unshift(item);
在第一次初始化时没有问题，但是在第二次调用时，会在数组前面继续执行unshift(item)
例如：一开始this.data={'小一'：[1,2,3]}
执行第一次arrBody=['小一',1,2,3]
执行第二次arrBody=['小一','小一',1,2,3]
原因是，arrBody[j]中保存的是this.data[item]的地址，然后对arrBody[j]前面插入item，那么this.data[item]前面同样也会插入item，所以执行第二次，第三次都会有问题
后来改成了concat，但是concat要先把item插入到表头，不然空数组concat会不成功。

createArrHead()这个函数用于将传入的表头对象转化为数组表示

createTBody()主要是创建tbody

createThead()创建thead，并绑定事件，绑定事件用的是事件委托

改进：
在这里创建tbody时，将表体对象转化为数组，容易出错，其实可以直接对对象进行操作
在构造函数中定义一个属性this.curarr=[];
然后将this.data里面的key都保存在this.curarr中
for(var key in this.data){
   this.curarr.push(key);
}
后面直接对整个对象进行排序就可以了。

任务三十九：
要实现窗口冻结，就是要给文档添加滚动事件，
如果document.body的scrollTop大于表格的offsetTop，小于offsetTop+offsetHeight，那么表格部分在视口中，此时将表头添加到fixed类，fixed类就是把position设置为fixed，然后根据实际的offsetLeft来设置表头的left属性
如果document.body的scrollTop大于表格的offsetTop+offsetHeight，也就是说表格整个已经消失在视口了，这时需要移除fixed类，表格正常显示
如果不满足上述情况，也就是说整个表格都在视口中，那么也要移除fixed类，正常显示表格

这里使用if判断时，需要注意判断的顺序，要先判断是否全部消失在视口，再判断是否部分在视口中。如果顺序颠倒，那么永远都不会判断表格是否全部消失在视口中，因为表格全部消失在视口时，一定满足scrollTop>offsetTop

另外添加的功能是：
如果表格有部分在视口时，此时点击排序按钮，整个文档会滚动到刚好将表格的表头与浏览器视口上部分齐平。