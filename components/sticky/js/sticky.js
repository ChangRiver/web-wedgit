define(['jquery'], function($) {
  var DEFAULTS = {
    target: '', //target元素的jq选择器
    type: 'top', //固定的位置，top | bottom，默认为top，表示固定在顶部
    wait: 5, //scroll事件回调的间隔
    stickyOffset: 0, //固定时距离浏览器可视区顶部或底部的偏移，用来设置top跟bottom属性的值，默认为0
    isFixedWidth: true, //sticky元素宽度是否固定，默认为true，如果是自适应的宽度，需设置为false
    getStickyWidth: null, //用来获取sticky元素宽度的回调，在不传该参数的情况下，stickyWidth将设置为sticky元素的offsetWidth
    unStickyDistance: null, //该参数决定sticky元素何时进入dynamicSticky状态
    onSticky: null, //sticky元素固定时的回调
    onUnSticky: null //sticky元素取消固定时的回调
  };


  function throttle(func, wait) {
  	var timer = null;
  	return function() {
  		var self = this, args = arguments;
  		if(timer) clearTimeout(timer);
  		timer = setTimeout(function(){
  			typeof func === 'function' && func.apply(self, args);
  		}, wait);
  	}
  }
  
  function Sticky(elem, opts) {
    var $elem = $(elem);
    opts = $.extend({}, DEFAULTS, opts || {}, $elem.data() || {});
    var $target = $(opts.target);
    if(!$elem.length || !$target.length) return;
    
    var stickyWidth,
        $win = $(window),
        docClientHeight = document.documentElement.clientHeight,
        unStickyDistance = opts.unStickyDistance || $elem[0].offsetHeight,
        className = 'sticky--in-' + opts.type;

    var setStickyWidth = function() {
        	stickyWidth = typeof opts.getStickyWidth === 'function' && opts.getStickyWidth($elem) || $elem[0].offsetWidth;
        };

    var setSticky = function() {
    	!$elem.hasClass(className) && $elem.addClass(className).css('width', stickyWidth) &&
    	typeof (opts.onSticky === 'function' && opts.onSticky($elem, $target));
    	return true;
    };
    
    var states = {
    	staticSticky: function() {
    		setSticky() && $elem.css(opts.type, opts.stickyOffset);
    	},
    	dynamicSticky: function(rect) {
    		setSticky() && $elem.css(opts.type, rules[opts.type].getDynamicOffset(rect));
    	},
    	unSticky: function() {
    		$elem.hasClass(className) && $elem.removeClass(className).css(opts.type, '')
    		&& (typeof opts.unSticky === 'function' && opts.unSticky($elem, $target)); 
    	} 
    };

    var rules = {
     	top: {
     		getState: function(rect) {
     			if(rect.top < 0 && (rect.bottom - unStickyDistance) > 0) return 'staticSticky';
     			else if((rect.bottom - unStickyDistance) <= 0 && rect.bottom > 0) return 'dynamicSticky';
     			else return 'unSticky';
     		},
     		getDynamicOffset: function(rect) {
     			return -(unStickyDistance - rect.bottom);
     		}
     	},
     	bottom: {
     		getState: function(rect) {
     			if(rect.bottom > docClientHeight && (rect.top + unStickyDistance) < docClientHeight) return 'staticSticky';
     			else if ((rect.top + unStickyDistance) >= docClientHeight && rect.top < docClientHeight) return 'dynamicSticky';
     			else return 'unSticky';
     		},
         getDynamicOffset: function(rect) {
         	return -(unStickyDistance + rect.top - docClientHeight);
         }
      }
    }; 

    setStickyWidth(); 

    function sticky() {
    	var rect = $target[0].getBoundingClientRect(),
    	    curState = rules[opts.type].getState(rect);
    	states[curState](rect);    
    }


    $win.scroll(throttle(sticky, opts.wait));
    
    !opts.isFixedWidth && $win.resize(throttle(function() {
    	setStickyWidth();
    	$elem.hasClass(className) && $elem.css('width', stickyWidth);
    	sticky();
    }, opts.wait))

    $win.resize(throttle(function() {
    	docClientHeight = document.documentElement.clientHeight;
    }, opts.wait));

  }

  return Sticky;
});