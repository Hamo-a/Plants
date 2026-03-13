// Read basket
let basket = JSON.parse(localStorage.getItem("basket")) || [];

// Save basket
function saveBasket() {
    localStorage.setItem("basket", JSON.stringify(basket));
}

// Update counter safely
function updateBasketCount() {

    const numberProducts = document.querySelectorAll(".number_plants");

    if (!numberProducts.length) return;

    const total = basket.reduce((sum, item) => sum + item.quantity, 0);

    numberProducts.forEach(counter => {

        if (total > 0) {
            counter.textContent = total;
            counter.style.display = "block";
        } else {
            counter.style.display = "none";
        }

    });

}
// Generic quantity change
function changeQuantity(btn, step) {

    const card = btn.closest("[data-id]");
    if (!card) return;

    const id = Number(card.dataset.id);
    const product = basket.find(p => p.id === id);
    if (!product) return;

    product.quantity += step;

    // لا تسمح بالنزول أقل من 1
    if (product.quantity < 1) {
        product.quantity = 1;
    }

    const quantitySpan = card.querySelector(".digital-numder");

    if (quantitySpan) {
        quantitySpan.textContent = product.quantity;
    }

    saveBasket();
    updateBasketCount();

    renderAllProducts(basket);

}
// شغل العداد أول ما الصفحة تفتح
updateBasketCount();