// JavaScript Document
var data=[];
window.onload=function(){
	init();
	paint();
	}

function paint(){
	var dataDiv=document.getElementsByClassName("data")[0];
	var chart=document.getElementById("chart");
	var inp=document.getElementById("in");
	inp.value="";
	dataDiv.innerHTML="";
	chart.innerHTML="";
	for(var i=0;i<data.length;i++){
		dataDiv.innerHTML+="<div class='dd'>"+data[i]+"</div>";
		var color="#"+Math.floor(Math.random()*0xfff).toString(16);
		chart.innerHTML+="<div style='background-color:"+color+"; height:"+data[i]+"px;'></div>"
		}
}

function init(){
	btn();
	remove();
	sj();
	}
	
function btn(){
	var lr=document.getElementById("lr");
	var rr=document.getElementById("rr");
	var lc=document.getElementById("lc");
	var rc=document.getElementById("rc");
	var sortBtn=document.getElementById("sort");
	var rand=document.getElementById("rand");
	lr.addEventListener("click",leftIn);
	lc.addEventListener("click",leftOut);
	rr.addEventListener("click",rightIn);
	rc.addEventListener("click",rightOut);
	sortBtn.addEventListener("click",sortBubble);
	rand.addEventListener("click",sj);
	}

function sj(){
	for(var i=0;i<60;i++){
		data[i]=Math.floor(Math.random()*90+10);
		}
	paint();
	}
	
function remove(){
	var dataDiv=document.getElementsByClassName("data")[0];
	dataDiv.addEventListener("click",function(event){
		var index=-1;
		if(event.target.className=="dd"){
			/*this.removeChild(event.target);*/
			var n=Number(event.target.innerHTML);
			index=data.indexOf(n);
			if(index!=-1){
				data.splice(index,1);
				paint();
				}
			}
		
		});
	}
	
function sortBubble(){
	if(data.length==0)alert("please input");
	var str=this.innerHTML;
	var l=data.length;
	if(str=="升序"){
		for(var i=0;i<l-1;i++){
			for(var j=0;j<l-i-1;j++){
				if(data[j]>data[j+1]){
					var temp=data[j];
					data[j]=data[j+1];
					data[j+1]=temp;
					}
				}
			}
		this.innerHTML="降序";
		}
	if(str=="降序"){
		for(var i=0;i<l-1;i++){
			for(var j=0;j<l-i-1;j++){
				if(data[j]<data[j+1]){
					var temp=data[j];
					data[j]=data[j+1];
					data[j+1]=temp;
					}
				}
			}
		this.innerHTML="升序";
		}
	paint();
	}

function leftIn(){
	var inp=document.getElementById("in");
	var value=inp.value;
	var reg=/^(?:[1-9]\d|100)$/gm;
	if(data.length<60){
		value=Number(value);
		if(reg.test(value)){
			data.unshift(value);
			paint();
		}else{
			alert("please input number<300");
			}
		}else{
			alert("sorry,the data's length is 60,you can not add any more");
			}
	}
function rightOut(){
	alert(data.pop());
	paint();
	}
function rightIn(){
	var inp=document.getElementById("in");
	var value=inp.value;
	var reg=/^(\d|[1-2]\d{2}|[1-9]\d|300)$/gm;
	if(data.length<60){
		value=Number(value);
		if(reg.test(value)){
		data.push(value);
		paint();
		}else{
			alert("please input number<300");
			}
		}else{
			alert("sorry,the data's length is 60,you can not add any more");
			}
	}
function leftOut(){
	alert(data.shift());
	paint();
	}
