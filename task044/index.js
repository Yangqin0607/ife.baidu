var fallAlbum = document.getElementsByClassName("fallsAlbum")[0];
function createImgBox(index) {
    // for (var i = startIndex; i < endIndex; i++) {
        var imgBox = document.createElement("div");
        imgBox.className = "imgBox";

        var img = document.createElement("img");
        imgBox.appendChild(img);

        var height = Math.floor(200 + Math.random() * 200);
        var width = Math.floor(200 + Math.random() * 400);
        var bgcolor = Math.ceil(Math.random() * 0xFFFFFF).toString(16);
        var tcolor = Math.ceil(Math.random() * 0xFFFFFF).toString(16);
        img.src = "https://placehold.it/" + width + "x" + height + "/" + bgcolor + "/" + tcolor + "?text=" + (index + 1);

        var descrip = document.createElement("div");
        descrip.className = "description";
        imgBox.appendChild(descrip);
        descrip.appendChild(document.createTextNode("A photo with the size " + width + "x" + height));
        // fallAlbum.appendChild(imgBox);
        return imgBox;
    // }
}
for(var i=0;i<10;i++){
	fallAlbum.appendChild(createImgBox(i));
}
var albumObj = {
    dom: fallAlbum,
    // column: 3, //设置布局列数，没有该参数时，默认是4列
    // colSpace: "10px", //设置列间距，没有该参数时，默认是平均分摊时计算的列间距
    // rolSpace: "10px", //设置行间距，没有该参数时，默认是10px
}
var album = new fallsAlbum(albumObj);

var count=10;
window.onscroll=function(){
	
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	var clientHeight=document.documentElement.clientHeight||document.body.clientHeight;
	var colArray=album.colHArray;
	var imgBox=album.dom.getElementsByClassName("imgBox");
	var img=imgBox[imgBox.length-1];
	
	if((img.offsetTop)<(scrollTop+clientHeight)){
		
		album.addNewBox(createImgBox(count));
        count++;
	}
}