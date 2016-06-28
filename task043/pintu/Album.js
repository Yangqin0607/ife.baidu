function Album(ele){
	this.dom=ele;
	this.picNumber=this.dom.getElementsByClassName("picBox").length;
	this.init();
}
Album.prototype={
	init:function(){
		if(this.picNumber==3||this.picNumber==5){
			this.fixPicBox(this.picNumber);
		}
	},
	fixPicBox:function(picNumber){
		var width=parseFloat(this.dom.clientWidth);
		var height=parseFloat(this.dom.clientHeight);
		switch(picNumber){
			case 3:
				var picBox0=this.dom.getElementsByClassName("picBox")[0];
				var picBox1=this.dom.getElementsByClassName("picBox")[1];
				var picBox2=this.dom.getElementsByClassName("picBox")[2];
				picBox0.style.height=height+"px";
				picBox0.style.width=width-height/2+"px";

				picBox1.style.height=height/2+"px";
				picBox1.style.width=height/2+"px";
				picBox1.style.left=parseFloat(picBox0.style.width)+"px";

				picBox2.style.height=height/2+"px";
				picBox2.style.width=height/2+"px";
				picBox2.style.left=parseFloat(picBox0.style.width)+"px";
				picBox2.style.top=parseFloat(picBox1.style.height)+"px";
				break;
			case 5:
				var picBox0=this.dom.getElementsByClassName("picBox")[0];
				var picBox1=this.dom.getElementsByClassName("picBox")[1];
				var picBox2=this.dom.getElementsByClassName("picBox")[2];
				var picBox3=this.dom.getElementsByClassName("picBox")[3];
				var picBox4=this.dom.getElementsByClassName("picBox")[4];
				picBox0.style.width=width/3*2+"px";
				picBox0.style.height=height/3*2+"px";

				picBox1.style.width=width/3+"px";
				picBox1.style.height=width/3+"px";
				picBox1.style.left=parseFloat(picBox0.style.width)+"px";

				picBox2.style.width=width/3+"px";
				picBox2.style.height=height-parseFloat(picBox1.style.height)+"px";
				picBox2.style.left=parseFloat(picBox0.style.width)+"px";
				picBox2.style.top=parseFloat(picBox1.style.height)+"px";

				picBox3.style.width=width/3+"px";
				picBox3.style.height=height/3+"px";
				picBox3.style.top=parseFloat(picBox0.style.height)+"px";

				picBox4.style.width=width/3+"px";
				picBox4.style.height=height/3+"px";
				picBox4.style.left=parseFloat(picBox3.style.width)+"px";
				picBox4.style.top=parseFloat(picBox0.style.height)+"px";
				break
		};
	}
}