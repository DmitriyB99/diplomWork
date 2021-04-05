const mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

const menuSwiper = new Swiper('.swiper-container-menu', {
    slidesPerView: 'auto',
    spaceBetween: 95,
    
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});
