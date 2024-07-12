/*
Author:  github.com/quietshu
License: The MIT License
*/
(function(){
    window.onload = function () {
        var browserPrefix = "";
        if (navigator.userAgent.indexOf('Firefox') != -1) {
            browserPrefix = "-moz-";
        } else if (navigator.userAgent.indexOf('Chrome') != -1) {
            browserPrefix = "-webkit-";
        } else if (navigator.userAgent.indexOf('Safari') != -1) {
            browserPrefix = "-webkit-";
        }
        var setTransform3D = function (el, degree, perspective, z) {
            degree = Math.max(Math.min(degree, 90), -90);
            z -= 5;
            el.style["-webkit-perspective"] = el.style["perspective"] = el.style["-moz-perspective"] = perspective + "px";
            el.style["-webkit-transform"] = el.style["transform"] = "rotateY(" + degree + "deg) translateZ(" + z + "px)";
        };
        var displayIndex = function (imgSize, spacing, left, imgs, index, flat, width, titleBox) {
            var mLeft = (width - imgSize) * .5 - spacing * (index + 1) - imgSize * .5;
            for (var i = 0; i <= index; ++i) {
                imgs[i].style.left = (left + i * spacing + spacing) + "px";
                imgs[i].style.marginLeft = mLeft + "px";
                imgs[i].style["-webkit-filter"] = "brightness(0.65)";
                imgs[i].style.zIndex = i + 1;
                setTransform3D(imgs[i], flat ? 0 : ((index - i) * 10 + 45), 300, flat ? -(index - i) * 10 : (-(index - i) * 30 - 20));
            }
            imgs[index].style["-webkit-filter"] = "none";
            imgs[index].style.marginLeft = (mLeft + imgSize * .5) + "px";
            imgs[index].style.zIndex = imgs.length;
            titleBox.style.visibility = "hidden";
            if (imgs[index].dataset.info) {
                titleBox.style.visibility = "visible";
                var info = imgs[index].dataset.info;
                titleBox.innerHTML = info;
                titleBox.style.left = (left + index * spacing + spacing + 10) + "px";
                titleBox.style.marginLeft = (mLeft + imgSize * .5) + "px";
            }
            setTransform3D(imgs[index], 0, 0, 5);
            for (var i = index + 1; i < imgs.length; ++i) {
                imgs[i].style.left = (left + i * spacing + spacing) + "px";
                imgs[i].style.marginLeft = (mLeft + imgSize) + "px";
                imgs[i].style["-webkit-filter"] = "brightness(0.7)";
                imgs[i].style.zIndex = imgs.length - i;
                setTransform3D(imgs[i], flat ? 0 : ((index - i) * 10 - 45), 300, flat ? (index - i) * 10 : ((index - i) * 30 - 20));
            }
        };
        var coverflowScroll = function (imgSize, spacing, c, imgs, flat, titleBox) {
            var width = parseInt(c.style.width);
            var p     = 1. * c.scrollLeft / width;
            var index = Math.min(Math.floor(p * imgs.length), imgs.length - 1);
            var left  = c.scrollLeft;
            c.dataset.index = index;
            displayIndex(imgSize, spacing, left, imgs, index, flat, width, titleBox);
        };
        var initCoverFlow = function (c) {
            var imgSize   = parseInt(c.dataset.size) || 64,
                spacing   = parseInt(c.dataset.spacing) || 10,
                shadow    = (c.dataset.shadow == "true") || false,
                imgShadow = !((c.dataset.imgshadow == "false") || false),
                bgColor   = c.dataset.bgcolor || "transparent",
                flat      = (c.dataset.flat == "true") || false,
                width     = c.dataset.width,
                index     = c.dataset.index,
                imgHeight = 0,
                imgs      = [],
                placeholding;
            for (var i = 0; i < c.childNodes.length; ++i)
                if (c.childNodes[i].tagName)
                    imgs.push(c.childNodes[i]);
            for (var i = 0; i < imgs.length; ++i) {
                imgs[i].style.position = "absolute";
                imgs[i].style.width = imgSize + "px";
                imgs[i].style.height = "auto";
                imgs[i].style.bottom = "60px";
                if(!shadow && imgShadow)
                    imgs[i].style.boxShadow = "0 10px 30px rgba(0, 0, 0, 0.3)";
                imgs[i].style["transition"] = browserPrefix + "transform .4s ease, margin-left .4s ease, -webkit-filter .4s ease";
                imgHeight = Math.max(imgHeight, imgs[i].getBoundingClientRect().height);
            }
            c.style.overflowX = "scroll";
            c.style.backgroundColor = bgColor;
            var titleBox = document.createElement("SPAN");
            if (!shadow) {
                titleBox.className = "coverflow-title-box";
                titleBox.style.position = "absolute";
                titleBox.style.width = (imgSize - 20) + "px";
                titleBox.style.height = "20px";
                titleBox.style.lineHeight = "20px";
                titleBox.style.fontSize = "14px";
                titleBox.style.padding = "0 3px";
                titleBox.style.color = "#222";
                titleBox.style.background = "#ddd";
                titleBox.style.borderRadius = "10px";
                titleBox.style.fontWeight = "normal";
                titleBox.style.fontFamily = "'Helvetica Neue', Helvetica, Arial, sans-serif";
                titleBox.style.bottom = "28px";
                titleBox.style.textAlign = "center";
                titleBox.style.display = "block";
                c.appendChild(titleBox);
            }
            setTransform3D(c, 0, 600, 0);
            placeholding = document.createElement("DIV");
            placeholding.style.width = (width ? width * 2 : (imgSize + (imgs.length + 1) * spacing) * 2) + "px";
            placeholding.style.height = "1px";
            c.appendChild(placeholding);
            if(width)
                c.style.width = width + "px";
            else
                c.style.width = (width ? width : (imgSize + (imgs.length + 1) * spacing)) + "px";
            if (shadow) {
                c.style.height = (imgHeight * 2 + 80) + "px";
                c.style["-webkit-perspective-origin"] = c.style["perspective-origin"] = c.style["-moz-perspective-origin"] = "50% 25%";
                for (var i = 0; i < imgs.length; ++i) {
                    imgs[i].style.bottom = (20 + imgHeight) + "px";
                    imgs[i].style["-webkit-box-reflect"] = "below 0 -webkit-gradient(linear, 30% 20%, 30% 100%, from(transparent), color-stop(0.3, transparent), to(rgba(0, 0, 0, 0.8)))";
                }
            }
            else c.style.height = (imgHeight + 80) + "px";
            c.style.position = "relative";
            c.dataset.index = index ? parseInt(index) : 0;
            c.onscroll = function () {
                coverflowScroll(imgSize, spacing, c, imgs, flat, titleBox);
            };
            for (var i = 0; i < imgs.length; ++i)
                imgs[i].onclick = function () {
                    displayIndex(imgSize, spacing, c.scrollLeft, imgs, imgs.indexOf(this), flat, parseInt(c.style.width), titleBox);
                }
            displayIndex(imgSize, spacing, c.scrollLeft, imgs, +c.dataset.index, flat, parseInt(c.style.width), titleBox);
        };
        var coverflows = document.getElementsByClassName("coverflow");
        for (var i = 0; i < coverflows.length; ++i)
            initCoverFlow(coverflows[i]);
    }
})();