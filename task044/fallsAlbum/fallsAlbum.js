function fallsAlbum(albumObj) {
    this.dom = albumObj.dom;
    this.column = albumObj.column || 4;
    this.colSpace = albumObj.colSpace;
    this.rolSpace = albumObj.rolSpace || "10px";
    this.imgBox=[].slice.apply(this.dom.getElementsByClassName("imgBox"));
    this.cover = null;
    // this.imgLength = this.dom.getElementsByClassName("imgBox").length;
    this.colHArray = [];
    this.targetValue = null;
    this.init();
}
fallsAlbum.prototype = {
    init: function() {
        this.render();
        var that = this;
       
        window.onload = function() {
            that.render(true);
            that.createCover();

            // -------------------------------------------点击图片时的事件------------------------------------------
            var clickImg = function(event) {
                event = EventUtil.getEvent(event);
                var target = EventUtil.getTarget(event);
                if (target.nodeName.toLowerCase() == "img") {
                    EventUtil.removeClass(that.cover, "hide"); //展示cover层
                    var pa = target.parentNode;
                    that.targetValue = { //储存点击对象的状态，以及原始位置
                        "target": pa,
                        "top": pa.style.top,
                        "left": pa.style.left
                    };
                    EventUtil.addClass(pa, "scaleToScreen"); //放大imgBox并居中显示
                    pa.style.top = (parseFloat(window.innerHeight) - parseFloat(pa.offsetHeight)) / 2 + "px";
                    pa.style.left = (parseFloat(window.innerWidth) - parseFloat(pa.offsetWidth)) / 2 + "px";
                    EventUtil.removeHandler(that.dom, "click", clickImg); //放大状态下移除点击事件，不移除的话，在放大情况下点击图片，再点击cover层会改变图片的位置
                }
            };

            EventUtil.addHandler(that.dom, "click", clickImg);

            //-------------------------给cover层添加点击事件---------------------------------------------------
            EventUtil.addHandler(that.cover, "click", function() {
                EventUtil.addClass(this, "hide"); //隐藏cover

                var temp = that.targetValue.target; //获取点击对象
                EventUtil.removeClass(temp, "scaleToScreen"); //移除原来的类，并回到原来的位置
                temp.style.transition = "500ms transform";
                temp.style.top = that.targetValue.top;
                temp.style.left = that.targetValue.left;

                EventUtil.addHandler(that.dom, "click", clickImg); //点击cover层回到正常显示状态，再将相册的点击事件加上
            });
        }

    },
    render: function(flag) {
        if(flag==true){
            this.dom.innerHTML="";
            this.colHArray=[];
            for(var i=0;i<this.imgBox.length;i++){
                this.dom.appendChild(this.imgBox[i]);
            }
        }
       
        if (this.colSpace == null) {
            this.colSpace = (parseFloat(this.dom.clientWidth) - parseFloat(this.imgBox[0].offsetWidth) * this.column) / (this.column - 1) + "px";
        }

        //--------------------------------------------显示第一行图片------------------------------------------
        for (var i = 0; i < parseInt(this.column); i++) {
            
            this.imgBox[i].style.top = 0;
            this.imgBox[i].style.left = (parseFloat(this.imgBox[0].offsetWidth) + parseFloat(this.colSpace)) * i + "px";
            this.colHArray.push(parseFloat(this.imgBox[i].offsetHeight));
        }

        //--------------------------------看哪列图片最短，就将后面的图片添加到哪一列，并更新列高数组------------
        this.displayImgBox(i,this.imgBox.length);
        // this.createCover();
    },
    displayImgBox: function(startIndex,endIndex) {
        
            var minHeight = Math.min.apply(Array, this.colHArray);
            for (var j = startIndex; j < endIndex; j++) {
                var index = this.colHArray.indexOf(minHeight);
               
                this.imgBox[j].style.top = minHeight + parseFloat(this.rolSpace) + "px";
                this.imgBox[j].style.left = (parseFloat(this.imgBox[0].offsetWidth) + parseFloat(this.colSpace)) * index + "px";
                this.colHArray[index] += parseFloat(this.imgBox[j].offsetHeight) + parseFloat(this.rolSpace);
                minHeight = Math.min.apply(Array, this.colHArray);
            }
            // this.imgLength = this.imgBox.length;
    },
    //-----------------------------------------创建cover层---------------------------------------------------
    createCover: function() {
        var cover = document.createElement("div");
        cover.className = "cover hide";
        this.dom.parentNode.appendChild(cover);
        cover.style.width = window.innerWidth + "px";
        cover.style.height = window.innerHeight + "px";
        this.cover = cover;
    },
    addNewBox: function(imgBox) {
        this.imgBox.push(imgBox);
       
        this.render(true);
    },
}
