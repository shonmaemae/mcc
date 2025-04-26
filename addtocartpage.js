const products = document.querySelectorAll('.product');
const cart = document.getElementById('cart');
const subtotalEl = document.getElementById('subtotal');
const taxEl = document.getElementById('tax');
const totalEl = document.getElementById('total');

let cartItems = [];

products.forEach(product => {
  product.addEventListener('dragstart', e => {
    e.dataTransfer.setData('text/plain', JSON.stringify({
      name: product.dataset.name,
      price: parseFloat(product.dataset.price)
    }));
  });
});

cart.addEventListener('dragover', e => {
  e.preventDefault();
});

cart.addEventListener('drop', e => {
  e.preventDefault();
  const data = JSON.parse(e.dataTransfer.getData('text/plain'));
  addItemToCart(data.name, data.price);
});

function addItemToCart(name, price) {
  const existing = cartItems.find(item => item.name === name);
  if (existing) {
    existing.qty++;
  } else {
    cartItems.push({ name, price, qty: 1 });
  }
  renderCart();
}

function renderCart() {
  cart.innerHTML = '<h2>Cart</h2>';
  cartItems.forEach((item, index) => {
    const el = document.createElement('div');
    el.classList.add('cart-item');
    el.innerHTML = `
      <div class="cart-item-content">
        <span class="item-name">${item.name}</span>
        <div class="qty-control">
          <button class="qty-btn minus">−</button>
          <span class="qty-value">${item.qty}</span>
          <button class="qty-btn plus">+</button>
        </div>
        <button class="remove-btn">✕</button>
      </div>
    `;
    el.querySelector('.plus').onclick = () => {
      item.qty++;
      renderCart();
    };
    el.querySelector('.minus').onclick = () => {
      if (item.qty > 1) {
        item.qty--;
        renderCart();
      }
    };
    el.querySelector('.remove-btn').onclick = () => {
      cartItems.splice(index, 1);
      renderCart();
    };
    cart.appendChild(el);
  });
  updateTotals();
}

function updateTotals() {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
  const tax = +(subtotal * 0.1).toFixed(2);
  const total = +(subtotal + tax).toFixed(2);
  subtotalEl.textContent = subtotal.toFixed(2);
  taxEl.textContent = tax.toFixed(2);
  totalEl.textContent = total.toFixed(2);
}

document.getElementById('checkout-btn').addEventListener('click', () => {
    window.open('https://www.youtube.com/watch?v=hB7CDrVnNCs', '_blank');
});

