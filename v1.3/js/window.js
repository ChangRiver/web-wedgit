define(['widget','jquery','jqueryUI'], function(widget,$,$UI) {
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

	window.prototype = $.extend({},new widget.Widget(),{
		renderUI: function() {
			this.boundingBox = $('<div class="window_boundingBox">'+
					'<div class="window_header">'+this.cfg.title+'</div>'+
					'<div class="window_body">'+this.cfg.content+'</div>'+
					'<div class="window_footer"><input type="button" value="'+this.cfg.text4AlertBtn+ '" class="window_alertBtn"' +'></div>'+
					'</div>'
				);
			if(this.cfg.hasMask){
				this._mask = $('<div class="window_mask"></div>');
				this._mask.appendTo('body');
			}
			if(this.cfg.hasCloseBtn){
				this.boundingBox.append('<span class="window_closeBtn">X</div>');
			}

			this.boundingBox.appendTo(document.body);
		},
		bindUI: function(){
			var that = this;

			this.boundingBox.delegate(".window_alertBtn","click",function(){
				that.fire('alert');
				that.destroy();
			}).delegate(".window_closeBtn","click",function(){
				that.fire('close');
				that.destroy();
			});
			if(this.cfg.handler4AlertBtn) {
				this.on("alert",this.cfg.handler4AlertBtn);
			}
			if(this.cfg.handler4CloseBtn) {
				this.on("close",this.cfg.handler4CloseBtn);
			}
		},
		syncUI:function(){
			this.boundingBox.css({
				width: this.cfg.width + 'px',
				height: this.cfg.height + 'px'
			});
			if(this.cfg.skinClassName) {
				this.boundingBox.addClass(this.cfg.skinClassName);
			}
			if(this.cfg.isDraggable) {
				if(this.cfg.dragHandler) {
					this.boundingBox.draggable({handle:this.cfg.dragHandler});
				}else {
					this.boundingBox.draggable();
				}
			}
		},
		destructor:function(){
			this._mask && this._mask.remove();
		},
		alert:function(cfg) {
			$.extend(this.cfg, cfg);
			this.render();
			return this;
		},
		confirm:function(){

		},
		prompt:function(){

		}
	})

	return {window:window}
})