// var tableHead=['姓名','语文','数学','英语','总分'];
var tableHead={
	'姓名':false,
	'语文':false,
	'数学':true,
	'英语':true,
	'总分':true
}
var srcData={
	'小一':randomScore(3),
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
function randomScore(n){
	var arr=[];
	for(var i=0;i<n;i++){
		arr.push(Math.floor(40+Math.random()*61));
	}
	arr.push(sum(arr));
	return arr;
}

function sum(arr){
	var s=0;
	for(var i=0;i<arr.length;i++){
		s+=arr[i];
	}
	return s;
}

