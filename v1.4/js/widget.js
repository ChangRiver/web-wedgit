//为 widget 类添加统一的生命周期, (约定一些接口和方法)
define(['jquery'],function($) {
	function Widget() {
		this.boundingBox = null; //属性: 最外层容器
	}

	Widget.prototype = {
		on: function(type, handler){	//绑定事件
			if(typeof this.handlers[type] === "undefined") {
				this.handlers[type] = [];
			}
			this.handlers[type].push(handler);
			return this;
		},
		fire: function(type, data){		//触发事件
			if(this.handlers[type] instanceof Array) {
				var handlers = this.handlers[type];
				for(var i=0,len = handlers.length;i<len;i++) {
					handlers[i](data);
				}
			}
		},
		render: function(container){   //方法: 渲染组件
			this.renderUI();
			this.handlers = {};
			this.bindUI();
			this.syncUI();
			$(container || document.body).append(this.boundingBox);
		},
		renderUI: function(){},        //接口: 添加dom 节点
		bindUI: function(){},          //接口: 监听事件
		syncUI: function(){},          //接口: 初始化组件属性
		destructor: function(){},       //接口：销毁前的处理函数
		destroy: function(){			//方法：销毁组件
			this.destructor();
			this.boundingBox.off();
			this.boundingBox.remove();
		}	
	};

	return {Widget:Widget}
})