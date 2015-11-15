require.config({
	paths: {
		jquery: 'jquery-1.11.3.min',
		jqueryUI: 'jquery-ui'
	}
})

require(['jquery','jqueryUI','window'],function($,$UI,w) {
	$('.myBtn').click(function(){
		var win = new w.window();
		win.alert({
			title:"提示",
			content:"welcome!",
			text4AlertBtn:"购买",
			//只监听一个事件
			handler4AlertBtn:function(){alert("you click the alert button");},
			handler4CloseBtn:function(){alert("you click the close button");},
			width:300,
			height:150,
			hasCloseBtn:true,
			// skinClassName:'window_skin_a',
			isDraggable:true,
			dragHandler:".window_header"
		});

		//绑定自定义事件
		win.on("alert",function(){alert("the second alert handler")});
		win.on("alert",function(){alert("the third alert handler")});
		win.on("close",function(){alert("the second close handler")});
	})
})