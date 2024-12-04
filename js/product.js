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
