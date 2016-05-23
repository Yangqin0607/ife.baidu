任务四十：
实现的功能：
1）组件初始化时，可配置可选日期上下限
2）提供设定日期的接口，指定具体日期，日历面板响应日期选中
3）提供获取日期的接口，获取面板中当前选中的日期，返回一个日期对象

JS文件有3个
1）public.js为通用的js，主要是实现跨浏览器的添加事件，删除事件，获取event的相关信息
2）index.js是用来设置某输入框为日历框
3）MonthDate.js用来生成日期对象，及数组
4）calendar.js主要用来实现日历功能

1.index.js
设置日期上下限，获取要生成日历框的输入框id，创建calendar对象

2.MonthDate.js
MonthDate是一个对象，其中包含很多方法
1）getStartDate 输入年，月，返回该年月的第一天是周几，0表示周日，1表示周一，...，6表示周六
2）getMonthDays 输入年，月，返回该年月的天数
3）getMonthArr  输入年，月，返回该年月的日期数组，即一个数组，其中保存了1，2，...,总天数
4）preAndnextDays 输入年，月，根据该年月的第一天是周几，来决定在本月的数组中，应该保留几位上个月的日期，和几位下个月的日期
5）displayMonth 输入年，月，返回一个长度为42的数组，即在保存本月数据的数组前面插入上一个月的日期，数组后面插入下一个月日期

3.calendar.js
原型中
1) init初始化
创建日历头部，添加事件等
设置现在的日期对象，如果现在的日期在日期范围内，那么给render传入现在的日期；如果不在范围内，则给render传入初始日期

2）createHeader 创建日历的头部，将位置固定在输入框下面2px处，初始化年，月下拉框，及两边的小耳朵，并给下拉框，小耳朵添加onchange事件。
给下拉框及小耳朵添加onchange事件的函数为yearormonthChange
当下拉框改变时，改变下拉框选中的项，并调用render函数，重新绘制新的日历
两个小耳朵的点击事件，利用事件委托添加在header上，如果点击了两个小耳朵，判断点击的是年份或者是月份，并对一些特殊情况进行处理，然后调用render函数重新绘制刷新日历

3）clickBox 给日历显示区添加事件
如果点击的目标类名包含predays，即点击了上一个月的日期，那么给render函数输入上一个月的年，月，刷新数据
如果点击的目标类名包含nextdays，即点击了下一个月的日期，那么给render函数输入下一个月的年月，刷新数据
每次点击都将点击的目标的innerHTML保存在this.d中，其实就是保存了点击的具体日期，将其传入render函数中，即可给该日期添加chosen类，实现选中状态

4）inputchange 输入框改变事件，首先利用正则判断输入的日期是否符合规范，然后将符合规范的日期传入render中刷新数据，显示输入框输入的日期

5）render 输入年，月，日。如果没有输入 日，则用this.d初始化 日。
首先利用MonthDate对象得到该年该月的日期数组，然后用for循环一个一个添加到str中。添加到str时，如果是前一个月的数据，就加上类predays，如果是后一个月的数据就加上nextdays，如果日期不再规定的日期内，给他们加上invalid类。
然后更新年月下拉框
更新输入框，更新输入框时如果选中的日期不在规定的范围内，则重置为日期范围的第一天。

6）判断日期是否在范围内，用的是InvalidDateRender函数，输入年月日
将起始日期和输入的日期都化为毫秒数，比较是否在范围内。

用到的方法：
日期Date
getTime() 返回日期的毫秒数
getFullYear() 返回4位数的年份
getMonth()返回月份 0表示1月
getDate() 返回日
getDay()返回星期几 0表示星期日

下拉框select
动态添加option
var newoption=new Option(显示的值,value);
year.add(newoption,undefined);

获取选中的年或月
var selectedyear=year.options[year.selectedIndex].value;

手动设置选中的值
year.options[index].selected=true;
month.options[index].selected=true;