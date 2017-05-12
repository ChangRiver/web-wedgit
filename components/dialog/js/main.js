requirejs.config({
  baseurl: './',
  paths: {
    jquery: '../../../libs/jquery-3.2.0'
  }
});

require(['jquery', 'Dialog'],function($, Dialog) {
  $('button.aspect').on('click', function() {
    var dialog = new Dialog({
      title: '友情提示',
      content: '外面空气不太好，你确定你要出门逛逛吗？'
    });

    dialog.show().then(function() {
      console.log('你点击了确认按钮.');
    }).catch(function() {
      console.log('你点击了取消按钮.');
    })
  })
});