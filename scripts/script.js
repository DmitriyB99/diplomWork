const mySwiper = new Swiper('.swiper-container', {
    slidesPerView: 1,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});

const menuSwiper = new Swiper('.swiper-container-menu', {
    slidesPerView: 'auto',
    spaceBetween: 0,    
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
	breakpoints: {
		768: {
			spaceBetween: 63
		},
	}
});


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
const cartProductItems = document.querySelector('.cart-product-items');
const cartCount = document.querySelector('.cart-mob');
const priceCart = document.querySelector('.price-cart');
const totalPrice = document.querySelector('.total-price');
const discount = document.querySelector('.discount');
const links = document.querySelectorAll('.links');
const greenLine = document.querySelector('.green-line');


// Your web app's Firebase configuration
var firebaseConfig = {
	apiKey: "AIzaSyCt48I_S1-EzUHqVKfSCvn1vPyJodxhmN0",
	authDomain: "big-asia.firebaseapp.com",
	databaseURL: "https://big-asia-default-rtdb.firebaseio.com",
	projectId: "big-asia",
	storageBucket: "big-asia.appspot.com",
	messagingSenderId: "676401111057",
	appId: "1:676401111057:web:e9f5ad694511fac6e911b0"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Get a reference to the database service
var database = firebase.database();

const checkGoods = () => {
	const data = [];
	return async () => {
		if (data.length) return data;
		const firebaseDB = firebase.database().ref('/');
		firebaseDB.on('value', snapshot => {
			snapshot.forEach(childSnapshot => {			
				var childData = childSnapshot.val();
				// document.getElementById('data').innerHTML = childData['name'] + ',' + childData['id'] + ',' + childData['description'] + ',' + childData['img'] + ',' + childData['price'];
				data.push(childData);
			})
		})		
		return data
	}	
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
	countQuantity() {	
		const count = this.cartGoods.reduce((sum, item) => {
			return sum + item.count
		}, 0)
		cartCount.setAttribute('data-count', count);
	},
	clearCart() {
		this.cartGoods.length = 0;
		this.countQuantity();	
		this.updateLocalStorage();
		this.renderCard();
	},
	renderCard() {
		cartProductItems.textContent = '';
		if (this.cartGoods.length === 0) {
			cartProductItems.innerHTML = `<p>???????? ?????????????? ??????????</p>`;
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
						<div class="input-range" data-desc="????. ??????.: ????????????????">
							<button class="cart-btn-minus">-</button>
							<input type="text" maxlength="12" value="${count}" />
							<button class="cart-btn-plus">+</button>
						</div>
					</div>
					<div class="cart-product-price">${price} ????</div>
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

		priceCart.textContent = totalPriceBeforeDiscount + ' ????';
        totalPrice.textContent = totalPriceAfterDiscount + ' ????';
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
		this.countQuantity();
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
		this.countQuantity();
		this.updateLocalStorage();
		this.renderCard();		
	},
	addCartGoods(id){
		const goodItem = this.cartGoods.find(item => item.id === id);
		if (goodItem) {
			this.plusGood(id);
		} else {
			getGoods()
				.then(data => data.find(item => item.id === id))
				.then(({ id, name, price, img }) => {
					this.cartGoods.push({
						id,
						name,
						price,
						img,
						count: 1
					});
					this.updateLocalStorage();
					this.countQuantity();
				});
		}
		
	},
}

const createCard = function ({ name, img, description, id, price }) {
	const card = document.createElement('div');
	card.className = 'product';

	card.innerHTML = `
    <div class="img">
        <img src="${img}" alt="${name}">
    </div>
    <a href="card.html?id=${id}" class="title links">${name}</a>
    <p class="description">${description}/ 250 ????</p>
    <div class="rating">
    <div class="price">
        <b>${price} ????/????</b>
    </div>
    <button class="add-to-cart" data-id="${id}">?? ??????????????</button>
	
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

////////////////////////////////////// instaView
const viewAllSolo = document.querySelectorAll('.view-all')[1];

viewAllSolo.addEventListener('click', showAll);

setTimeout(() => {    
    viewAllSolo.click();
}, 0);
////////////////////////////////////////////////////////////////////


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
		filterCards(field, value);
	})
});

showSweets.forEach(item => {
	item.addEventListener('click', event => {
		event.preventDefault();
		filterCards('category', '????????????????');
	})
});

showDriedFruits.forEach(item => {
	item.addEventListener('click', event => {
		event.preventDefault();
		filterCards('category', '????????????????????');
	})
});

showNuts.forEach(item => {
	item.addEventListener('click', event => {
		event.preventDefault();
		filterCards('category', '??????????');
	})
});

showTea.forEach(item => {
	item.addEventListener('click', event => {
		event.preventDefault();
		filterCards('category', '??????');
	})
});

showDishes.forEach(item => {
	item.addEventListener('click', event => {
		event.preventDefault();
		filterCards('category', '????????????');
	})
});

showCandiedFruits.forEach(item => {
	item.addEventListener('click', event => {
		event.preventDefault();
		filterCards('category', '????????????');
	})
});

showGifts.forEach(item => {
	item.addEventListener('click', event => {
		event.preventDefault();
		filterCards('category', '???????????????????? ????????????');
	})
});

showSpice.forEach(item => {
	item.addEventListener('click', event => {
		event.preventDefault();
		filterCards('category', '????????????');
	})
});

const showAllInstantly = () => {
	getGoods().then(renderCards);
	console.log('success');
}

setTimeout(() => {    
    showAllInstantly();
	document.body.classList.add('loaded');
}, 2500);


document.body.addEventListener('click', event => {
	const addToCart = event.target.closest('.add-to-cart');

	if (addToCart) {
		cart.addCartGoods(addToCart.dataset.id)
		addToCart.style.cssText = "background: rgb(11 162 93); color: #FFFFFF";
		addToCart.textContent = '??????????????????';
	}
})



links.forEach(item => {
	item.addEventListener('click', event => {
		event.preventDefault()
		localStorage.setItem('cartBigAsia', event.currentTarget.dataset.index);
		console.log(localStorage.setItem('cartBigAsia', links.currentTarget.dataset.index));

	})
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
const homeMobile = document.querySelector('.home-mobile');

cartMob.addEventListener('click', () => {
	homeMobile.classList.toggle('active');
	cartMob.classList.toggle('active');
	cartPopup.classList.toggle('active');
	document.body.classList.toggle('modal-open');
	blur.classList.toggle('active');
	cart.renderCard();
});

closePopup.addEventListener('click', () => {
	homeMobile.classList.add('active');
	cartMob.classList.remove('active');
	cartPopup.classList.remove('active');
	document.body.classList.remove('modal-open');
	blur.classList.remove('active');
});

blur.addEventListener('click', () => {
	homeMobile.classList.add('active');
	cartMob.classList.remove('active');
	blur.classList.remove('active');
	cartPopup.classList.remove('active');
	document.body.classList.remove('modal-open');
});

navbarToggler.addEventListener('click', () => navbarToggler.classList.toggle('change-button'));

cart.renderCard();
cart.countQuantity();



// function writeData() {
// 	var products = firebase.database().ref('/');
// 	var productsAdd = products.push();
// 	productsAdd.set({
// 		name: document.getElementById('nameField').value,
// 		id: document.getElementById('idField').value,
// 		img: document.getElementById('imgField').value,
// 		description: document.getElementById('descriptionField').value,
// 		price: document.getElementById('priceField').value,
// 		category: document.getElementById('categiryField').value
// 	})

// 	getData();

// }

// function getData() {
// 	const data22 = []

// 	firebase.database().ref('/').on('value', snapshot => {
// 		snapshot.forEach(function(childSnapshot) {	
// 			var childKey = childSnapshot.key;
// 			var childData = childSnapshot.val();
// 			document.getElementById('data').innerHTML = childData['name'] + ',' + childData['id'] + ',' + childData['description'] + ',' + childData['img'] + ',' + childData['price'];			

// 			data22.push(childData);			
// 			// data22.push(JSON.stringify(childData));

// 		})
// 		console.log(data22);
// 	})
	
// }			

// getData();

	



window.onload = function () {
	document.body.classList.add('loaded_hiding');
	window.setTimeout(function () {
	document.body.classList.remove('loaded_hiding');
	}, 10);
};

	


