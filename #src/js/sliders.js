let sliders = document.querySelectorAll('._swiper');
if (sliders) {
    for (let index = 0; index < sliders.length; index++) {
        let slider = sliders[index];
        if (!slider.classList.contains('swiper-container')) {
            slider.classList.add('swiper-container');
        }

        if (!slider.classList.contains('swiper-bild')) {
            let slider_items = slider.children;
            if (slider_items) {
                for (let index = 0; index < slider_items.length; index++) {
                    let el = slider_items[index];
                    el.classList.add('swiper-slide');
                }
            }
            let slider_content = slider.innerHTML;
            let slider_wrapper = document.createElement('div');
            slider_wrapper.classList.add('swiper-wrapper');
            slider_wrapper.innerHTML = slider_content;
            slider.innerHTML = '';
            slider.appendChild(slider_wrapper);
            slider.classList.add('swiper-bild');
        }
    }
    sliders_build_callback();
}

function sliders_build_callback(params) { }


if (document.querySelector('.main-slider__body')) {
    let mainSlider = new Swiper('.main-slider__body', {
        observer: true,
        observeParents: true,
        slidesPerView: 1,
        watchOverflow: true,
        speed: 800,
        loop: true,
        preloadImages: false,
        parallax: true,
        autoHeight: true,
        autoplay: {
            delay: 5000,
        },
        //Dotts
        pagination: {
            el: '.controls-slider__dotts',
            clickable: true,
        },
    });
}

if (document.querySelector('.slider-brands__body ')) {
    let mainSlider = new Swiper('.slider-brands__body ', {
        observer: true,
        observeParents: true,
        watchOverflow: true,
        speed: 800,
        loop: true,
        spaceBetween: 0,
        parallax: true,
        autoHeight: true,
        breakpoints: {
            992: {
                slidesPerView: 3,
            },
            500: {
                slidesPerView: 2,
            },
            320: {
                slidesPerView: 1,
            },
        },
        navigation: {
            nextEl: '.control-main-slider__arrow_next',
            prevEl: '.control-main-slider__arrow_prev',
        },
    });
}
