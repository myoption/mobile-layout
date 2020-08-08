window.addEventListener("load", function () {
  //1.获取元素 创建元素
  var ul = document.querySelector(".banner ul");
  var ol = document.querySelector(".banner ol");
  // 动态添加小圆圈
  var liNum = ul.children.length;
  var banner = document.querySelector(".banner");
  console.log(liNum);
  for (var i = 0; i < liNum; i++) {
    var li = document.createElement("li");
    li.setAttribute("data-index", i);
    ol.appendChild(li);
  }
  //分别复制第一张到最后 最后一行到最前 无缝轮播
  var first = ul.children[liNum - 1].cloneNode(true);
  ul.insertBefore(first, ul.firstChild);
  var last = ul.children[1].cloneNode(true);
  ul.appendChild(last);
  ol.children[0].className = "current";
  //   console.log(last);
  //2.添加事件
  //自动播放 移动端用transform
  var times = 0;
  var boxWidth = banner.offsetWidth;
  var timer = setInterval(function () {
    times++;
    ul.style.transition = "all .5s";
    ul.style.transform = "translateX(" + -times * boxWidth + "px)";
  }, 1000);
  //过度完成之后切换ul位置
  ul.addEventListener("transitionend", function () {
    if (times > liNum - 1) {
      times = 0;
      //去掉过度 快速跳到第一张位置
      ul.style.transition = "none";
      ul.style.transform = "translateX(0)";
    }
    //如果索引号小于0 倒着着  快速跳到最后一张位置
    else if (times < 0) {
      times = liNum - 1;
      ul.style.transition = "none";
      ul.style.transform = "translateX(" + -times * boxWidth + "px)";
    }
    //小圆圈跟随变化
    var current = document.querySelector(".banner ol .current");
    current.classList.remove("current");
    ol.children[times].classList.add("current");
  });
  //手指滑动轮播图 左右滑动
  //触摸元素获取初始坐标 touchstart
  var startX = 0;
  var moveX = 0;
  ul.addEventListener("touchstart", function (e) {
    // console.log(e);
    startX = e.targetTouches[0].pageX;
    // console.log(startX);
    clearInterval(timer);
  });
  //移动手指 计算距离 移动盒子 touchmove
  ul.addEventListener("touchmove", function (e) {
    // console.log(e);
    // console.log(e.targetTouches[0].pageX);
    moveX = e.targetTouches[0].pageX - startX;
    //手指移动取消动画
    ul.style.transition = "none";
    var target = -times * boxWidth + moveX;
    console.log(target);
    ul.style.transform = "translateX(" + target + "px)";
  });
  // 手指触摸时 停止轮播 离开时添加轮播
  ul.addEventListener("touchend", function (e) {
    //如果移动距离大于某个值切换上/下 小于则返回
    if (Math.abs(moveX) > 100) {
      if (moveX > 0) {
        times--;
      } else {
        times++;
      }
      //需要添加过度  来循环 和变色小圆圈
      ul.style.transition = "all .5s";
      ul.style.transform = "translateX(" + -times * boxWidth + "px)";
    } else {
      ul.style.transition = "all .5s";
      ul.style.transform = "translateX(" + -times * boxWidth + "px)";
    }
    //手指离开 恢复定时器
    timer = setInterval(function () {
      times++;
      ul.style.transition = "all .5s";
      ul.style.transform = "translateX(" + -times * boxWidth + "px)";
    }, 1000);
  });
  //点击小圆圈时 变色
  for (var j = 0; j < liNum; j++) {
    ol.children[j].addEventListener("click", function () {
      //方法1 for循环
      /*  for (var k = 0; k < liNum; k++) {
        ol.children[k].className = "";
      }
      this.className = "current"; */
      //方法2 classList的方法设置
      var current = document.querySelector(".banner ol .current");
      current.classList.remove("current");
      this.classList.add("current");
    });
  }
});
