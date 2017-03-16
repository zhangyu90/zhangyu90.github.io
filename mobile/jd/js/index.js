/**
 * Created by Administrator on 2017/2/10 0010.
 */
window.onload = function () {
  search();
  banner();
  downTime();
}
// 头部滚动变色
function search() {
  var searchBox = document.querySelector('.jd_header_box');
  var bannerBox = document.querySelector('.jd_banner');
  var height = bannerBox.offsetHeight;
  window.onscroll = function () {
    var top = document.body.scrollTop,opacity = 0;
    if(top > height){
      opacity = 0.85;
    }else{
      opacity = 0.85 * (top/height);
    }
    searchBox.style.backgroundColor = "rgba(201,21,35,"+ opacity +")";
  }

}
// 轮播图部分
function banner() {
  // 准备工作
  var banner = document.querySelector('.jd_banner');
  var width = banner.offsetWidth;
  var imageBox = document.querySelector('ul:first-child');
  var pointBox = document.querySelector('ul:last-child');
  var points = pointBox.querySelectorAll('li');
  var addTransition = function () {// 添加过渡方法
    imageBox.style.webkitTransition = "all .5s";
    imageBox.style.transition = "all .5s";
  }
  var removeTransition = function () {// 删除过渡方法
    imageBox.style.webkitTransition = "none";
    imageBox.style.transition = "none";
  }
  var setTranslateX = function (x) {// 定位方法
    imageBox.style.webkitTransform = "translateX("+x+"px)";
    imageBox.style.transform = "translateX("+x+"px)";
  }
  //  1.自动轮播
  var index = 1;
  var timer = setInterval(function () {
    index++;
    addTransition();

    setTranslateX(-index * width);
  },3000);
  // 无缝的滚动和滑动
  itcast.transitionEnd(imageBox,function () {
    if(index >= 9){
      index = 1;
      // 瞬间定位 去除过渡 重新定位
      removeTransition();
      setTranslateX(-index * width);
    }else if(index <= 0){
      index = 8;
      // 瞬间定位 去除过渡 重新定位
      removeTransition();
      setTranslateX(-index * width);
    }
    setPoint();
  });
  // 随图片变换的小点
  var setPoint = function () {
    for(var i=0;i<points.length;i++){
      points[i].className = "";
    }
    points[index-1].className = "now";
  }
  // 图片盒子滑动
  var startX = 0,// 开始的x坐标
      moveX = 0, // 移动时的x坐标
      distanceX =0,// 移动距离
      isMove = false; // 判断是否滑动
  imageBox.addEventListener('touchstart',function (e) {
    clearInterval(timer);
    startX = e.touches[0].clientX;
  });
  imageBox.addEventListener('touchmove',function (e) {
    isMove = true;
    moveX = e.touches[0].clientX;
    distanceX = moveX - startX;
    removeTransition();
    setTranslateX(-index * width + distanceX);
  });
  //在谷歌的模拟器会出现  一个问题就是  touchend的时候可能会丢失事件
  window.addEventListener('touchend',function (e) {
    // 吸附功能
    if(Math.abs(distanceX) > (width/3) && isMove){
      if(distanceX>0){index--;}else{index++;}
      addTransition();
      setTranslateX(-index * width);
    }else{
      addTransition();
      setTranslateX(-index * width);
    }
    // 重置参数
    startX = 0;
    moveX = 0;
    distanceX = 0;
    isMove = false;
    clearInterval(timer);// 重新启用定时器
    timer = setInterval(function () {
      index++;
      addTransition();
      setTranslateX(-index * width);
    },3000);
  });
}
// 倒计时
function downTime() {
  var spans = document.querySelector('.sk_time').children;
  var time = 3 * 60 * 60;
  var timer = setInterval(function () {
    time--;
    if(time < 0){
      clearInterval(timer);
      return false;
    }
    var h = Math.floor(time/3600),
      m = Math.floor(time%3600/60),
      s = time%60;
    spans[0].innerHTML = Math.floor(h / 10);
    spans[1].innerHTML = h % 10;
    spans[3].innerHTML = Math.floor(m / 10);
    spans[4].innerHTML = m % 10;
    spans[6].innerHTML = Math.floor(s / 10);
    spans[7].innerHTML = s % 10;
  },1000);
}




























