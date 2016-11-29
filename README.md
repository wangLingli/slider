#Slider demo#

## How to use

###use css ###
	<link rel="stylesheet" href="css/style.css" >

###use js ###
	<script src="js/jquery-2.1.0.js" charset="utf-8"></script>
	<script src="js/slider.js" charset="utf-8"></script>


## 使用案例 ##

	$('#list').slider({
	    width: '900',	// 宽度可设置百分比
	    height: '500',	// 高度可设置auto
	    speed: 3000,	// 图片切换时间
	    animateTime: 30,	//	动画执行时间
	    isAutoplay: true,	// 是否自动播放
	    isArrow: true,	// 是否显示左右箭头
	    isButtons: true //	是否显示按钮导航
	  });

## develop
	npm start
