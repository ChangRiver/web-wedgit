//window.js
define(['widget','jquery','jqueryUI'],function(widget,$,$UI) {
	function window() {
		this.cfg = {
					width:600,
					height:350,
					title:'系统消息',
					text4AlertBtn:"确定",
					hasCloseBtn:false,
					content:'',
					handler4AlertBtn:null,
					handler4CloseBtn:null,
					skinClassName:null,
					hasMask:true,
					isDraggable:true,
					dragHandler:null
			}
	}

	window.prototype = $.extend({}, new widget.Widget(),{
		alert:function(cfg) {

			var CFG = $.extend(this.cfg, cfg);
			var boundingBox = $('<div class="window_boundingBox">'+
					'<div class="window_header">'+CFG.title+'</div>'+
					'<div class="window_body">'+CFG.content+'</div>'+
					'<div class="window_footer"><input type="button" value="'+CFG.text4AlertBtn+'"></div>'+
					'</div>'
				)

			boundingBox.appendTo('body');
			var btn = boundingBox.find(".window_footer input");

			mask = null;
			var that = this;

			//添加遮罩
			if(CFG.hasMask) {
				mask = $('<div class="window_mask"></div>');
				mask.appendTo('body');
			}

			if(CFG.hasCloseBtn) {
				var closeBtn = $('<span class="window_closeBtn">X</span>');
				closeBtn.appendTo(boundingBox);
				closeBtn.click(function() {
					CFG.handler4CloseBtn&&CFG.handler4CloseBtn();
					that.fire("close");
					boundingBox.remove();
					mask && mask.remove();
				})
			}

			//底部按钮的事件监听
			btn.click(function() {
				CFG.handler4AlertBtn && CFG.handler4AlertBtn()
				that.fire("alert"); //自定义事件的触发
				mask && mask.remove();
				boundingBox.remove();
			})

			//拖动
			if(CFG.isDraggable) {
				if(CFG.dragHandler) {
					boundingBox.draggable({handle:CFG.dragHandler});
				}else {
					boundingBox.draggable();
				}
			}

			//添加样式
			boundingBox.css({
				width: CFG.width + 'px',
				height: CFG.height + 'px'
			})

			return this;
		},
		confirm: function() {

		},
		prompt: function() {

		}
	});
	
	return {window:window}
})