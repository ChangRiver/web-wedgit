requirejs.config({
	baseurl: './',
	paths: {
		jquery: '../../../libs/jquery-3.2.0',
		sticky: 'sticky'
	}
});


require(['jquery', 'sticky'], function($, sticky) {
	new sticky('#sticky', {
		getStickyWidth: function($elem){
			return ($elem.parent()[0].offsetWidth - 30);
		}
	})
});