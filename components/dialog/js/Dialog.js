define(['jquery'],function($) {

  // 利用闭包的特性，判断是否已经存在实例
  var instance;

  var DEFAULT_CONFIG = {
    title: '这是标题',
    content: '这是提示内容',
    text4confirmBtn: '确认',
    text4cancelBtn: '取消'
  };

  function Dialog(config) {
    this.dialog = null;
    this.config = $.extend({}, DEFAULT_CONFIG, config);
  }

  Dialog.prototype = {
    constructor: Dialog,
    renderUI: function() {
      this.dialog = $('<div class="dialog-dropback">' +
        '<div class="container">' +
          '<div class="head">'+ this.config.title + '</div>'+
          '<div class="content">'+ this.config.content + '</div>' +
          '<div class="footer">' +
            '<button class="cancel">' + this.config.text4cancelBtn +'</button>' +
            '<button class="cancel">' + this.config.text4confirmBtn +'</button>' +
          '</div>' +
        '</div>' +
      '</div>'
      );

      this.dialog.appendTo(document.body);
    },
    show: function() {
      var that = this;
      this.renderUI();
      instance = this;

      return new Promise(function(resolve, reject) {
        $('.dialog-dropback .cancel').on('click', function(e) {
          that.hide();
          reject(e);
        });

        $('.dialog-dropback .confirm').on('click', function (e) {
          that.hide();
          resolve(e);
        });
      })
    },
    destroy: function () {
      instance = null;
      $('.dialog-dropback .cancel').off('click');
      $('.dialog-dropback .confirm').off('click');
      this.dialog.remove();
    },
    hide: function() {
      this.destroy();
    }
  };

  return Dialog
});