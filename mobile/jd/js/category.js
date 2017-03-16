/**
 * Created by Administrator on 2017/2/11.
 */
window.onload = function () {
  leftSwipe();
  rightSwipe();
}
// 左菜单
function leftSwipe() {
  var parentBox = document.querySelector('.jd_category_left');
  var childBox = parentBox.querySelector('ul');
  var parentHeight = parentBox.offsetHeight;
  var childHeight = childBox.offsetHeight;
  var maxY = 0;// 最大定位
  var minY = parentHeight - childHeight;// 最小点位
  var distance = 100;// 缓冲距离
  // 滑动定位
  var maxSwipe = maxY + 100;
  var minSwipe = minY - 100;
  // 1.菜单滑动起来
  var startY = 0;
  var moveY = 0;
  var distanceY = 0;
  var isMove = false;
  var currY = 0;//记录当前的定位 全局
  // 定义公用的方法
  var addTransition = function () {
    childBox.style.webkitTransition = "all .2s";
    childBox.style.transition = "all .2s";
  }
  var removeTransition = function () {
    childBox.style.webkitTransition = "none";
    childBox.style.transition = "none";
  }
  var setTranslateY = function (y) {
    childBox.style.webkitTransform = "translateY("+ y +"px)";
    childBox.style.transform = "translateY("+ y +"px)";
  }
  // 开始绑定事件
  childBox.addEventListener('touchstart',function (e) {
    startY = e.touches[0].clientY;
  });
  childBox.addEventListener('touchmove',function (e) {
    moveY = e.touches[0].clientY;
    distanceY = moveY - startY;
    //console.log(distanceY);
    removeTransition();
    // 2.滑动到一定距离时不能滑动
    if((distanceY + currY) < maxSwipe && (distanceY + currY) > minSwipe){
      setTranslateY(distanceY + currY);
    }
  });
  window.addEventListener('touchend',function (e) {
    // 3.吸附功能
    if((distanceY + currY) > maxY){// 向下滑 大于最大定位
      currY = maxY;
      addTransition();
      setTranslateY(currY);
    }else if((distanceY + currY) < minY){// 向上滑小于最小定位
      currY = minY;
      addTransition();
      setTranslateY(currY);
    }else{
      // 贯穿整个程序
      currY += distanceY;
    }
    // 重置所有的参数
    startY = 0;
    moveY = 0;
    distanceY = 0;
    isMove = false;
  });
  var lis = childBox.querySelectorAll('li');
  itcast.tap(childBox,function (e) {
    //console.log(e.target.parentNode);
    var li = e.target.parentNode;
    for(var i=0;i<lis.length;i++){
      lis[i].className = "";
      lis[i].index = i;
    }
    li.className = "now";
    // 点击定位到那个菜单的最顶部
     var translateY = -li.index * 50;
     if(translateY > minY){
       currY = translateY;
       addTransition();
       setTranslateY(currY);
     }else{
       currY = minY;
       addTransition();
       setTranslateY(currY);
     }
  });


}
// 右菜单
function rightSwipe() {
  itcast.iScroll({
    swipeDom:document.querySelector('.jd_category_right'),
    swipeType:'y',
    swipeDistance:100
  });
}













