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
const viewAll = document.querySelectorAll('.view-all');
const categoriesNav = document.querySelectorAll('.category:not(.view-all)');
const categories = document.querySelector('.categories');
const category = document.querySelectorAll('.category');
const showSweets = document.querySelectorAll('.sweets');
const showDriedFruits = document.querySelectorAll('.dried-fruits');
const showNuts = document.querySelectorAll('.nuts');
const showTea = document.querySelectorAll('.tea');
const showDishes = document.querySelectorAll('.dishes');
const showCandiedFruits = document.querySelectorAll('.candied-fruits');
const showGifts = document.querySelectorAll('.gifts');
const showSpice = document.querySelectorAll('.spice');





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

categories.addEventListener('click', (e) => {
    e.preventDefault();
    const currentElem = e.target.closest('.category');
    if (currentElem) {
        category.forEach((el) => {
            el.classList.remove('active');
        })
        currentElem.classList.add('active')
    }
});

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

const filterCards = function (field, value) {
	getGoods()
		.then (data => data.filter(good => good[field] === value))
		.then(renderCards);
};


categoriesNav.forEach(link => {
	link.addEventListener('click', event => {
		event.preventDefault();
		const field = link.dataset.field;
		const value = link.textContent;
		filterCards(field, value)
	})
});

showSweets.forEach(item => {
	item.addEventListener('click', event => {
		event.preventDefault();
		filterCards('category', 'сладости');
	})
});

showDriedFruits.forEach(item => {
	item.addEventListener('click', event => {
		event.preventDefault();
		filterCards('category', 'сухофрукты');
	})
});

showNuts.forEach(item => {
	item.addEventListener('click', event => {
		event.preventDefault();
		filterCards('category', 'орехи');
	})
});

showTea.forEach(item => {
	item.addEventListener('click', event => {
		event.preventDefault();
		filterCards('category', 'чай');
	})
});

showDishes.forEach(item => {
	item.addEventListener('click', event => {
		event.preventDefault();
		filterCards('category', 'посуда');
	})
});

showCandiedFruits.forEach(item => {
	item.addEventListener('click', event => {
		event.preventDefault();
		filterCards('category', 'цукаты');
	})
});

showGifts.forEach(item => {
	item.addEventListener('click', event => {
		event.preventDefault();
		filterCards('category', 'подарочные наборы');
	})
});

showSpice.forEach(item => {
	item.addEventListener('click', event => {
		event.preventDefault();
		filterCards('category', 'специи');
	})
});




