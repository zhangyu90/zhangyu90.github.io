/**
 * Created by Administrator on 2017/2/13.
 */
$(function(){
  banner();
//  初始化tabs页签
  initTabs();
//  初始化工具提示
  $('[data-toggle="tooltip"]').tooltip();
});
// 动态响应轮播图
function banner(){
  var myData;
  // 获取后台数据
  var getData = function (callback) {
    if(myData){
      callback && callback(myData);
      return false;
    }
    $.ajax({
      url:'js/index.json',
      data:{},
      get:'get',
      dataType:'json',
      success:function (data) {
        myData = data;
        callback && callback(myData);
      }
    });
  }
  // 渲染方法
  var renderHtml = function () {
    getData(function (data) {
      var width = $(window).width();
      var isMobile = false;
      if(width < 768){isMobile = true;}
      // 点的模板对象
      var templatePoint = _.template($('#template_point').html());
      // 图片的模板对象
      var templateImage = _.template($('#template_item').html());
      // 解析成html
      var pointHtml = templatePoint({model:data});
      var imageData = {list:data,isMobile:isMobile};
      var imageHtml = templateImage({model:imageData});
      $('.carousel-indicators').html(pointHtml);
      $('.carousel-inner').html(imageHtml);

    });
  }
  $(window).on('resize',function () {
    renderHtml();
  }).trigger('resize');
  // 移动端需求，通过手势来控制图片滑动
  var startX = 0;
  var moveX =0;
  var distanceX = 0;
  var isMove = false;
  $('.wjs_banner').on('touchstart',function (e) {
    startX = e.originalEvent.touches[0].clientX;
  });
  $('.wjs_banner').on('touchmove',function (e) {
    isMove = true;
    moveX = e.originalEvent.touches[0].clientX;
    distanceX = moveX - startX;

  });
  $('.wjs_banner').on('touchend',function (e) {
    if(Math.abs(distanceX) > 50 && isMove){
      if(distanceX < 0){// 下一张
        $('.carousel').carousel('next');
      }else{// 上一张
        $('.carousel').carousel('prev');
      }
    }
    // 重置参数
    startX = 0;
    moveX =0;
    distanceX = 0;
    isMove = false;
  });
}
// 初始化标签页
function initTabs() {
  var ul = $('.wjs_product .nav-tabs');
  var lis = ul.find('li');
  var width = 0;
  $.each(lis,function (i,o) {
    width += $(o).innerWidth();
  });
  ul.width(width);
//  移动端的滑动
  itcast.iScroll({
    swipeDom:$('.wjs_product_tabsParent').get(0),
    swipeType:'x',
    swipeDistance:50
  });
}















