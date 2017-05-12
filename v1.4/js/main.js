require.config({
	paths: {
		jquery: 'jquery-1.11.3.min',
		jqueryUI: 'jquery-ui'
	}
});

require(['jquery','jqueryUI','window'],function($,$UI,w) {

	// alert弹窗
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
		}).on("alert",function(){alert("the second alert handler")

		}).on("close",function(){alert("the second close handler")
		});

		//绑定自定义事件
		win.on("alert",function(){alert("the third alert handler")});
	});

	// confirm弹窗
	$('.myBtn2').click(function(){
		var win = new w.window();

		win.confirm({
			title: '系统消息',
			content: '您确定要删除这个文件吗?',
			width: 300,
			height: 150,
			y: 50,
			text4ConfirmBtn: '是',
			text4CancelBtn: '否'
		}).on('confirm', function() {
			alert('确定');
		}).on('cancel', function() {
      alert('取消');
		})
	});

	// prompt弹窗
  $('.myBtn3').on('click', function() {
  	var win = new w.window();

  	win.prompt({
  		title: '请输入您的名字',
  		content: '我们将会为您保存您输入的的信息',
  		width: 300,
  		height: 150,
  		y: 50,
  		text4PromptBtn: '输入',
  		text4CancelBtn: '取消',
  		defaultValue4PromptInput: '张三',
  		handler4PromptBtn: function(inputValue){
  			alert('您输入的内容是: ' + inputValue);
  		},
  		handler4CancelBtn: function(){
  			alert('取消');
  		}
  	});
  });

	// common弹窗
  $('.myBtn4').on('click', function() {
  	var win = new w.window();

  	win.common({
  		content: '我是一个通用弹窗',
			width: 300,
			height: 150,
			y: 50,
			hasCloseBtn: true
  	});
  });

});