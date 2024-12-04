const femaleCategory = document.querySelector(".category.women");
const maleCategory = document.querySelector(".category.men");

femaleCategory.addEventListener("click", () => {
    localStorage.setItem("selectedGender", "Жіноча");

    window.location.href = "shop.html";
});

maleCategory.addEventListener("click", () => {
    localStorage.setItem("selectedGender", "Чоловіча");

    window.location.href = "shop.html";
});
