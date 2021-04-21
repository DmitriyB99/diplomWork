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

const longGoodsList = document.querySelector('.long-goods-list');
const viewAll = document.querySelectorAll('.view-all')
const categories = document.querySelector('.categories');
const category = document.querySelectorAll('.category');

const checkGoods = () => {

	const data = [];

	return async () => { 
		if (data.length) return data;
		const result = await fetch('db/db.json');
		if (!result.ok) {
			throw 'Ошибка' + result.status
		} 
		data.push(...(await result.json()));
		return data
	};
};
const getGoods = checkGoods();

const createCard = function ({ name, img, description, price }) {
	const card = document.createElement('div');
	card.className = 'product';

	card.innerHTML = `
    <div class="img">
        <img src="${img}" alt="${name}">
    </div>
    <a href="" class="title">${name}</a>
    <p class="description">${description}</p>
    <div class="rating">
        <span class="active"></span>
        <span class="active"></span>
        <span class="active"></span>
        <span class="active"></span>
        <span></span>                                    
    </div>
    <div class="price">
        <b>${price} тг/кг</b> <span>За 500гр.</span>
    </div>
    <a href="#" class="to-cart">В корзину</a>
	`;
	return card;
};

const renderCards = data => {
	longGoodsList.textContent = '';
	const cards = data.map(createCard);
	longGoodsList.append(...cards);	
	document.body.classList.add('show-goods');
};

const showAll = event => {
	event.preventDefault();
	getGoods().then(renderCards);
}

viewAll.forEach(elem => {
	elem.addEventListener('click', showAll)
});

categories.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.closest('.category')) {
      category.forEach((el) => {
        el.classList.remove('active');
      })
      e.target.classList.add('active')
    }
  });