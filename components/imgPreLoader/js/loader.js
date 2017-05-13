(function() {

  function isArray(obj) {
    return Object.prototype.toString.call(obj).slice(8, -1) === 'Array';
  }

  /**
   * @param imgList 要加载的图片地址列表
   * @param callback 每成功加载一个图片之后的回调，并传入“已加载的图片总数/要加载的图片总数”表示进度
   * @param timeout 每个图片加载的超时时间，默认为5s
   *
   */

   function loader(imgList, callback, timeout) {
    timeout = timeout || 5000;
    imgList = isArray(imgList) && imgList || [];
    callback = typeof(callback) === 'function' && callback;

    var total = imgList.length,
        loaded = 0,
        imgages = [],
        _on = function() {
          loaded < total && (++loaded, callback && callback(loaded / total));
        };

    if(!total) {
      return callback && callback(1);
    }

    for(var i = 0; i < total; i++) {
      imgages[i] = new Image();
      imgages[i].onload = imgages[i].onerror = _on;
      imgages[i].src = imgList[i];
    }

    setTimeout(function() {
      loaded < total && (loaded = total, callback && callback(loaded / total));
    }, timeout * total);
  }

  typeof define === "function" && define.amd ? define(function() {
    return loader
  }) : window.imgLoader = loader;
})();

