'use strict';

(function(factory) {
  'use strict';
  if (typeof define === 'function' && define.amd) {
    define(['jquery'], factory);
  } else if (typeof exports !== 'undefined') {
    module.exports = factory(require('jquery'));
  } else {
    factory(jQuery);
  }
}(function($) {

  var Slider = function(el,options) {

    this.$container = $('#container');
    this.$list = $(el);
    this.options = $.extend(true, Slider.defaults, options);

    this.init();
  };


  Slider.defaults = {
    width: '600',
    height: '400',
    speed: '3000',
    animateTime: '300',
    isAutoplay: true,
    isArrow: false,
    isButtons: false
  };


  Slider.prototype.init = function(){
    var $container = this.$container;
    var $list =  this.$list;
    var options = this.options;
    var that = this;
    this.offset = options.width; // img width
    this.height = options.height;
    this.$pre = $('#prev');
    this.next = $('#next');
    this.speed = options.speed;
    this.timer = 0;
    this.index = 1;
    this.len = 5; //  this.len == 5

    // reset width
    $container.css('width', this.offset);
    $container.css('height', this.options.height);
    this.offset = $container.width(); //  使用百分比需再次获取实际宽度
    $list.css('width', this.offset * (this.len + 2));
    $list.children().css('width', this.offset);

    this.width = $container.width();


    // show first img
    $list.css('left', -this.offset);

    //  add first and last img
    $list.append($list.children().eq(0).clone());
    $list.prepend($list.children().eq(this.len - 1).clone());


    //  reset height
    if (this.height == 'auto'){
      this.height = $list.children().height();
    }
    else {
      this.height = options.height;
    }
    $container.css('height', this.height);
    $list.css('height', this.height);
    $list.children().css('height', this.height);


    //  add buttons nav
    if (options.isButtons){
      var btnsBox = '<div id="buttons">';
      var btns = '';
      for (var i = 0; i < this.len; i++){
        if (i == 0){
          btns += '<span class="on" index="' + (i + 1) + '"></span>';
        }
        else {
          btns += '<span index="' + (i + 1) + '"></span>';
        }
      }
      $container.append(btnsBox + btns + '</div>');
    }

    this.$buttons = $('#buttons').children();

    //  isArrow
    if (options.isArrow){
      that.arrow();
    }

    //  isAutoplay
    if (options.isAutoplay){
      that.autoplay();
      // this.imgHover();
    }

    this.btnImg();
  };


  Slider.prototype.move = function(offset){
    var $container = this.$container;
    var options = this.options;
    var $list =  this.$list;
    var imgWidth = $container.width();
    var len = this.len;
    var left = parseInt($list.css('left')) + offset;

    if (offset > 0) {
      offset = '+=' + offset;
    }
    else {
      offset = '-=' + Math.abs(offset);
    }

    $list.animate({'left': offset}, options.animateTime, function() {
      if (left > -imgWidth){
        $list.css('left', -imgWidth * len);
      }
      if (left < (-imgWidth * len)) {
        $list.css('left', -imgWidth);
      }
    });

  };


  Slider.prototype.arrowPre = function() {
    // var len = this.len;
    // if (this.$list.is(':animated')) {
    //   return;
    // }
    // if (this.index == 1){
    //   this.index = len;
    // }
    // else {
    //   this.index -= 1;
    // }
    //
    this.getIndex(1, this.len, -1);
    this.move(this.offset);
    // this.showBtn();
  };

  Slider.prototype.getIndex = function(myIndex, setIndex, size) {
    // if (this.$list.is(':animated')) {
    //   return;
    // }

    if (this.index == myIndex){
      this.index = setIndex;
    }
    else {
      this.index += size;
    }

    this.showBtn();
  };


  Slider.prototype.arrowNext = function() {
    // var len = this.len;
    // if (this.$list.is(':animated')) {
    //   return;
    // }
    //
    // if (this.index == len){
    //   this.index = 1;
    // }
    // else {
    //   this.index += 1;
    // }
    this.getIndex(this.len, 1, 1);
    this.move(-this.offset);
    // this.showBtn();
  };


  Slider.prototype.arrow = function(){
    var that = this;

    // add arrow
    var pre = '<a href="javascript:;" id="prev" class="arrow">&lt;</a>';
    var next = '<a href="javascript:;" id="next" class="arrow">&gt;</a>';
    this.$container.append(pre + next);

    $('#prev').on('click', function() {
      that.arrowPre();
    });
    $('#next').on('click', function() {
      that.arrowNext();
    });
  };


  Slider.prototype.autoplay = function(){
    var speed = this.speed;
    var that = this;
    this.timer = setTimeout(function(){
      that.arrowNext();
      that.showBtn();
      that.imgHover();
      that.autoplay();
    },speed);

  };


  Slider.prototype.stop = function() {
    clearTimeout(this.timer);
  };


  // when hover stop
  Slider.prototype.imgHover = function(){
    var container = this.$list.parent();
    var that = this;

    container.hover(function() {
      that.stop();
    }, function() {
      that.autoplay();
    });
  };


  Slider.prototype.showBtn = function(){
    var $buttons = this.$buttons;
    $buttons.eq(this.index - 1).addClass('on').siblings().removeClass('on');
  };


  Slider.prototype.btnImg = function() {
    var $container = this.$container;
    var $buttons = this.$buttons;
    var imgWidth = $container.width();
    var that = this;

    $buttons.each(function() {
      $(this).click(function() {
        if (that.$list.is(':animated')){
          return;
        }

        // show click img
        var myIndex = parseInt($(this).attr('index'));
        var offset = -imgWidth * (myIndex - that.index);

        that.move(offset);
        that.index = myIndex;
        that.showBtn();
      });
    });
  };


  $.fn.slider = function() {
    var that = this;
    var opt = arguments[0];
    var length = this.length;

    for (var i = 0; i < length; i++){
      // console.log(i);
      if (typeof opt == 'object' || typeof opt == 'undefined'){
        that[i].slider = new Slider(that[i], opt);
      }

      var slider = that[i].slider[opt];
      if (typeof slider == 'function') {
        slider.call(that[i].slider);
      }
      else {
        return slider;
      }
    }

    return that;
  };

}));



$('#list').slider({
  width: '900',
  height: '500',
  speed: 3000,
  animateTime: '30',
  isAutoplay: false,
  isArrow: true,
  isButtons: true
});
