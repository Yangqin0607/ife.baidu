var fallAlbum = document.getElementsByClassName("fallsAlbum")[0];
for (var i = 0; i < 10; i++) {
    var imgBox = document.createElement("div");
    imgBox.className = "imgBox";
    fallAlbum.appendChild(imgBox);

    var img = document.createElement("img");
    imgBox.appendChild(img);

    var height = Math.floor(200 + Math.random() * 200);
    var width = Math.floor(200 + Math.random() * 400);
    var bgcolor = Math.ceil(Math.random() * 0xFFFFFF).toString(16);
    var tcolor = Math.ceil(Math.random() * 0xFFFFFF).toString(16);
    img.src = "https://placehold.it/" + width + "x" + height + "/" + bgcolor + "/" + tcolor + "?text=" + (i + 1);

    var descrip = document.createElement("div");
    descrip.className = "description";
    imgBox.appendChild(descrip);
    descrip.appendChild(document.createTextNode("A photo with the size " + width + "x" + height));
}


var albumObj = {
    dom: fallAlbum,
    column: 4,
    colSpace: "20px",
    rolSpace: "10px",
    imgWidth: "300px"
}
new fallsAlbum(albumObj);
