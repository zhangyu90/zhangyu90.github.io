/**
 * Created by Administrator on 2017/2/11.
 */
//公用js文件
window.itcast = {};
itcast.transitionEnd = function (dom,callback) {
  if(dom && typeof dom == 'object'){
    dom.addEventListener('webkitTransitionEnd',function () {
      callback && callback();
    })
    dom.addEventListener('transitionEnd',function () {
      callback && callback();
    })
  }
}
// 封装tap
itcast.tap = function (dom,callback) {
  var isMove = false;
  var startTime = 0;
  if(dom && typeof dom == 'object'){
    dom.addEventListener('touchstart',function (e) {
      startTime = Date.now();
    });
    dom.addEventListener('touchmove',function (e) {
      isMove = true;
    });
    dom.addEventListener('touchend',function (e) {
      if(!isMove && (Date.now() - startTime) < 150){
      //  满足条件调用函数
        callback && callback(e);
      }
    //  重置参数
      isMove = false;
      startTime = 0;
    });
  }
}








