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
			handler4AlertBtn:function(){alert("you click the alert button");},
			handler4CloseBtn:function(){alert("you click the close button");},
			width:300,
			height:150,
			hasCloseBtn:true,
			// skinClassName:'window_skin_a',
			isDraggable:true,
			dragHandler:".window_header"
		})
	})
})