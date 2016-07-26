var album = document.getElementsByClassName("woodAlbum")[0];
function createImgBox(index) {
	var albumBox=document.createElement("div");
	albumBox.className="albumBox";

    var img = document.createElement("img");
    albumBox.appendChild(img);

    var height = Math.floor(200 + Math.random() * 200);
    var width = Math.floor(200 + Math.random() * 400);
    var bgcolor = Math.ceil(Math.random() * 0xFFFFFF).toString(16);
    var tcolor = Math.ceil(Math.random() * 0xFFFFFF).toString(16);
    img.src = "https://placehold.it/" + width + "x" + height + "/" + bgcolor + "/" + tcolor + "?text=" + (index + 1);

    var descrip = document.createElement("div");
    descrip.className = "description";
    albumBox.appendChild(descrip);
    descrip.appendChild(document.createTextNode("A photo with the size " + width + "x" + height));
    return albumBox;
}

for (var j = 0; j < 20; j++) {
    album.appendChild(createImgBox(j));
}
var woodObj={
	dom:document.getElementsByClassName("woodAlbum")[0],
	albumWidth:1000
}
new woodAlbum(woodObj);
