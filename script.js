import menuArray from './data.js';

const formSubmitBtn = document.getElementById('pay-btn');
const menuEl = document.getElementById('items-container');
const cartEl = document.getElementById('cart');
const orderConfirmed = document.getElementById(
  'order-confirmed'
);
const payForm = document.getElementById('pay');
const toPay = document.getElementById('to-pay');

const cart = [];
let cartTotal = 0;

function renderMenu(menu) {
  menu.forEach(function (item) {
    menuEl.innerHTML += `
            <div class="item">
                <div class="item-image">
                    <span class="imgs">${item.image}</span>
                </div>
                <div class="item-description">
                  <p class="item-name">${item.name}</p>
                  <p class="item-ingredients">${item.ingredients.join(
                    ', '
                  )}</p>
                  <p class="item-price">$${item.price}</p>
                </div>
                <button class="add-item" id="${
                  item.id
                }">+</button>
            </div>
                  <hr />
        `;
  });
}

renderMenu(menuArray);

menuEl.addEventListener('click', function (e) {
  const menuItemId = parseInt(e.target.id);

  if (menuItemId >= 0 && menuItemId < menuArray.length) {
    renderCart(menuArray, menuItemId);
  }
});

function renderCart(menu, itemId) {
  cartEl.innerHTML = `
                    <h3>Your order</h3>
                    <div id="cart-items"></div>
                    <hr />
                    <div class="cart-total">
                        <div class="cart-total-amount" id="cart-total-amount"></div>
                    </div>
                        <button id="confirm-btn">Complete order</button>
    `;
  cart.push(itemId);
  cartTotal += menu[itemId].price;

  renderCartItems(cart, menu, itemId);
  //delete items
  document
    .getElementById('cart-items')
    .addEventListener('click', function (e) {
      const menuItemId = parseInt(e.target.id);

      if (menuItemId >= 0 && menuItemId < menu.length) {
        cart.splice(cart.indexOf(menuItemId), 1);
        cartTotal -= menu[menuItemId].price;

        document.getElementById(
          'cart-items'
        ).innerHTML = ``;

        if (cart.length < 1) {
          cartEl.innerHTML = ``;
        }

        renderCartItems(cart, menu, itemId);
      }
    });

  // end delete
  document
    .getElementById('confirm-btn')
    .addEventListener('click', function () {
      if (cart.length > 0) {
        payForm.style.display = 'block';
        toPay.innerHTML = `Total to pay: $${cartTotal}`;
      }
    });
}

function renderCartItems(items, menu, itemId) {
  items.forEach(function (itemId) {
    document.getElementById('cart-items').innerHTML += `
            <div class="cart-item">
              <div class="cart-item__nr">
                <div class="cart-item-name">${menu[itemId].name}</div>
                <button class="cart-remove" id="${itemId}">remove</button>
                </div>  
              <div class="cart-item-price">$${menu[itemId].price}</div>     
          </div> 
        `;
  });

  document.getElementById(
    'cart-total-amount'
  ).textContent = `Total price: $${cartTotal}`;
}

const userName = document.getElementById('user-name');

formSubmitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  cartEl.innerHTML = ``;
  payForm.style.display = 'none';
  orderConfirmed.innerHTML = `
  <div class="end-message">
    <p>Thank you ${userName.value}, your order will be with you soon! Pofta Mare!</p>
    </div>
    <button class="order-again" onclick="location.reload()">New order</button>
  `;
});
