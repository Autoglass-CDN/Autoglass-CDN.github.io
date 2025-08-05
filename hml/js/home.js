//#region Banners
(async function () {
	let position = 0;
	const btnPrev = $('.banners-section .banners button[data-type="prev"]');
	const btnNext = $('.banners-section .banners button[data-type="next"]');
  const tipoBanner = window.innerWidth <= 768 ? 2 : 1;
  const urlBanners = `https://api-int-hml.autoglass.com.br/integracao-b2c/api/banners-vtex/exibicao/${tipoBanner}`;
  await buscaImagensBanner(urlBanners);
	const containers = $('.banners-section .banners-content');
	let bannerContainer = window.innerWidth > 1200 ? $(containers[0]) : $(containers[1]);
	let bannerImages = bannerContainer.children();
  localStorage.setItem('buscaPlaca', null);
	buildBars();
	calculateMarginOfBtns();
	window.addEventListener('resize', e => {
		bannerContainer = window.innerWidth > 1200 ? $(containers[0]) : $(containers[1]);
		bannerImages = bannerContainer.children();

		$('.banners-bars').html('');
		buildBars();
		calculateMarginOfBtns();
	});

  async function buscaImagensBanner(urlBanners) {
    try {
        const response = await fetch(urlBanners, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (!response.ok) {
            throw new Error(`Erro: ${response.status}`);
        }

        const data = await response.json();
        const bannersContainer = window.innerWidth <= 768
            ? document.querySelector(".banners-content.mobile")
            : document.querySelector(".banners-content.desktop");

        data.sort((a, b) => a.PosicaoBanner - b.PosicaoBanner);

        data.forEach(banner => {
            const bannerHtml = `
                <div class="box-banner">
                    <a href="${banner.UrlDestino}" tabindex="-1">
                        <img class="imagem-banner"
                            id="i${banner.ImagemBanner}"
                            alt="${banner.Nome}"
                            src="${banner.ImagemBanner}"
                            complete="complete">
                    </a>
                </div>
            `;
            bannersContainer.innerHTML += bannerHtml;
        });
    } catch (error) {
        console.error("Erro na requisição:", error);
    }
  }

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
	const benefits          = $('.benefits-section .container .benefit');
	const benefitsDots      = $('.benefits-section .benefits-dots-mobile-container .dot');

  function getScreenWidth() {
    return   window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  }

  const interval = setInterval(() => {
    const scrollPercentage = calculateScrollPercentage();
    if (scrollPercentage >= 99) {
      benefitsContainer[0].scrollBy(-benefitsContainer[0].scrollWidth, 0);
    } else {
      benefitsContainer[0].scrollBy(150, 0);
    }
  }, 5000)

  const maxWindowSizeToScroll = 1000;
  benefitsContainer.on('wheel', event => {
    if(getScreenWidth() < maxWindowSizeToScroll) {
      event.preventDefault();
      const { deltaY, target } = event.originalEvent;

      if (deltaY > 0) {
        target.scrollBy(150, 0)
      } else {
        target.scrollBy(-150, 0)
      }

      clearInterval(interval);
    }
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

	// Reset
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

//#region Painel de categorias
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

function centerArrow(min, max) {
	let categoriaAtiva = document.querySelector('.painel-categorias__menu .painel-categorias__categoria.ativo');
	let arrow = document.querySelector('.arrow');
	try{
		let arrowPositions = arrow.getBoundingClientRect();
		let positions = categoriaAtiva.getBoundingClientRect();
		let deslocate = ((positions.left + (categoriaAtiva.offsetWidth - arrow.offsetWidth) / 2) - (arrowPositions.left - parseInt(getComputedStyle(arrow).left, 10)));
		arrow.style.left = valueBetweenRange(deslocate, min, max) + 'px';
	} catch (erro) {}
  }

function valueBetweenRange (value, min, max) {
return value < min ? min : (value > max ? max : value);
}

function slideNext() {
    const categories = Array.from(document.querySelectorAll('.painel-categorias__categoria'));

    const filteredCategories = categories.filter(category => {
        return !category.id.includes('tab-busca-categoria');
    });

    let slider = document.querySelector('.painel-categorias__menu > ul');

    if (getTranslateX(slider) < 0) return;

    let itemWidth = filteredCategories[0].offsetWidth + 
                    parseInt(getComputedStyle(filteredCategories[0]).marginRight, 10) + 
                    parseInt(getComputedStyle(filteredCategories[0]).marginLeft, 10);

    let sliderWidth = slider.clientWidth + 
                      parseInt(getComputedStyle(slider).marginRight, 10) + 
                      parseInt(getComputedStyle(slider).marginLeft, 10);

    let fullWidth = Array.from(filteredCategories)
        .reduce((width, category) => width + (parseInt(getComputedStyle(category).width, 10) + parseInt(getComputedStyle(category).marginLeft, 10) + parseInt(getComputedStyle(category).marginRight, 10)), 0);

    if (window.innerWidth > 900) {
        let itemsVisible = Math.floor(sliderWidth / itemWidth);

        let deslocamento = itemsVisible * itemWidth;

        let baseOffset = fullWidth - sliderWidth;

        let screenRatio = window.innerWidth / 1366;

        deslocamento = baseOffset * screenRatio;

        deslocamento = Math.min(deslocamento, fullWidth - sliderWidth);

        deslocamento = Math.max(deslocamento, itemWidth);

        slider.style.transform = `translateX(-${deslocamento}px)`;
    } else {
        let baseOffset = fullWidth - sliderWidth;
        slider.style.transform = `translateX(-${baseOffset}px)`;
    }

    slider.addEventListener("transitionend", (e) => centerArrow(), { once: true });
}

function toggleVisibility(id) {
let element = document.getElementById(id);
element.style.visibility = element.style.visibility === 'hidden' ? 'visible' : 'hidden';
}

function getTranslateX(element) {
let transform = getComputedStyle(element).getPropertyValue('transform');
let matrix = new WebKitCSSMatrix(transform);
return matrix.m41;
}

function slidePrev() {
let slider = document.querySelector('.painel-categorias__menu > ul');
slider.style.transform = `translateX(0px)`;

slider.addEventListener("transitionend", (e) => centerArrow(), { once: true });
}

function updateSlider() {
    let slider = document.querySelector('.painel-categorias__menu > ul');
    slider.style.transform = `translateX(0px)`;
    centerArrow(10, 1250);
}

window.addEventListener('resize', updateSlider);

function enableTouchScroll(slider) {
    let startX;
    let scrollLeft;

    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    });

    slider.addEventListener('touchmove', (e) => {
        e.preventDefault();
        const x = e.touches[0].pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    });
}

(() => {
let slider = document.querySelector('.painel-categorias__menu > ul');
let prevBtn = document.getElementById('prev-btn');
let nextBtn = document.getElementById('next-btn');

prevBtn.addEventListener('click', slidePrev);
nextBtn.addEventListener('click', slideNext);

enableTouchScroll(slider);

let abortCategoryAction = null;

const minArrowLeft = 10;
const maxArrowRight = 1250;

document
	.querySelectorAll('.painel-categorias__menu .painel-categorias__categoria')
	.forEach((categoria, index) => {
	categoria.addEventListener('mouseenter', (event) => {
		abortCategoryAction = delayedAction(() => {
		if(!isActiveElement(categoria)){
			centerArrow(minArrowLeft, maxArrowRight);
		}
		}, abortCategoryAction);
	})
	});
})();

//#endregion Painel de categorias
