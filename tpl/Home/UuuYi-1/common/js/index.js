(function (window, $, undefined) {
		var $scrollBox = $('#scroll-box');
		var scrollType = {
			'up': 0,
			'down': 1
		};
		var isScroll = false;
		var $currentBox = $('#step-1');
		var maxHeight = 0;


		function inint(first) {
			var boxHeight = $scrollBox.height() > 300 ? $scrollBox.height() : 300;
			$scrollBox.find('.box').each(function (index, item) {
				var $stepBox = $(item).find('.step-box');
				var margin = (boxHeight - $stepBox.height()) / 2;
				if (margin > 0) {
					$stepBox.css({
						height: boxHeight - margin * 2,
						marginTop: margin,
						marginBottom: margin
					});
				}
				$(item).height(boxHeight);
				maxHeight += boxHeight;
			});
			$scrollBox.scrollTop(0);
			if (first) {
				init_1();
				init_4();
			}
		};

		function scroll(top) {
			isScroll = true;
			$scrollBox.animate({
				scrollTop: top
			}, 'normal', 'swing', function () {
				isScroll = false;
			});
		};

		function scrollBox(type) {
			var ScrollHeight = $currentBox.height();
			var top = $scrollBox.scrollTop();
			if (type) {
				var _top = top + ScrollHeight;
				if (_top >= maxHeight) return;
				scroll(_top);
			} else {
				if (_top < 0) return;
				var _top = top - ScrollHeight;
				scroll(_top);
			}
		};

		function init_1() {
			letitsnow();
			var $phone_box = $('.phone-box');
			var $phone = $('.phone');
			var $icon = $('.icons');
			var $begin_title = $('.begin-title');
			var $begin_btn = $('.begin-btn');
			var maxwidth = $(window).width();
			var $phone_box_left = $phone_box.css('left');
			var phone_top = $phone.css('top');
			var bgin_left = $begin_btn.css('left');
			var bgin_right = $begin_title.css('right');
			var icon_width = $icon.width();
			var icon_height = $icon.height();
			$phone_box.css('left', -maxwidth / 2 + parseInt($phone_box_left));
			$phone.css('top', $phone.height()).hide();
			$icon.hide();
			$begin_btn.css('left', -maxwidth / 2);
			$begin_title.css('right', -maxwidth / 2);
			var float_phone;

			setTimeout(function () {
				$phone_box.animate({
					left: $phone_box_left
				}, 1000);
			}, 0);

			setTimeout(function () {
				$phone.animate({
					top: parseInt(phone_top) - 100,
					opacity: 'show'
				}, 1000);
			}, 1000);

			setTimeout(function () {
				$phone.animate({
					top: parseInt(phone_top)
				}, 500);
			}, 2000);

			setTimeout(function () {
				float_phone = setInterval(function () {
					$phone.stop().animate({
						top: parseInt(phone_top) - 50
					}, 500, function () {
						$phone.animate({
							top: parseInt(phone_top)
						}, 500);
					});
				}, 1000);
			}, 1500);

			setTimeout(function () {
				clearInterval(float_phone);
				$begin_title.animate({
					right: bgin_right
				}, 1000);
			$begin_btn.animate({
				left: bgin_left
			}, 1000);
		}, 4500);

	setTimeout(function () {
		$icon.css({
			width: 0,
			height: 0
		}).animate({
			width: icon_width,
			height: icon_height,
			opacity: 'show'
		}, 1000);
	}, 2500);
}

function init_4() {
	var $box_4 = $('.step-4');
	$box_4.find('.advantage').on('mouseenter', 'a', function () {
		var index = $(this).index() + 1;
		var addClass = 'selected-' + index;
		$(this).closest('.advantage').removeClass().addClass('advantage ' + addClass);
		$(this).siblings().find('i').css({
			width: 0,
			height: 0
		}).clearQueue();
		$(this).find('i').animate({
			width: 66,
			height: 39
		}, 1000, function () {
			$('.advantage-list').children().removeClass('advantage-selected').find('.line').hide().end().find('h2 i').removeClass('selected');
			$('.advantage-box-' + index).addClass('advantage-selected').find('h2 i').addClass('selected').end().find('.line').show();
		});
	});
}

function letitsnow() {
	var canvas = document.getElementById("snowfall");
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	var emitter = Object.create(rectangleEmitter);
	emitter.setCanvas(canvas);
	emitter.setBlastZone(0, -10, canvas.width, 1);
	emitter.particle = snow;
	emitter.runAhead(0);
	emitter.start(60);
}

$(window).on('mousewheel', function (e) {
	if (isScroll) return;
	e.preventDefault();
	var direct = e.originalEvent.wheelDelta / 120;
	if (direct > 0) {
		scrollBox(scrollType['up']);
	} else {
		scrollBox(scrollType['down']);
	}
});

$(window).on('resize', function () {
	inint();
});

inint(true);

})(window, jQuery);