function woodAlbum(woodObj) {
    this.dom = woodObj.dom;
    this.minHeight = parseFloat(woodObj.minHeight) | 300;
    this.albumWidth=parseFloat(woodObj.albumWidth);
    this.initWidthArray = [];//高度为this.minHeight，图片的宽度
    this.rowHeight=[];//行高
    this.imgWH=[];//imgBox的原始宽高
    this.albumBoxCollection=[].slice.apply(this.dom.getElementsByClassName("albumBox"));
    this.init();
}
woodAlbum.prototype = {
    init: function() {
        var that = this;
        window.onload = function() {
            that.calc_initWidthArray();
            that.calc_RowHeight();
            that.render();
            that.cover();
            that.clickEvent();
        }
    },
    // 计算最小高度下的图片宽度
    calc_initWidthArray: function() {
        for (var i = 0, len = this.albumBoxCollection.length; i < len; i++) {
            var imgBox = this.albumBoxCollection[i];
            var imgBoxWidth = parseFloat(imgBox.offsetWidth);
            var imgBoxHeight = parseFloat(imgBox.offsetHeight);
            this.imgWH.push({width:imgBoxWidth,height:imgBoxHeight});
            this.initWidthArray.push(this.minHeight * imgBoxWidth / imgBoxHeight);
        }
    },
    //计算行高
    calc_RowHeight:function(){
    	var sum=0;
    	for(var i=0;i<this.initWidthArray.length;i++){
    		sum+=this.initWidthArray[i];
    		if(sum>=this.albumWidth){
    			var rh=this.minHeight*this.albumWidth/sum;
    			var rhobj={
    				height:rh,
    				index:i
    			};
    			this.rowHeight.push(rhobj);
    			sum=0;
    		}
    	}
    },
    //根据实际行高重新计算imgBox的行高比
    render:function(){
    	this.dom.innerHTML='';
    	
    	for(var i=0;i<this.rowHeight.length;i++){
    		var row=document.createElement("div");
    		this.dom.appendChild(row);
    		row.className="albumRow";
    		row.style.height=this.rowHeight[i].height+'px';
    		row.style.width=this.albumWidth+'px';
    		var startIndex=i==0?0:(this.rowHeight[i-1].index+1);
    		for(var j=startIndex;j<=this.rowHeight[i].index;j++){
    			row.appendChild(this.albumBoxCollection[j]);
   				
    			this.albumBoxCollection[j].style.height=parseFloat(row.style.height)+"px";
    			this.albumBoxCollection[j].style.width=parseFloat(this.albumBoxCollection[j].style.height)*parseFloat(this.imgWH[j].width)/parseFloat(this.imgWH[j].height)+"px";
    		}
    	}
    },
    cover:function(){
    	var cover=document.createElement("div");
    	cover.className="cover";
    	document.body.appendChild(cover);
    	var displayBox=document.createElement("div");
    	cover.appendChild(displayBox);
    	displayBox.className="displayBox";
    	var img=document.createElement("img");
    	img.id="displayImg";
    	displayBox.appendChild(img);

    	var description=document.createElement("div");
    	description.className="description";
    	displayBox.appendChild(description);

    	cover.addEventListener("click",function(event){
    		console.log(event.target.className);
    		if(event.target.className=="cover"){
    			this.style.display="none";
    		}
    	});
    },
    clickEvent:function(){
    	this.dom.addEventListener("click",function(event){
    		if(event.target.tagName.toLowerCase()=="img"){
    			var url=event.target.src;
    			var displayImg=document.getElementById("displayImg");
    			displayImg.src=url;
    			var cover=document.getElementsByClassName("cover")[0];
    			cover.style.display="block";

    			var description=cover.getElementsByClassName("description")[0];
    			description.innerHTML=event.target.parentNode.getElementsByClassName("description")[0].innerHTML;
    			description.style.left=displayImg.offsetLeft-displayImg.offsetWidth/2+"px";
    			description.style.top=displayImg.offsetTop-displayImg.offsetHeight/2+displayImg.offsetHeight-20+"px";
    		}
    	});
    }
}
