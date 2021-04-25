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

const cart = {
    cartGoods: JSON.parse(localStorage.getItem('cartBigAsia')) || [],
	updateLocalStorage() {
		localStorage.setItem('cartBigAsia', JSON.stringify(this.cartGoods));
	},
	getCountCartGoods() {
		return this.cartGoods.length
	},
	renderCard() {
		cardProduct.textContent = '';
		this.cartGoods.forEach(({ id, name, price, count, img }) => {
			const divGood = document.createElement('div');
			divGood.className = 'container';
			divGood.dataset.inde = id;

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
                        <span>Цена за уп.</span> <b>${price} тг</b>
                    </div>
                    <div class="price">
                        <span>Кол-во шт в упаковке</span> <b>20 шт.</b>
                    </div>
                    <div class="price">
                        <span>Количество</span>

                        <div class="input_range" data-desc="Ед. изм.: упаковка">
                            <button class="cart-btn-minus">-</button>
                            <input type="text" maxlength="12" value="${count}" />
                            <button class="cart-btn-plus">+</button>
                        </div>

                    </div>
                </div>
                <div class="pay-bottom">
                    <div class="to-pay">
                        <span>Итого к оплате</span>
                        <b>5 000 тг</b>
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
                        <p>Полутвердый пластичный однородный сыр, слегка ломкий на изгибе. Пажитник придает легкое ореховое послевкусие. В Италии считается столовым сыром, который подходит к любому времени суток и к любому блюду и к вину</p>

                        <p>Вес головки 500 г. +/-10%. Цена за 1 кг.</p> 

                        <p>Продукция компании Alpenville изготовлена преимущественно из Шарангского молока</p>
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
		});
		
		const totalPriceBeforeDiscount = this.cartGoods.reduce((sum, item) => {
			return sum + item.price * item.count;
		}, 0);

        const totalPriceAfterDiscount = this.cartGoods.reduce(() => {
            return totalPriceBeforeDiscount + +discount.textContent;
        }, 0)

		priceCart.textContent = totalPriceBeforeDiscount + ' тг';
        totalPrice.textContent = totalPriceAfterDiscount + ' тг';

	},
    deleteGood(id) {
		this.cartGoods = this.cartGoods.filter(item => id !== item.id);
		this.renderCard();
		this.updateLocalStorage();
	},
	minusGood(id) {
		for (const item of this.cartGoods) {
			if (item.id === id) {
				if (item.count <= 1) {
					this.deleteGood(id);
				} else {
					item.count--;
				}				
				break;
			}
		}
		this.updateLocalStorage();
		this.renderCard();		
	},
	plusGood(id) {
		for (const item of this.cartGoods) {
			if (item.id === id) {
				item.count++;
				break;
			}
		}
		this.updateLocalStorage();
		this.renderCard();		
	},
}

document.body.addEventListener('click', event => {
	const addToCart = event.target.closest('.add-to-cart');

	if (addToCart) {
		cart.addCartGoods(addToCart.dataset.id)
	}
})
cart.renderCard();


cartProductItems.addEventListener('click', event => {
    const target = event.target;
    if(target.tagName === "BUTTON") {
        const id = target.closest('.cart-product-item').dataset.id;

        if (target.classList.contains('cart-btn-delete')) {
			cart.deleteGood(id);
		};

		if (target.classList.contains('cart-btn-minus')) {
			cart.minusGood(id);
		};
	
		if (target.classList.contains('cart-btn-plus')) {
			cart.plusGood(id);
		};
    }
})


console.log(JSON.parse(localStorage.getItem('cartBigAsia')));