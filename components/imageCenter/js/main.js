requirejs.config({
	baseurl: './',
	paths: {
		jquery: '../../../libs/jquery-3.2.0',
		imageCenter: 'imageCenter'
	}
});

require(['jquery', 'imageCenter'],function($, imageCenter) {
	var imageWrapList = document.querySelectorAll('.img-center');
  imageCenter(imageWrapList, 'wspectFill');
})