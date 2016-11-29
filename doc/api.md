# slider API 说明


## 默认参数

  Slider.defaults = {
      width: '600',
      height: '400',
      speed: '3000',
      animateTime: '300',
      isAutoplay: true,
      isArrow: false,
      isButtons: false
    };


##属性

获取宽度:

  $('#list').slider('width');

获取高度：

  $('#list').slider('height');


## 方法

自动播放：

  $('#list').slider('autoplay');

切换上一张：

  $('#list').slider('arrowPre');

切换下一张：

  $('#list').slider('arrowNext');

按钮点击:

  $('#list').slider('btnImg');
