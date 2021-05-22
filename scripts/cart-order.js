const cartProductItems = document.querySelectorAll('.cart-product-items')[1];
const priceCartDelivery = document.querySelector('.price-cart-delivery');
const priceCartPickup = document.querySelector('.price-cart-pickup');
const totalPrice = document.querySelectorAll('.total-price')[1];
const delivery = document.querySelector('.delivery-price');
const pickUp = document.querySelector('.pickup-price');
const totalPricePickUp = document.querySelectorAll('.total-price')[2];

const navbarToggler = document.querySelector('.navbar-toggler');




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

		if (totalPriceBeforeDiscount >= 15000) {
			delivery.textContent = 0;
		} else {
			delivery.textContent = 1000;
		}

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


navbarToggler.addEventListener('click', () => navbarToggler.classList.toggle('change-button'));

// form
const formLine1 = document.querySelector('.form-1');
const formLine2 = document.querySelector('.form-2');
const pickUpBtn = document.querySelector('.pickup-btn');
const deliveryBtn = document.querySelector('.delivery-btn');
const comment = document.querySelector('.comment');
const labelBtn = document.querySelector('.label-btn');
const deliveryDiv = document.querySelector('.delivery');
const pickupDiv = document.querySelector('.pickup');

labelBtn.addEventListener('click', () => {
	comment.classList.toggle('active');
});

formLine1.addEventListener('click', () => {
	formLine1.classList.add('active');
	formLine2.classList.remove('active');
	pickUpBtn.classList.remove('active');
	deliveryBtn.classList.add('active');
	deliveryDiv.classList.add('active');
	pickupDiv.classList.remove('active');
});

formLine2.addEventListener('click', () => {
	formLine2.classList.add('active');
	formLine1.classList.remove('active');
	pickUpBtn.classList.add('active');
	deliveryBtn.classList.remove('active');
	deliveryDiv.classList.remove('active');
	pickupDiv.classList.add('active');
});


/////////////////////select

const payMethod = document.querySelector('.pay-method');
const addScreenshot = document.querySelector('.add-screenshot');

payMethod.addEventListener('change', () => {
	addScreenshot.classList.toggle('active');
});


const formDelivery = document.querySelector('.form-delivery');
const formPickup = document.querySelector('.form-pickup');

/////localstorage отправка 

const local = localStorage.getItem('cartBigAsia');
const title = document.querySelector('.paste');


//////////////////////////////////////////////////////////////////
setTimeout(() => {    
    const price = document.querySelector('#formPrice');
	price.value = totalPrice.textContent
}, 0);
/////////////////////////////////////////////
/// получить инпут файл в переменную 

const formImage = document.getElementById('formImage');
/// получить див для превью в переменную

const formPreview = document.querySelector('#formPreview');

formImage.addEventListener('change', () => {
	uploadFile(formImage.files[0]);
});
console.log(formImage.files);

function uploadFile(file) {
	/// проверить тип файлa
	if (!['image/jpeg', 'image/png', 'image/gif'].includes(file.type)) {
		alert('Разрешены только изображения');
		formImage.value = '';
		return
	}

/// проверить размер файлы

	if (file.size > 2 * 1024 * 1024) {
		alert('Файл должен быть менее 2 МБ');
		return;
	}

	var reader = new FileReader();
	reader.onload = function (e) {
		formPreview.innerHTML = `<img src="${e.target.result}" alt="скриншот">`;
	};
	reader.onerror = function (e) {
		alert('Ошибка');
	};
	reader.readAsDataURL(file);
}


formDelivery.addEventListener('submit', formDeliverySend);

async function formDeliverySend(e) {
	e.preventDefault();

	let error = formValidate(formDelivery);

	let formData = new FormData(formDelivery);
	formData.append('products', local);
	formData.append('image', formImage.files[0]);

	if (error === 0) {
		let response = await fetch('sendmail.php', {
			method: 'POST',
			body: formData
		});
	
		if (response.ok) {
			let result = await response.json();
			alert(result.message);
			formPreview.innerHTML = '';
			formDelivery.reset();
		} else {
			alert('ERROR')
		}
	} else {
		alert('Заполните обязательные поля')
	}

	function formValidate(formDelivery) {
		let error = 0;
		let formReq = document.querySelectorAll('._req');
	
		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.classList.contains('_phone')) {
				if (phoneTest(input)) {
					formAddError(input);
					error++;
				}
			} else if (input.getAttribute('type') === 'checkbox' && input.checked === false) {
				formAddError(input);
				error++;
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}
	
	function formAddError(input) {
		input.parentElement.classList.add('_error')
		input.classList.add('_error')
	}
	
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error')

		input.classList.remove('_error')
	}

	/// функция теста телефона
	function phoneTest (input) {
		return !/^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/.test(input.value);
	}	
}

formPickup.addEventListener('submit', formPickupSend);

async function formPickupSend(e) {
	e.preventDefault();

	let formData = new FormData(formPickup);
	formData.append('products', local);
	
	let response = await fetch('sendmail.php', {
		method: 'POST',
		body: formData
	});

	if (response.ok) {
		let result = await response.json();
		alert(result.message);
		formPickup.reset();
	} else {
		alert('Произошла ошибка, попробуйте еще раз')
	}
}

cart.renderCard();



