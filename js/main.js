'use strict';

const cartButton = document.querySelector("#cart-button");
const modal = document.querySelector(".modal");
const close = document.querySelector(".close");
const ButtonAuth = document.querySelector('.button-auth');
const ModalAuth = document.querySelector('.modal-auth');
const closeAuth = document.querySelector('.close-auth');
const loginForm = document.querySelector('#logInForm');
const loginInput = document.querySelector('#login');
const userName = document.querySelector('.user-name');
const buttonOut = document.querySelector('.button-out');
const cardsRestaurants = document.querySelector('.cards-restaurants');
const containerPromo = document.querySelector('.container-promo');
const restaurants = document.querySelector('.restaurants');
const menu = document.querySelector('.menu');
const logo = document.querySelector('.logo');
const cardsMenu = document.querySelector('.cards-menu');

let login = localStorage.getItem('glo');

function toggleModal() {
  modal.classList.toggle("is-open");
}

function toggleModalAuth() {
  ModalAuth.classList.toggle("is-open");
}

function authorized() {
  
  function logOut() {
    login = null;

    localStorage.removeItem('glo');

    userName.textContent = '';
    ButtonAuth.style.display = '';
    userName.style.display = '';
    buttonOut.style.display ='';
    buttonOut.style.backgroundColor ='';
    cartButton.style.display = '';
    buttonOut.removeEventListener('click', logOut)
    checkAuth();
  }
  console.log('авторизован');
  userName.textContent = login;
  ButtonAuth.style.display = 'none';
  userName.style.display = 'inline';
  buttonOut.style.display ='flex';
  buttonOut.style.backgroundColor ='#f7d794';
  cartButton.style.display = 'flex';
  cartButton.style.backgroundColor = '#1890ff';
  cartButton.style.color = 'white';
  buttonOut.addEventListener('click', logOut);
}

function notAuthorized() {
  console.log('не авторизован');
  function logIn(event) {
    event.preventDefault();
    login = loginInput.value;

    localStorage.setItem('glo', login);

    if(login) {
      toggleModalAuth();
    } else {
      alert('Пожалуйста,  вводите login');
    }

    ButtonAuth.removeEventListener('click', toggleModalAuth);
    closeAuth.removeEventListener('click', toggleModalAuth);
    loginForm.removeEventListener('submit', logIn);
    loginForm.reset();
    checkAuth();
  }
ButtonAuth.addEventListener('click', toggleModalAuth);
closeAuth.addEventListener('click', toggleModalAuth);
loginForm.addEventListener('submit', logIn)
}

function checkAuth() {
if(login) {
  authorized();
} else {
  notAuthorized();
}
}

function createCardsRestaurant() {
  const card = `
  <a class="card card-restaurant">
						<img src="img/pizza-plus/preview.jpg" alt="image" class="card-image"/>
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title">Пицца плюс</h3>
								<span class="card-tag tag">50 мин</span>
							</div>
							<div class="card-info">
								<div class="rating">
									4.5
								</div>
								<div class="price">От 900 ₽</div>
								<div class="category">Пицца</div>
							</div>
						</div>
          </a>
          `;

          cardsRestaurants.insertAdjacentHTML('beforeend', card);
}

function createCardGood() {
  const card = document.createElement('div');
  card.className = 'card';

  card.insertAdjacentHTML('beforeend', `
  <img src="img/pizza-plus/pizza-classic.jpg" alt="image" class="card-image"/>
  <div class="card-text">
    <div class="card-heading">
      <h3 class="card-title card-title-reg">Пицца Классика</h3>
    </div>
    <div class="card-info">
      <div class="ingredients">Соус томатный, сыр «Моцарелла», сыр «Пармезан», ветчина, салями,
        грибы.
      </div>
    </div>
    <div class="card-buttons">
      <button class="button button-primary button-add-cart">
        <span class="button-card-text">В корзину</span>
        <span class="button-cart-svg"></span>
      </button>
      <strong class="card-price-bold">510 ₽</strong>
    </div>
  </div>
  `);

  cardsMenu.insertAdjacentElement('beforeend', card);

}

function openGoods(event) {
    const target =  event.target;
    const restaurant = target.closest('.card-restaurant');
    
    if (restaurant) {
      
      cardsMenu.textContent = '';

      containerPromo.classList.add('hide');
      restaurants.classList.add('hide');
      menu.classList.remove('hide');

      createCardGood();
      createCardGood();
      createCardGood();
    }

    
}

cartButton.addEventListener("click", toggleModal);

close.addEventListener("click", toggleModal);

cardsRestaurants.addEventListener('click', openGoods);

logo.addEventListener('click', function() {

      containerPromo.classList.remove('hide');
      restaurants.classList.remove('hide');
      menu.classList.add('hide');

})

checkAuth();

createCardsRestaurant();
createCardsRestaurant();
createCardsRestaurant();