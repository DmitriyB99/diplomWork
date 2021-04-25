const cartProductItems = document.querySelectorAll('.cart-product-items')[1];
const priceCartDelivery = document.querySelector('.price-cart-delivery');
const priceCartPickup = document.querySelector('.price-cart-pickup');
const totalPrice = document.querySelectorAll('.total-price')[1];
const delivery = document.querySelector('.delivery-price');
const pickUp = document.querySelector('.pickup-price');
const totalPricePickUp = document.querySelectorAll('.total-price')[2];


console.log(totalPricePickUp);

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
		cartProductItems.textContent = '';
		this.cartGoods.forEach(({ id, name, price, count, img }) => {
			const divGood = document.createElement('div');
			divGood.className = 'cart-product-item';
			divGood.dataset.id = id;

			divGood.innerHTML = `
				<div class="cart-product-left d-flex">
					<div class="cart-product-img">
						<img src="${img}" alt="${name}">
					</div>
					<div class="cart-product-name">${name}</div>
				</div>
				<div class="cart-product-right d-flex">
					<div class="cart-product-toggle">
						<div class="input-range-order" data-desc="Ед. изм.: упаковка">
							<input type="text" maxlength="12" value="${count}" disabled />
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

        const totalPriceAfterDiscount = this.cartGoods.reduce(() => {
            return totalPriceBeforeDiscount + +delivery.textContent;
        }, 0)

        const totalPriceAfterDiscountPickup = this.cartGoods.reduce(() => {
            return totalPriceBeforeDiscount + +pickUp.textContent;
        }, 0)

		priceCartDelivery.textContent = totalPriceBeforeDiscount + ' тг';
        totalPrice.textContent = totalPriceAfterDiscount + ' тг';

        priceCartPickup.textContent = totalPriceBeforeDiscount + ' тг';
        totalPricePickUp.textContent = totalPriceAfterDiscountPickup + ' тг';

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

cart.renderCard();
