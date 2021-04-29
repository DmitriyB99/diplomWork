$('.rev-swiper').on('shown.bs.tab', function(e) {
    const swiperReviews = new Swiper('.slider-reviews', {
        slidesPerView: 2,
        spaceBetween: 16,
        
        navigation: {
            nextEl: '.swiper-button-next',
        },
    });
});


const cardProduct = document.querySelector('.card-product');
const url = new URL(window.location);
const idFromUrl = url.searchParams.get('id');
const payPopup = document.querySelector('.pay-popup');

console.log(payPopup);

const checkGoods = async () => {
    const data = [];
    if (data.length) return data;
    const result = await fetch("db/db.json");
    if (!result.ok) {
        throw "Ошибка" + result.status;
    }
    return await result.json();
};




const renderCardProduct = ({ id, name, price, count, img, description }) => {
    cardProduct.textContent = '';
    const divGood = document.createElement('div');
	divGood.className = 'container';

    divGood.innerHTML = `
            <div class="card-top">
            <div class="card-img">
                <img src="${img}" alt="${name}">
            </div>

            <div class="card-sidebar">
                <div class="w50">
                    <div class="title">${name}</div>
                    <div class="rating">
                        <span class="active"></span>
                        <span class="active"></span>
                        <span class="active"></span>
                        <span class="active"></span>
                        <span></span>                                    
                    </div>
                    <div class="reviews">
                        Кол-во отзывов: <span>23</span>
                    </div>
                </div>
                <div class="w50">
                    <div class="price">
                        <span>Цена</span> <b>${price} тг</b>
                    </div>

                    <div class="price">
                        <span>Количество</span>

                        <div class="input_range" data-desc="Ед. изм.: упаковка">
                        <button class="cart-btn-minus">-</button>
                        <input type="text" maxlength="12" value="1" />
                        <button class="cart-btn-plus">+</button>
                        </div>

                    </div>
                </div>
                <div class="pay-bottom">
                    <div class="to-pay">
                        <span>Итого к оплате</span>
                        <b class="total-price">${price}</b>
                    </div>
                    <div class="pay-block">
                        <button class="pay-popup">Купить</button>
                        <button class="cart-add"></button>
                    </div>
                </div>
            </div>
            
        </div>
        <div class="card-bottom">
            <div class="card-info">
                <!-- Nav tabs -->
                <ul class="nav nav-tabs" id="myTab" role="tablist">
                    <li class="nav-item" role="presentation">
                        <button class="nav-link active" id="about_product" data-bs-toggle="tab" data-bs-target="#home" type="button" role="tab" aria-controls="home" aria-selected="true">О товаре</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link" id="product_parametr" data-bs-toggle="tab" data-bs-target="#profile" type="button" role="tab" aria-controls="profile" aria-selected="false">Параметры</button>
                    </li>
                    <li class="nav-item" role="presentation">
                        <button class="nav-link rev-swiper" id="product_reviews" data-bs-toggle="tab" data-bs-target="#messages" type="button" role="tab" aria-controls="messages" aria-selected="false">Отзывы</button>
                    </li>
                </ul>
                
                <!-- Tab panes -->
                <div class="tab-content">
                    <div class="tab-pane active" id="home" role="tabpanel" aria-labelledby="about_product">
                        <h2 class="tab">Описание</h2>
                        <p>${description}</p> 
                    </div>
                    <div class="tab-pane" id="profile" role="tabpanel" aria-labelledby="product_parametr">
                        <ul class="product_ul">
                            <li><b>Калории:</b> 420</li>
                            <li><b>Жиры:</b> 54</li>
                            <li><b>Белки:</b> 27</li>
                            <li><b>Углеводы:</b> 18</li>
                            <li><b>Масса:</b> 500 грамм</li>
                        </ul>
                    </div>
                    <div class="tab-pane" id="messages" role="tabpanel" aria-labelledby="product_reviews">
                        <div class="slider-reviews">
                            <div class="swiper-wrapper">
                                <div class="swiper-slide">
                                    <div class="rev_header">
                                        <div class="avatar">
                                            <img src="img/rew.png" alt="">
                                        </div>
                                        <div class="rev_avatar">
                                            <div class="rev_name">Анатолий Петров</div>
                                            <div class="rating">
                                                <span class="active"></span>
                                                <span class="active"></span>
                                                <span class="active"></span>
                                                <span class="active"></span>
                                                <span></span>                                    
                                            </div>
                                            <a href="" class="rev_social">vk.com/anatoliy</a>
                                        </div>
                                    </div>
                                    <div class="rev_footer">
                                        <p>Заказал 5кг мяса, живу в Московской области. Как и обещал оператор, привезли через 1,5 часа. Свежее, как будто было живое еще по дороге. Действительно натуральные продукты. Я обязательно буду заказывать дальше. А теперь подробнее о плюсах и минусах всего магази...</p>
                                        <a href="">Читать полностью</a>
                                    </div>
                                </div>

                                <div class="swiper-slide">
                                    <div class="rev_header">
                                        <div class="avatar">
                                            <img src="img/rew.png" alt="">
                                        </div>
                                        <div class="rev_avatar">
                                            <div class="rev_name">Анатолий Петров</div>
                                            <div class="rating">
                                                <span class="active"></span>
                                                <span class="active"></span>
                                                <span class="active"></span>
                                                <span class="active"></span>
                                                <span></span>                                    
                                            </div>
                                            <a href="" class="rev_social">vk.com/anatoliy</a>
                                        </div>
                                    </div>
                                    <div class="rev_footer">
                                        <p>Заказал 5кг мяса, живу в Московской области. Как и обещал оператор, привезли через 1,5 часа. Свежее, как будто было живое еще по дороге. Действительно натуральные продукты. Я обязательно буду заказывать дальше. А теперь подробнее о плюсах и минусах всего магази...</p>
                                        <a href="">Читать полностью</a>
                                    </div>
                                </div>

                                <div class="swiper-slide">
                                    <div class="rev_header">
                                        <div class="avatar">
                                            <img src="img/rew.png" alt="">
                                        </div>
                                        <div class="rev_avatar">
                                            <div class="rev_name">Анатолий Петров</div>
                                            <div class="rating">
                                                <span class="active"></span>
                                                <span class="active"></span>
                                                <span class="active"></span>
                                                <span class="active"></span>
                                                <span></span>                                    
                                            </div>
                                            <a href="" class="rev_social">vk.com/anatoliy</a>
                                        </div>
                                    </div>
                                    <div class="rev_footer">
                                        <p>Заказал 5кг мяса, живу в Московской области. Как и обещал оператор, привезли через 1,5 часа. Свежее, как будто было живое еще по дороге. Действительно натуральные продукты. Я обязательно буду заказывать дальше. А теперь подробнее о плюсах и минусах всего магази...</p>
                                        <a href="">Читать полностью</a>
                                    </div>
                                </div>
                            </div>
                            <div class="swiper-button-next"><span>Ещё</span><img src="img/arrow-a.png" alt=""></div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-sidebar">
                <div class="purchase-info">
                    <div class="title">
                        Закажите на 15000 тг и получите
                    </div>
                    <div class="line">
                        <img src="img/veh.svg" alt=""><span><b>Бесплатная доставка</b></span>
                    </div>
                    <div class="range-slide">
                        <div class="range-line" data-mins="0" data-maxs="15000">
                            <div style="width:60%" class="green-line"></div>
                            <div class="round" data-min="5000 (минимальный заказ)"></div>
                        </div>
                        <div class="range-text">
                            Осталось <b>9990 тг</b> до бесплатной доставки
                        </div>
                    </div>
                </div>
            </div>
        </div>
	`;
	cardProduct.append(divGood);

}
const goods = checkGoods();
goods.then((r) => {
    const item = r.find((el) => el.id === idFromUrl);
renderCardProduct(item)
});
// console.log(JSON.stringify(fetch('db/db.json')));
// const getGoods = checkGoods();


// console.log(fetch('db/db.json'));
// data1.push(result1.json).filter(el => el.id === idFromUrl);



// console.log(result1.filter(el => el.id === idFromUrl));



// document.body.addEventListener('click', event => {
// 	const addToCart = event.target.closest('.add-to-cart');

// 	if (addToCart) {
// 		cart.addCartGoods(addToCart.dataset.id)
// 	}
// })



// cartProductItems.addEventListener('click', event => {
//     const target = event.target;
//     if(target.tagName === "BUTTON") {
//         const id = target.closest('.cart-product-item').dataset.id;

//         if (target.classList.contains('cart-btn-delete')) {
// 			cart.deleteGood(id);
// 		};

// 		if (target.classList.contains('cart-btn-minus')) {
// 			cart.minusGood(id);
// 		};
	
// 		if (target.classList.contains('cart-btn-plus')) {
// 			cart.plusGood(id);
// 		};
//     }
// })


