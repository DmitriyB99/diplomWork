


document.addEventListener('DOMContentLoaded', function () {
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
						<div class="input-range-order" data-desc="Ед. изм.: кг">
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


////////////////////////  mobile cart open

const cartMob = document.querySelector('.cart-mob');
const cartPopup = document.querySelector('.cart-popup');
const closePopup = document.querySelector('.close-cart-popup');
const navbarToggler = document.querySelector('.navbar-toggler');
const blur = document.querySelector('.blur');
const homeMobile = document.querySelector('.home-mobile');

cartMob.addEventListener('click', () => {
	cartMob.classList.toggle('active');
	cartPopup.classList.toggle('active');
	document.body.classList.toggle('modal-open');
	blur.classList.toggle('active');
	cart.renderCard();
});

closePopup.addEventListener('click', () => {
	cartMob.classList.remove('active');
	cartPopup.classList.remove('active');
	document.body.classList.remove('modal-open');
	blur.classList.remove('active');
});

blur.addEventListener('click', () => {
	cartMob.classList.remove('active');
	blur.classList.remove('active');
	cartPopup.classList.remove('active');
	document.body.classList.remove('modal-open');
});

navbarToggler.addEventListener('click', () => navbarToggler.classList.toggle('change-button'));

// form

const buttonLine = document.querySelector('.button-line');
const formLine1 = document.querySelector('.form-1');
const formLine2 = document.querySelector('.form-2');
const pickUpBtn = document.querySelector('.pickup-btn');
const deliveryBtn = document.querySelector('.delivery-btn');
const comment = document.querySelector('.comment');
const labelBtn = document.querySelector('.label-btn');

labelBtn.addEventListener('click', () => {
	comment.classList.toggle('active');
});

formLine1.addEventListener('click', () => {
	formLine1.classList.add('active');
	formLine2.classList.remove('active');
	pickUpBtn.classList.remove('active');
	deliveryBtn.classList.add('active');
});

formLine2.addEventListener('click', () => {
	formLine2.classList.add('active');
	formLine1.classList.remove('active');
	pickUpBtn.classList.add('active');
	deliveryBtn.classList.remove('active');
});
	
	const form = document.getElementById('form');

console.log(form);

form.addEventListener('submit', formSend);

async function formSend(e) {
	e.preventDefault();


	let formData = new FormData(form);
	
	let response = await fetch('sendmail.php', {
		method: 'POST',
		body: formData
	});

	if (response.ok) {
		let result = await response.json();
		alert(result.message);
		form.reset();
	} else {
		alert('ERROR')
	}
}

cart.renderCard();

})
/////////////////////////////////////////////


// function formValidate(form) {
// 	let error = 0;
// 	let formReq = document.querySelectorAll('._req');

// 	for (let index = 0; index < formReq.length; index++) {
// 		const input = formReq[index];
// 	}
// }

// function formAddError(input) {
// 	input.parentElement.classList.add('_error');
// 	input.classList.add('_error')
// }

// function formRemoveError(input) {
// 	input.parentElement.classList.remove('_error');
// 	input.classList.remove('_error')
// }
