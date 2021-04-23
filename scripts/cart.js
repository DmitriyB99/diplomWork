
const totalPriceCart = document.querySelector('.total-price');
const cartProductItems = document.querySelectorAll('.cart-product-items');
const cartProductItems1 = cartProductItems[1];
console.log(cartProductItems1);

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
    cartGoods: JSON.parse(localStorage.getItem('carBigAsia')) || [],
	updateLocalStorage() {
		localStorage.setItem('carBigAsia', JSON.stringify(this.cartGoods));
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
		cartProductItems1.textContent = '';
		this.cartGoods.forEach(({ id, name, price, count }) => {
			const divGood = document.createElement('div');
			divGood.className = 'cart-product-item';
			divGood.dataset.id = id;

			divGood.innerHTML = `
				<div class="cart-product-left d-flex">
					<img src="img/cart-product-remove.svg" alt="product-remove" class="cart-product-remove">
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
			cartProductItems1.append(divGood);
		});
		
		const totalPrice = this.cartGoods.reduce((sum, item) => {
			return sum + item.price * item.count;
		}, 0);

		totalPriceCart.textContent = totalPrice +'тг';
	},
}

document.body.addEventListener('click', event => {
	const addToCart = event.target.closest('.add-to-cart');

	if (addToCart) {
		cart.addCartGoods(addToCart.dataset.id)
	}
})
cart.renderCard();

