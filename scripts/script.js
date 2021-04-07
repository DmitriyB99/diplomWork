const mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

const menuSwiper = new Swiper('.swiper-container-menu', {
    slidesPerView: 'auto',
    spaceBetween: 63,    
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});

$('.rev-swiper').on('shown.bs.tab', function(e) {
    const swiperReviews = new Swiper('.slider-reviews', {
        slidesPerView: 2,
        spaceBetween: 16,
        
        navigation: {
            nextEl: '.swiper-button-next',
        },
    });
})



jQuery(function(){
    var j = jQuery;
    var addInput = '#qty';
    var n = 1;

    j(addInput).val(n);

    j('.plus').on('click', function(){
        j(addInput).val(++n);
    })

    j('.min').on('click', function(){
        if (n >= 1) {
            j(addInput).val(--n);
        } else{
            
        }
    })
})