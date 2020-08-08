function animate(obj, target, callback) {
  //先清除定时器 只保留一个
  clearInterval(obj.timer);
  obj.timer = setInterval(function () {
    if (obj.offsetLeft === target) {
      clearInterval(obj.timer);
      //回调函数写到定时器结束位置
      if (callback) {
        callback();
      }
    } else {
      //为正向上取整 为负向下取整
      var distance = (target - obj.offsetLeft) / 10;
      if (distance >= 0) {
        distance = Math.ceil(distance);
      } else {
        distance = Math.floor(distance);
      }
      obj.style.left = obj.offsetLeft + distance + "px";
    }
  }, 10);
}
