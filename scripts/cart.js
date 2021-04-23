

const cartProductItems = document.querySelector('.cart-product-items');

const cart = {
    cartGoods: JSON.parse(localStorage.getItem('cartWilb')) || [],
	updateLocalStorage() {
		localStorage.setItem('cartWilb', JSON.stringify(this.cartGoods));
	},
	getCountCartGoods() {
		return this.cartGoods.length
	},
	countQuantity() {	
		const count = this.cartGoods.reduce((sum, item) => {
			return sum + item.count
		}, 0)
		cartCount.textContent = count ? count : '';
	},
	countQuantity() {	
		const count = this.cartGoods.reduce((sum, item) => {
			return sum + item.count
		}, 0)
		cartCount.textContent = count ? count : '';
	},
	renderCard() {
		cartProductItems.textContent = '';
		this.cartGoods.forEach(({ id, name, price, count }) => {
			const divGood = document.createElement('div');
			divGood.className = 'cart-product-item';
			divGood.dataset.id = id;

			divGood.innerHTML = `
				<div class="cart-product-left d-flex">
					<img src="img/cart-product-remove.svg" alt="product-remov" class="cart-product-remove">
					<div class="cart-product-img">
						<img src="${img}" alt="${name}">
					</div>
					<div class="cart-product-name">${name}</div>
				</div>
				<div class="cart-product-right d-flex">
					<div class="cart-product-toggle">
						<div class="input-range" data-desc="Ед. изм.: упаковка">
							<span class="min button">-</span>
							<input type="text" maxlength="12" value="${count}" />
							<span class="plus button">+</span>
						</div>
					</div>
					<div class="cart-product-price">${price}</div>
				</div>
			`;
			cartProductItems.append(divGood);
		});
		
		const totalPrice = this.cartGoods.reduce((sum, item) => {
			return sum + item.price * item.count;
		}, 0);

		cartProductItems.textContent = totalPrice +'тг';
	},
}

cart.renderCard();