
var interval;

(function ($) {

	var copyRightHTML = '<div class="copyright">&copy; Tatikonda Sree Lakshmi, Research Engineer, VLabs IITKGP.</div>';
	var slideshow_html = '<div><img src="images/1.jpg" data-fullscreen-image="images/1.jpg" /></div>'+
				'<div><img src="images/2.jpg" data-fullscreen-image="images/2.jpg" /></div>'+
				'<div><img src="images/3.jpg" data-fullscreen-image="images/3.jpg" /></div>';
	$("#footer").append(copyRightHTML);

	$(document).on("click", "#cavitation", function () {
		$(".graph-display").html('').html('<img src="images/cavitation.jpg" data-fullscreen-image="images/cavitation.jpg" />');
	});

	$(document).on("click", "#without-cavitation", function () {
		$(".graph-display").html('').html('<img src="images/without cavitation.jpg" data-fullscreen-image="images/without cavitation.jpg" />');
	});

	$(document).on("click", "#slide-start", function () {
		var timesRun = 0;
		interval =	setInterval(function () {
				$('.slideshow > div:first')
					.hide()
					.next()
					.show()
					.end()
					.appendTo('.slideshow') ;
				timesRun += 1;
				if(timesRun === 1000){
					clearInterval(interval);
				}
			}, 600);

		$("#slide-start").prop("disabled",true);
		$("#slide-stop").prop("disabled",false);
		$("#cavitation").prop("disabled",false);
		$("#without-cavitation").prop("disabled",false);
	});

	$(document).on("click", "#slide-stop", function () {
		clearInterval(interval);
		$(".slideshow").html('').html(slideshow_html);
		$(".slideshow > div:gt(0)").hide();

		$("#slide-start").prop("disabled",false);
		$("#slide-stop").prop("disabled",true);
		$("#cavitation").prop("disabled",true);
		$("#without-cavitation").prop("disabled",true);
		$(".graph-display").html('')
	});

	function getRandomArbitrary(min, max) {
	  return Math.random() * (max - min) + min;
	}

	var $window = $(window),
		$banner = $('#banner'),
		$body = $('body');

	// Breakpoints.
	breakpoints({
		default: ['1681px', null],
		xlarge: ['1281px', '1680px'],
		large: ['981px', '1280px'],
		medium: ['737px', '980px'],
		small: ['481px', '736px'],
		xsmall: ['361px', '480px'],
		xxsmall: [null, '360px']
	});

	// Play initial animations on page load.
	$window.on('load', function () {
		window.setTimeout(function () {
			$body.removeClass('is-preload');
		}, 100);
	});

	// Menu.
	$('#menu')
		.append('<a href="#menu" class="close"></a>')
		.appendTo($body)
		.panel({
			target: $body,
			visibleClass: 'is-menu-visible',
			delay: 500,
			hideOnClick: true,
			hideOnSwipe: true,
			resetScroll: true,
			resetForms: true,
			side: 'right'
		});

	$(".slideshow > div:gt(0)").hide();
	$("#slide-stop").prop("disabled",true);
	$("#cavitation").prop("disabled",true);
	$("#without-cavitation").prop("disabled",true);

})(jQuery);
