// var tableHead=['姓名','语文','数学','英语','总分'];
var tableHead={  //表头部分，false表示不可以排序，true表示可以排序
	'姓名':false,
	'语文':false,
	'数学':true,
	'英语':true,
	'总分':true
}
var srcData={
	'小一':randomScore(3), //动态生成成绩
	'小二':randomScore(3),
	'小三':randomScore(3),
	'小四':randomScore(3),
	'小五':randomScore(3),
	'小六':randomScore(3),
	'小七':randomScore(3),
	'小八':randomScore(3),
	'小九':randomScore(3),
	'小十':randomScore(3)
}
function randomScore(n){ //动态生成成绩函数，n表示课程总数
	var arr=[];
	for(var i=0;i<n;i++){
		arr.push(Math.floor(40+Math.random()*61));
	}
	arr.push(sum(arr));
	return arr;
}

function sum(arr){  //数组求和
	var s=0;
	for(var i=0;i<arr.length;i++){
		s+=arr[i];
	}
	return s;
}

var table=document.getElementById('sortTable');
new sortTable(table,tableHead,srcData);

var tableHead2={
	'Name':false,
	'Chinese':true,
	'Math':true,
	'English':true,
}
var srcData2={
	'No.1':randomScore2(3),
	'No.2':randomScore2(3),
	'No.3':randomScore2(3),
	'No.4':randomScore2(3),
	'No.5':randomScore2(3),
	'No.6':randomScore2(3),
	'No.7':randomScore2(3),
	'No.8':randomScore2(3),
	'No.9':randomScore2(3),
	'No.10':randomScore2(3)
}
function randomScore2(n){
	var arr=[];
	for(var i=0;i<n;i++){
		arr.push(Math.floor(40+Math.random()*61));
	}
	return arr;
}
var table2=document.getElementById('sortTable2');
new sortTable(table2,tableHead2,srcData2);