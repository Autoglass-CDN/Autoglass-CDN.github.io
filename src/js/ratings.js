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