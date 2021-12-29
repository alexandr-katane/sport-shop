let slidersParent = document.querySelectorAll('._swiper');
console.log(slidersParent);

if (slidersParent) {
    for (let index = 0; index < slidersParent.length; index++) {
        let parent = slidersParent[index];
        let sources = parent.querySelectorAll('source');
        if (sources) {
            for (let index = 0; index < sources.length; index++) {
                const source = sources[index];
                //source.classList.add('swiper-lazy');
                source.nextElementSibling.classList.add('swiper-lazy');
                if (source.nextElementSibling.classList.contains('swiper-lazy-loaded')) {
                    console.log(source);
                    source.setAttribute('scrset', source.nextElementSibling.getAttribute('src'));
                }
                //source.setAttribute('data-scrset', source.nextElementSibling.getAttribute('data-src'));
            }
        }
    }
}