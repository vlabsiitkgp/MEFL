
var interval;

(function ($) {

	

	$(document).on("click", "#selectBase", function () {
		if($('#selectBase').hasClass('bg-white')) {
			$('.slideshow1').addClass('hide').removeClass('slideshow');
			$('.slideshow2').removeClass('hide').addClass('slideshow');
			$('#selectBase').removeClass('bg-white').addClass('bg-green');
		}
		else{
			$('.slideshow2').addClass('hide').removeClass('slideshow');
			$('.slideshow1').removeClass('hide').addClass('slideshow');
			$('#selectBase').removeClass('bg-green').addClass('bg-white');
		}
		$(".slideshow > div:gt(0)").hide();
	});

	$(document).on("click", "#vibrations_display", function () {
		if($('#values').val() == '1000') $('#final_result').val('16.66666');
		if($('#values').val() == '2000') $('#final_result').val('33.33333');
		if($('#values').val() == '3000') $('#final_result').val('50');
		if($('#values').val() == '4000') $('#final_result').val('66.66666');
		if($('#values').val() == '5000') $('#final_result').val('83.33333');
		if($('#values').val() == '6000') $('#final_result').val('100');
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
	});

	$(document).on("click", "#slide-stop", function () {
		clearInterval(interval);
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




})(jQuery);
