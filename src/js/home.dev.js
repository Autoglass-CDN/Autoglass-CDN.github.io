//#region Banners
(function () {
	let position = 0;
	const btnPrev = $('.banners-section .banners button[data-type="prev"]');
	const btnNext = $('.banners-section .banners button[data-type="next"]');
	const containers = $('.banners-section .banners-content');
	let bannerContainer = window.innerWidth > 1100 ? $(containers[0]) : $(containers[1]);
	let bannerImages = bannerContainer.children();

	buildBars();
	calculateMarginOfBtns();

	window.addEventListener('resize', e => {
		bannerContainer = window.innerWidth > 1100 ? $(containers[0]) : $(containers[1]);
		bannerImages = bannerContainer.children();

		$('.banners-bars').html('');
		buildBars();
		calculateMarginOfBtns();
	});

	$('.banners-section .banners-content a').attr('tabindex', '-1');

	const interval = setInterval(() => {
		bannerContainer[0].scrollBy(150, 0);

		if ((bannerImages.length - 1) === position) {
			bannerContainer[0].scrollBy(-bannerContainer[0].scrollWidth, 0);
			position = 0;
		} else {
			position++;
		}

		changeBarActive(position);
	}, 10000)

	btnPrev.click(() => {
		bannerContainer[0].scrollBy(-150, 0);
		if (getScrollPercentage() === 0) {
			bannerContainer[0].scrollBy(bannerContainer[0].scrollWidth, 0);
			position = (bannerImages.length - 1);
		} else {
			if (position >= 0)
				position--;
		}

		changeBarActive(position);
		clearInterval(interval);
	});

	btnNext.click(() => {
		bannerContainer[0].scrollBy(150, 0);

		if (getScrollPercentage() >= 95) {
			bannerContainer[0].scrollBy(-bannerContainer[0].scrollWidth, 0);
			position = 0;
		} else {
			if (position < bannerImages.length)
				position++;
		}

		changeBarActive(position);
		clearInterval(interval);
	});

	function buildBars() {
		bannerImages.each((index, element) => {
			$('.banners-bars').append(`<li id="${index}"></li>`);
		});

		$('.banners-bars li').click((e) => {
			bannerContainer.scrollLeft(e.target.id * $(window).width());
			changeBarActive(e.target.id);
			clearInterval(interval);
		});

		$('.banners-bars li').first().addClass('active');
	}

	function changeBarActive(index) {
		if (index > -1 && index < bannerImages.length) {
			$('.banners-bars li').removeClass('active');

			$($('.banners-bars li')[index]).addClass('active');
		}
	}

	function getScrollPercentage() {
		return 100 * bannerContainer[0].scrollLeft
			/ (bannerContainer[0].scrollWidth - bannerContainer[0].clientWidth);
	}

	function calculateMarginOfBtns() {
		const distance = (window.innerWidth - $('.smart-select__main')[0].offsetWidth) / 2;

		btnPrev.css('left', distance);
		btnNext.css('right', distance);
	}
})();
//#endregion Banners

//#region Benefits
(function () {
	const benefitsContainer = $('.benefits-section .container');
	const benefits = $('.benefits-section .container .benefit');

	const interval = setInterval(() => {
		const scrollPercentage = calculateScrollPercentage();
		if (scrollPercentage >= 99) {
			benefitsContainer[0].scrollBy(-benefitsContainer[0].scrollWidth, 0);
		} else {
			benefitsContainer[0].scrollBy(150, 0);
		}
	}, 5000)

	benefitsContainer.on('wheel', event => {
		event.preventDefault();
		const { deltaY, target } = event.originalEvent;

		if (deltaY > 0) {
			target.scrollBy(150, 0)
		} else {
			target.scrollBy(-150, 0)
		}

		clearInterval(interval);
	});

	benefitsContainer.scroll(() => {
		const percentItem = 100 / benefits.length;
		const scrollPercentage = calculateScrollPercentage();

		benefits.each((index, element) => {
			const up = percentItem * (index + 1);
			const down = percentItem * index;

			$(element).removeClass('focus');

			if (scrollPercentage >= down && scrollPercentage <= up) {
				$(element).addClass('focus');
			}
		});

		clearInterval(interval);
	});

	function calculateScrollPercentage() {
		return 100 * benefitsContainer[0].scrollLeft
			/ (benefitsContainer[0].scrollWidth - benefitsContainer[0].clientWidth);
	}
})();
//#endregion Benefits

//#region Retings
(function () {
	let position = 1;
	const btnPrev = $('.ratings-section .ratings__slider button[data-type="prev"]');
	const btnNext = $('.ratings-section .ratings__slider button[data-type="next"]');
	const ratingContainer = $('.ratings-section .ratings__slider-content');
	const ratingBoxs = ratingContainer.children();

	const CONFIG = {
		CSS: {
			HIGHLIGHT: 'highlight',
		},
		WINDOW: {
			BREAK_POINT: 1050
		}
	}

	const interval = setInterval(() => {
		if (position === (ratingBoxs.length - 1)) {
			position = 0;
		} else {
			position++;
		}

		changeHighlight(position);
		changeBarActive(position);
	}, 10000)

	//Reset
	buildBars();
	showOnlyRatingAroundHighlight();

	btnPrev.click(() => {
		if (position === 0) {
			position = (ratingBoxs.length - 1);
		} else {
			position--;
		}

		clearInterval(interval);
		changeHighlight(position);
		changeBarActive(position);
	});

	btnNext.click(() => {
		if (position === (ratingBoxs.length - 1)) {
			position = 0;
		} else {
			position++;
		}

		clearInterval(interval);
		changeHighlight(position);
		changeBarActive(position);
	});

	ratingBoxs.click(e => {
		const i = ratingBoxs.index(e.currentTarget);
		position = i;

		clearInterval(interval);
		changeHighlight(position);
		changeBarActive(position);
	});

	function showOnlyRatingAroundHighlight() {
		let next = position + 1;
		let prev = position - 1;

		if (position === 0) {
			prev = 0;
			next = 2;
		}

		if (position === (ratingBoxs.length - 1)) {
			prev = position - 2;
			next = (ratingBoxs.length - 1);
		}

		ratingBoxs.each((index, element) => {
			$(element).hide();

			if (!(index < prev || index > next)) {
				$(element).css("display", "flex").fadeIn('slow');
			}
		});
	}

	function changeHighlight(index) {
		ratingBoxs.removeClass(CONFIG.CSS.HIGHLIGHT);

		$(ratingBoxs[index]).addClass(CONFIG.CSS.HIGHLIGHT);

		showOnlyRatingAroundHighlight();
	}

	function buildBars() {
		ratingBoxs.each((index, element) => {
			$('.ratings-section .rating-bars').append(`<li id="${index}"></li>`);
		});

		$('.ratings-section .rating-bars li').click((e) => {
			position = +e.target.id;
			changeHighlight(position);
			changeBarActive(position);
		});

		$('.ratings-section .rating-bars li')
			.filter((i) => i === position)
			.addClass('active');
	}

	function changeBarActive(index) {
		if (index > -1 && index < ratingBoxs.length) {
			$('.ratings-section .rating-bars li').removeClass('active');

			$($('.ratings-section .rating-bars li')[index]).addClass('active');
		}
	}
})();
//#endregion Retings
