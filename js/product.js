const urlParams = new URLSearchParams(window.location.search);
const productName = urlParams.get('name');
const productPrice = urlParams.get('price');
const productImg = urlParams.get('img');

document.getElementById('product-name').textContent = productName || 'Назва товару';
document.getElementById('product-price').textContent = `Ціна: ${productPrice || '0'} грн`;
document.getElementById('product-img').src = productImg || 'default.jpg';

document.getElementById('buy-button').addEventListener('click', () => {
    const size = document.getElementById('size-select').value;
    const color = document.querySelector('input[name="color"]:checked').value;
    alert(`Ви обрали:\nТовар: ${productName}\nЦіна: ${productPrice} грн\nРозмір: ${size}\nКолір: ${color}`);
});

document.getElementById('add-to-cart-button').addEventListener('click', () => {
    const size = document.getElementById('size-select').value;
    const color = document.querySelector('input[name="color"]:checked').value;

    const product = {
        name: productName,
        price: parseInt(productPrice),
        img: productImg,
        size: size,
        color: color,
    };

    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    cart.push(product);
    localStorage.setItem('cart', JSON.stringify(cart));

    alert('Товар додано до кошика!');
});
