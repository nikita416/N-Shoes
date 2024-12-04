'use strict';

const products = [
    { id: 1, name: "Туфлі Nike", category: "Туфлі", brand: "Nike", price: 1500, gender: "Чоловіча", img: "https://www.kedred.ru/wp-content/uploads/2023/11/zimnie-botinki-nike-1-1.jpg" },
    { id: 2, name: "Мокасини Adidas", category: "Мокасини", brand: "Adidas", price: 2300, gender: "Чоловіча", img: "https://cdn.lbtq.io/productImage/resize/1200x1600_40cd750bba9870f18aada2478b24840a/20200224/142/20200224142635_005347413_5.jpg" },
    { id: 3, name: "Кросівки Guess", category: "Кросівки", brand: "Guess", price: 1800, gender: "Жіноча", img: "https://i.pinimg.com/736x/e7/43/64/e74364a018e2b0bf8f85aaa3805ba656.jpg" },
    { id: 4, name: "Кеди Salomon", category: "Кеди", brand: "Salomon", price: 2500, gender: "Чоловіча", img: "https://images.shafastatic.net/102747590" },
    { id: 5, name: "Сандалі Nike", category: "Сандалі", brand: "Nike", price: 1200, gender: "Жіноча", img: "https://kedred.ru/wp-content/uploads/2020/06/sandali-nike-6-13.jpg" },
    { id: 6, name: "Кросівки Adidas", category: "Кросівки", brand: "Adidas", price: 3000, gender: "Жіноча", img: "https://intertop.ua/load/ID3073/1600x2133/MAIN.jpg" },
];

document.addEventListener("DOMContentLoaded", () => {
    const selectedGender = localStorage.getItem("selectedGender");

    if (selectedGender) {
        console.log("Сохраненный пол из localStorage:", selectedGender);

        const genderCheckbox = Array.from(document.querySelectorAll(".gender-filter")).find(
            (checkbox) => checkbox.value === selectedGender
        );

        if (genderCheckbox) {
            console.log("Найден чекбокс для сохраненного пола:", genderCheckbox.value);
            genderCheckbox.checked = true;

            console.log("Вызов filterProducts() после установки галочки");
            filterProducts();
        } else {
            console.log("Чекбокс для сохраненного пола не найден!");
        }

        localStorage.removeItem("selectedGender");
    } else {
        console.log("Пол не был сохранен в localStorage.");
    }
});

function renderProducts(filteredProducts) {
    const productsContainer = document.getElementById("products");
    productsContainer.innerHTML = "";

    if (filteredProducts.length === 0) {
        productsContainer.innerHTML = "<p>Немає товарів за вибраними фільтрами.</p>";
        return;
    }

    filteredProducts.forEach((product) => {
        const productElement = document.createElement("div");
        productElement.className = "product";
        productElement.innerHTML = `
            <img src="${product.img}" alt="${product.name}">
            <p>${product.name}</p>
            <p class="price">${product.price} грн</p>
        `;
        productsContainer.appendChild(productElement);
    });

    addProductEventListeners();
}

function filterProducts() {
    const priceLimit = document.getElementById("priceRange").value;

    const selectedBrands = Array.from(document.querySelectorAll(".brand-filter:checked")).map(
        (checkbox) => checkbox.value
    );

    const selectedCategories = Array.from(document.querySelectorAll(".category-filter:checked")).map(
        (checkbox) => checkbox.value
    );

    const selectedGenders = Array.from(document.querySelectorAll(".gender-filter:checked")).map(
        (checkbox) => checkbox.value
    );

    console.log("Выбранные полы (gender):", selectedGenders);
    console.log("Выбранные бренды:", selectedBrands);
    console.log("Выбранные категории:", selectedCategories);

    const filtered = products.filter((product) => {
        const matchesBrand = selectedBrands.length === 0 || selectedBrands.includes(product.brand);
        const matchesCategory =
            selectedCategories.length === 0 || selectedCategories.includes(product.category);
        const matchesGender = selectedGenders.length === 0 || selectedGenders.includes(product.gender);
        const matchesPrice = product.price <= priceLimit;

        return matchesBrand && matchesCategory && matchesGender && matchesPrice;
    });

    console.log("Отфильтрованные товары:", filtered);

    renderProducts(filtered);
}

document.getElementById("priceRange").addEventListener("input", (e) => {
    document.getElementById("priceValue").textContent = `${e.target.value} грн`;
    filterProducts();
});

document.querySelectorAll(".brand-filter").forEach((checkbox) => {
    checkbox.addEventListener("change", filterProducts);
});

document.querySelectorAll(".category-filter").forEach((checkbox) => {
    checkbox.addEventListener("change", filterProducts);
});

document.querySelectorAll(".gender-filter").forEach((checkbox) => {
    checkbox.addEventListener("change", filterProducts);
});

function addProductEventListeners() {
    document.querySelectorAll('.product').forEach((product) => {
        product.addEventListener('click', (e) => {
            const productName = e.currentTarget.querySelector('p').textContent;
            const productPrice = e.currentTarget.querySelector('.price').textContent.split(' ')[0];
            const productImg = e.currentTarget.querySelector('img').src;

            window.location.href = `product.html?name=${encodeURIComponent(productName)}&price=${productPrice}&img=${encodeURIComponent(productImg)}`;
        });
    });
}

renderProducts(products);
