(function() {

  var DEFAULTS = {
    container: null,
    list: null,
    autoPlay: false,
    interval: 3000,
    time: 300,
    costTime: 10
  };

  function copy(sourceObj, newProps) {
    if(typeof sourceObj !== 'object') return;
    newProps = typeof newProps === 'object' && newProps || {};
    for(var props in newProps) {
      sourceObj[props] = newProps[props];
    }  
    return sourceObj;
  }

  function Slider(opts) {
    var opts = copy(DEFAULTS, opts);
    var container = document.getElementById(opts.container),
        list = document.getElementById(opts.list),
        buttons = document.getElementById('buttons').getElementsByTagName('span'),
        prev = document.getElementById('prev'),
        next = document.getElementById('next'),
        index = 1,
        animated = false,
        timer = null;

    function showButtons() {
      for(var i = 0; i < buttons.length; i++) {
        if(buttons[i].className === 'on') {
          buttons[i].className = '';
          break;
        }
      }

      buttons[index - 1].className = 'on';
    }    

    function animate(offset) {
      animated = true;
      var newLeft = parseInt(list.style.left) + offset;
      var speed = offset / (opts.time / opts.costTime);

      var go = function() {
        if((speed < 0 && parseInt(list.style.left) > newLeft) || (speed > 0 && parseInt(list.style.left) < newLeft)) {
          list.style.left = parseInt(list.style.left) + speed + 'px';
          setTimeout(go, opts.costTime);
        } else {
          animated = false;
          list.style.left = newLeft + 'px';
          
          if(newLeft < -3000) {
            list.style.left = '-600px';
          }
          if(newLeft > -600) {
            list.style.left = '-3000px';
          }
        }
      }

    	go();
    }

    next.onclick = function() {
      
      if(index >= 5) {
        index = 1;
      } else {
        index += 1;
      }
      if(!animated) {
        animate(-600);
      }
      
      showButtons();
    }

    prev.onclick = function() {
      
      if(index <= 1) {
        index = 5;
      } else {
        index -= 1;
      }

      if(!animated) {
        animate(600);
      }

      showButtons();
    }  

    for(var i = 0; i < buttons.length; i++) {
      buttons[i].onclick = function() {
        if(this.className === 'on') return;
        var myIndex = this.getAttribute('index');
        var offset = -600 * (myIndex - index);
        index = myIndex;
        if(!animated) {
          animate(-600);
        }
        showButtons();
      }
    }  

    function play() {
      timer = setInterval(function() {
        next.onclick();
      }, opts.interval)
    }

    function stop() {
      clearInterval(timer);
    }

    container.onmouseover = stop;
    container.onmouseout = play;
    
    opts.autoPlay && play()

  }

  window.Slider = Slider;
})();