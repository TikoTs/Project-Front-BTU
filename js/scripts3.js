const cartItems = document.getElementById("shopping-items");
const favoriteItems = JSON.parse(localStorage.getItem("@favoriteItems"));
// handling cart quantity
const cartItemsAmount = document.getElementById("cart-quantity");

function updateCartNumber() {
  const favoriteItems = JSON.parse(localStorage.getItem("@favoriteItems")) || [];
  const arrayItemsAmount = favoriteItems.length;
  cartItemsAmount.textContent = arrayItemsAmount;
}
updateCartNumber()

// const uniqueItemIds = new Set(favoriteItems.map((item) => item.id));

// const uniqueItems = Array.from(uniqueItemIds).map((itemId) =>
//   favoriteItems.find((item) => item.id === itemId)
// );

cartItems.innerHTML = favoriteItems
  .map((item) => {

    return `
    <div class="item" key="${item.id}" id="${'item' + item.id}">
      <span>
        <p class="p1">${item.title}</p>
        <p class="p2">${item.category}</p>
        <div>
          <img src="${item.image}" alt="error!!! reload">
        </div>
        <p class="p3" key="${item.id}">${item.description}</p>
      </span>
      <span>
        <p class="item-price">$${item.price}</p>
        <p class="amount">${item.rating.count} left</p>
        <div style="display: flex; align-items: center; justify-content: space-between">
          <span class="rate-container">
            <p class="rating">${item.rating.rate}</p>
            <img src="../Images/Star.png" class="star">
          </span>
          <button class="remove-from-basket" data-item-id="${item.id}" disabled="true">Remove from basket</button>
        </div>
      </span>
    </div>
    `;
  })
  .join('');


const removeFromBasketButtons = document.querySelectorAll(".remove-from-basket");
removeFromBasketButtons.forEach(button => {
  button.disabled = false;
  button.addEventListener('click', (event) => {
    const itemId = event.target.getAttribute('data-item-id');
    removeFromBasket(itemId);
  });
});

function removeFromBasket(itemId) {
  let updatedItems = JSON.parse(localStorage.getItem("@favoriteItems")) || [];
  const itemIndex = updatedItems.findIndex(item => item.id.toString() === itemId);

  if (itemIndex !== -1) {
    updatedItems.splice(itemIndex, 1);

    localStorage.setItem("@favoriteItems", JSON.stringify(updatedItems));

    cartItems.innerHTML = updatedItems.map((item) => {
      return (
        `
        <div class="item" key="${item.id}" id="${"item" + item.id}">
         
          <span>
            <p class="p1">${item.title}</p>
            <p class="p2">${item.category}</p>
            <div>
              <img src="${item.image}" alt="error!!! reload">
            </div>
            <p class="p3" key="${item.id}">${item.description}</p>
          </span>
          <span>
            <p class="item-price">${item.price}$</p>
            <p class="amount">${item.rating.count} left</p>
            <div style="display: flex; align-items: center; justify-content: space-between">
              <span class="rate-container">
                <p class="rating">${item.rating.rate}</p>
                <img src="../Images/Star.png" class="star">
              </span>
              <button class="remove-from-basket" data-item-id="${item.id}" >Remove from basket</button>
            </div>
          </span>
        </div>
        `
      )
    }).join('');
    updateCartNumber()
    const updatedRemoveFromBasketButtons = document.querySelectorAll(".remove-from-basket");
    updatedRemoveFromBasketButtons.forEach(updatedButton => {
      updatedButton.disabled = false;
      updatedButton.addEventListener('click', (event) => {
        const updatedItemId = event.target.getAttribute('data-item-id');
        removeFromBasket(updatedItemId);
        updateCartNumber()
      });
    });
  }
}


