const cardProduct = document.querySelector('.card-product');
const url = new URL(window.location);
const idFromUrl = url.searchParams.get('id');
const cardSidebar = document.querySelector('.card-sidebar');
const cartProductItems = document.querySelector('.cart-product-items');
const discount = document.querySelector('.discount');
const priceCart = document.querySelector('.price-cart');
const totalPrice = document.querySelector('.total-price');
const greenLine = document.querySelector('.green-line');
const cartCount = document.querySelector('.cart-mob');



const checkGoods = async () => {
    const data = [];
    if (data.length) return data;
    const result = await fetch("db/db.json");
    if (!result.ok) {
        throw "Ошибка" + result.status;
    }
    return await result.json();
};

const getGoods = checkGoods();

setTimeout(() => {    
    document.body.addEventListener('click', event => {
        const addToCart = event.target.closest('.add-to-cart');
        if (addToCart) {
            cart.addCartGoods(addToCart.dataset.id);
        }
    });
}, 1000);



const cart = {
	cartGoods: JSON.parse(localStorage.getItem('cartBigAsia')) || [],
	updateLocalStorage() {
		localStorage.setItem('cartBigAsia', JSON.stringify(this.cartGoods));
	},
	getCountCartGoods() {
		return this.cartGoods.length
	},   
    renderCard() {
		cartProductItems.textContent = '';
		if (this.cartGoods.length === 0) {
			cartProductItems.innerHTML = `<p>Ваша Корзина пуста</p>`;
		}
		this.cartGoods.forEach(({ id, name, price, count, img }) => {
			const divGood = document.createElement('div');
			divGood.className = 'cart-product-item';
			divGood.dataset.id = id;

			divGood.innerHTML = `
				<div class="cart-product-left d-flex">
					<button class="cart-btn-delete">x</button>
					<div class="cart-product-img">
						<img src="${img}">
					</div>
					<div class="cart-product-name">${name}</div>
				</div>
				<div class="cart-product-right d-flex">
					<div class="cart-product-toggle">
						<div class="input-range" data-desc="Ед. изм.: упаковка">
							<button class="cart-btn-minus">-</button>
							<input type="text" maxlength="12" value="${count}" />
							<button class="cart-btn-plus">+</button>
						</div>
					</div>
					<div class="cart-product-price">${price} тг</div>
				</div>
			`;
			cartProductItems.append(divGood);
			
		});
		
		const totalPriceBeforeDiscount = this.cartGoods.reduce((sum, item) => {
			return sum + item.price * item.count;
		}, 0);

		if (totalPriceBeforeDiscount >= 15000) {
			discount.textContent = 0;
		} else {
			discount.textContent = 1000;
		}

        const totalPriceAfterDiscount = this.cartGoods.reduce(() => {
            return totalPriceBeforeDiscount + +discount.textContent;
        }, 0)

		priceCart.textContent = totalPriceBeforeDiscount + ' тг';
        totalPrice.textContent = totalPriceAfterDiscount + ' тг';
		greenLine.style.width = (totalPriceBeforeDiscount*100/15000) + '%';


	},
	deleteGood(id) {
		this.cartGoods = this.cartGoods.filter(item => id !== item.id);
		this.renderCard();
		this.updateLocalStorage();
		this.countQuantity();
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
	},
	plusGood(id) {
		for (const item of this.cartGoods) {
			if (item.id === id) {
				item.count++;
				break;
			}
		}
		this.updateLocalStorage();
	},
	addCartGoods(id){
		const goodItem = this.cartGoods.find(item => item.id === id);
		if (goodItem) {
			this.plusGood(id);
		} else {
			getGoods.then(data => data.find(item => item.id === id))
				.then(({ id, name, price, img }) => {
					this.cartGoods.push({
						id,
						name,
						price,
						img,
						count: 1
					});
					this.updateLocalStorage();
				});
		}
		
	},
}



const renderCardProduct = ({ id, name, price, img, description }) => {
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
                </div>
                <div class="w50">
                    <div class="price">
                        <span>Цена</span> <b>${price} тг</b>
                    </div>
                </div>
                <div class="pay-bottom">
                    <div class="to-pay">
                        <span>Итого к оплате</span>
                        <b class="total-price">${price}</b>
                    </div>
                    <div class="pay-block">
                        <button class="add-to-cart" data-id="${id}">В корзину</button>
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
                </ul>
                
                <!-- Tab panes -->
                <div class="tab-content">
                    <div class="tab-pane active" id="home" role="tabpanel" aria-labelledby="about_product">
                        <h2 class="tab">Описание</h2>
                        <p>${description}</p> 
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

document.body.addEventListener('click', event => {
	const addToCart = event.target.closest('.add-to-cart');

	if (addToCart) {
		cart.addCartGoods(addToCart.dataset.id)
		addToCart.style.cssText = "background: rgb(11 162 93); color: #FFFFFF";
		addToCart.textContent = 'Добавлено';
	}
})

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
});
////////////////////////  mobile cart open

const cartMob = document.querySelector('.cart-mob');
const cartPopup = document.querySelector('.cart-popup');
const closePopup = document.querySelector('.close-cart-popup');
const navbarToggler = document.querySelector('.navbar-toggler');
const blur = document.querySelector('.blur');
const supportMobile = document.querySelector('.support-mobile');

navbarToggler.addEventListener('click', () => navbarToggler.classList.toggle('change-button'));

cart.renderCard();
