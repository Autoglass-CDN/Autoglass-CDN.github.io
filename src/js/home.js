//#region Banners
(function () {
	let position = 0;
	const btnPrev = $('.banners-section .banners button[data-type="prev"]');
	const btnNext = $('.banners-section .banners button[data-type="next"]');
	const containers = $('.banners-section .banners-content');
	let bannerContainer = window.innerWidth > 1200 ? $(containers[0]) : $(containers[1]);
	let bannerImages = bannerContainer.children();

	buildBars();
	calculateMarginOfBtns();

	window.addEventListener('resize', e => {
		bannerContainer = window.innerWidth > 1200 ? $(containers[0]) : $(containers[1]);
		bannerImages = bannerContainer.children();

		$('.banners-bars').html('');
		buildBars();
		calculateMarginOfBtns();
	});

	$('.banners-section .banners-content a').attr('tabindex', '-1');

	const interval = setInterval(() => {
		bannerContainer[0].scrollBy(window.innerWidth, 0);

		if ((bannerImages.length - 1) === position) {
			bannerContainer[0].scrollBy(-bannerContainer[0].scrollWidth, 0);
			position = 0;
		} else {
			position++;
		}

		changeBarActive(position);
	}, 10000)

	btnPrev.click(() => {
		bannerContainer[0].scrollBy(-window.innerWidth, 0);
		if (getScrollPercentage(bannerContainer[0]) === 0) {
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
		bannerContainer[0].scrollBy(window.innerWidth, 0);

		if (getScrollPercentage(bannerContainer[0]) >= 95) {
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

	function calculateMarginOfBtns() {
		const distance = (window.innerWidth - $('.c-busca')[0].offsetWidth) / 2;

		btnPrev.css('left', distance);
		btnNext.css('right', distance);
	}
})();
//#endregion Banners

//#region Benefits
(function () {
	const benefitsContainer = $('.benefits-section .container');
	const benefits = $('.benefits-section .container .benefit');
	const benefitsDots = $('.benefits-section .benefits-dots-mobile-container .dot');

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
		const percentPerItem = 100 / benefits.length;
		const scrollPercentage = calculateScrollPercentage();

		benefits.each((index) => {
			const up = percentPerItem * (index + 1);
			const down = percentPerItem * index;
			benefits.eq(index).removeClass('focus');
			benefitsDots.eq(index).removeClass('focus')

			if (scrollPercentage >= down && scrollPercentage <= up) {
				benefits.eq(index).addClass('focus');
				benefitsDots.eq(index).addClass('focus')
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

//#region Itens Promocionais

configureBanners('.banners-promocionais-section', '.banners-promocionais-itens');

//#endrefio Itens Promocionais

////#region Nossos Servicos

configureBannerSubtitles(".banners-nossos-servicos .box-banner > a");

configureBanners('.nossos-servicos-section', '.banners-nossos-servicos', true);

//#endregion Nossos Servicos

function configureBanners(section, banner, openChat) {
	const btnPrev = $(`${section} button[data-type="prev"]`);
	const btnNext = $(`${section} button[data-type="next"]`);
	const container = $(`${banner}`);
	const itensQuantityToShow = 3;
	const bannerContainer = container[0];
	let itensQuantity =  container.children().length;
	let itemSize = $(`${banner} .box-banner:first-child`).outerWidth(true)+1;

	switch(true){
		case itensQuantity == 0:
			if(container.parent()[0] &&
				container.parent()[0].previousSibling.tagName == 'H2'){
				container.parent()[0].previousSibling.remove();
			}
			container.parent().remove();
			break;
		case itensQuantity == 1:
			changeContainerWidth(container, itensQuantity, itemSize)
			container.parent().addClass('hide-buttons')
			break;
		case itensQuantity < itensQuantityToShow:
			changeContainerWidth(container, itensQuantity, itemSize)
			container.parent().addClass('button-mobile-only')
			configureButonsNextPrev(btnNext, btnPrev, banner, bannerContainer);
			break;
		case itensQuantity == itensQuantityToShow:
			createResizeObserver(banner, itensQuantity, itemSize);
			configureButonsNextPrev(btnNext, btnPrev, banner, bannerContainer);
			break;
		default:
			configureButonsNextPrev(btnNext, btnPrev, banner, bannerContainer);
			break;
	}

	if (openChat) {
		const showZendeskOnClick = '$zopim.livechat.window.show()';
		bannerContainer.childNodes.forEach((element)=>{
			if (!element.children[0].href){
				element.children[0].setAttribute('onclick', showZendeskOnClick);
        const img = element.children[0].firstElementChild
				img.setAttribute('onclick', `zE('webWidget', 'chat:send', 'Olá, gostaria de saber mais sobre ${img.alt}')`);
        ;
			}
		})
	}
}

function configureBannerSubtitles(anchor){
	document.querySelectorAll(anchor).forEach(
		function(currentValue) {
			currentValue.parentElement.title = currentValue.children[0].getAttribute('alt');
		}
	);
}

function changeContainerWidth(container, itensQuantity, itemSize){
	container.width(itensQuantity*(itemSize));
}

function createResizeObserver(banner, itensQuantity, itemSize){
	const myObserver = new ResizeObserver(entries => {
		if(entries[0].contentRect.width < itensQuantity*itemSize){
			entries[0].target.parentElement.classList.remove('hide-buttons')
		} else{
			entries[0].target.parentElement.classList.add('hide-buttons')
		}
	});

	const element = document.querySelector(banner);
	myObserver.observe(element);
}

function configureButonsNextPrev(btnNext, btnPrev, banner, bannerContainer){
	btnNext.click(() => {
		itemSize = getItemSize(banner);
		if (getScrollPercentage(bannerContainer) >= 95) {
			scrollSmoothlyToLeft(bannerContainer, bannerContainer.scrollWidth);
			return;
		}
		scrollSmoothlyToRight(bannerContainer, itemSize);
	});
	btnPrev.click(() => {
		itemSize = getItemSize(banner);
		if (getScrollPercentage(bannerContainer) <= 5) {
			scrollSmoothlyToRight(bannerContainer, bannerContainer.scrollWidth);
			return;
		}
		scrollSmoothlyToLeft(bannerContainer, itemSize);
	});
}

function getItemSize(banner){
	return $(`${banner} .box-banner:first-child`).outerWidth(true);
}

//#region Ratings
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
//#endregion Ratings

function getScrollPercentage(element) {
	return 100 * element.scrollLeft
		/ (element.scrollWidth - element.clientWidth);
}
function scrollSmoothlyToRight(element, pixelsToScroll) {
	return element.scrollBy({
		top: 0,
		left: pixelsToScroll,
		behavior : "smooth"
	})
}
function scrollSmoothlyToLeft(element, pixelsToScroll) {
	return scrollSmoothlyToRight(element, -pixelsToScroll)
}
