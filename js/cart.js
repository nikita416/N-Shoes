document.addEventListener('DOMContentLoaded', () => {
    const cartItemsContainer = document.getElementById('cart-items');
    const totalPriceElement = document.getElementById('total-price');

    // Получаем товары из localStorage
    const cart = JSON.parse(localStorage.getItem('cart')) || [];

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Ваш кошик порожній...</p>';
        return;
    }

    // Отображаем товары
    cartItemsContainer.innerHTML = '';
    let totalPrice = 0;

    cart.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <img src="${item.img}" alt="${item.name}">
            <div>
                <p>${item.name}</p>
                <p>${item.price} грн</p>
                <button class="remove-item" data-index="${index}">Видалити</button>
            </div>
        `;
        cartItemsContainer.appendChild(itemElement);
        totalPrice += item.price;
    });

    // Обновляем общую сумму
    totalPriceElement.textContent = `Загальна сума: ${totalPrice} грн`;

    // Добавляем обработчик удаления товаров
    document.querySelectorAll('.remove-item').forEach((button) => {
        button.addEventListener('click', (e) => {
            const index = e.target.dataset.index;
            cart.splice(index, 1);
            localStorage.setItem('cart', JSON.stringify(cart));
            location.reload();
        });
    });
});
