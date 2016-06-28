function fallsAlbum(albumObj) {
    this.dom = albumObj.dom;
    this.column = albumObj.column;
    this.colSpace = albumObj.colSpace;
    this.rolSpace = albumObj.rolSpace||"10px";
    this.imgWidth = albumObj.imgWidth;
    this.cover = null;
    this.colHArray = [];
    this.targetValue = null;
    this.init();
}
fallsAlbum.prototype = {
    init: function() {
        var that = this;
        window.onload = function() {
            that.render();
            that.createCover();

            var clickImg = function(event) {
                event = EventUtil.getEvent(event);
                var target = EventUtil.getTarget(event);
                if (target.nodeName.toLowerCase() == "img") {
                    EventUtil.removeClass(that.cover, "hide");
                    var pa = target.parentNode;
                    that.targetValue = {
                        "target": pa,
                        "top": pa.style.top,
                        "left": pa.style.left
                    };
                    EventUtil.addClass(pa, "scaleToScreen");
                    pa.style.top = (parseFloat(window.innerHeight) - parseFloat(pa.offsetHeight)) / 2 + "px";
                    pa.style.left = (parseFloat(window.innerWidth) - parseFloat(pa.offsetWidth)) / 2 + "px";
                    EventUtil.removeHandler(that.dom, "click", clickImg);
                }
            };

            EventUtil.addHandler(that.dom, "click", clickImg);

            EventUtil.addHandler(that.cover, "click", function() {
                EventUtil.addClass(this, "hide");
                var temp = that.targetValue.target;
                EventUtil.removeClass(temp, "scaleToScreen");
                temp.style.transform="scale(1,1)";
                temp.style.transition="500ms transform";
                temp.style.top = that.targetValue.top;
                temp.style.left = that.targetValue.left;

                EventUtil.addHandler(that.dom, "click", clickImg);
            });
        }

    },
    render: function() {
        var imgBox = this.dom.getElementsByClassName("imgBox");

        for (var i = 0; i < parseInt(this.column); i++) {
            imgBox[i].style.top = 0;
            imgBox[i].style.left = (parseFloat(this.imgWidth) + parseFloat(this.colSpace)) * i + "px";
            this.colHArray.push(parseFloat(imgBox[i].offsetHeight));
        }

        var minHeight = Math.min.apply(Array, this.colHArray);
        for (var j = i; j < imgBox.length; j++) {
            var index = this.colHArray.indexOf(minHeight);
            imgBox[j].style.top = minHeight + parseFloat(this.rolSpace) + "px";
            imgBox[j].style.left = (parseFloat(this.imgWidth) + parseFloat(this.colSpace)) * index + "px";
            this.colHArray[index] += parseFloat(imgBox[j].offsetHeight) + parseFloat(this.rolSpace);
            minHeight = Math.min.apply(Array, this.colHArray);
        }
    },
    createCover: function() {
        var cover = document.createElement("div");
        cover.className = "cover hide";
        this.dom.appendChild(cover);
        cover.style.width = window.innerWidth + "px";
        cover.style.height = window.innerHeight + "px";
        this.cover = cover;
    },
}
