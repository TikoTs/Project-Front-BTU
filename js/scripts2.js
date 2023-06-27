const allItemsArray = document.getElementById("shopping-items");
const cartItemsAmount = document.getElementById("cart-quantity");

function updateCartNumber() {
  const favoriteItems = JSON.parse(localStorage.getItem("@favoriteItems")) || [];
  const arrayItemsAmount = favoriteItems.length;
  cartItemsAmount.textContent = arrayItemsAmount;
}
updateCartNumber()

fetch('https://fakestoreapi.com/products')
  .then(res => {
    return res.json();
  })
  .then(itemsJsonData => {
    shoppingItems = itemsJsonData;

    allItemsArray.innerHTML = shoppingItems.map((item) => {
      return (
        `
        <div>  
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
              </div>
            </span>
          </div>
          <button class="add-to-basket" id="add-to-basket" data-item-id="${item.id}">Add to basket</button>
        </div>
        `
      )
    }).join('');

    const addToBasketButtons = document.querySelectorAll(".add-to-basket");
    addToBasketButtons.forEach(button => {
      button.disabled = false;
      button.addEventListener('click', (event) => {
        const itemId = event.target.getAttribute('data-item-id');
        addToBasket(itemId);
      });
    });
  })
  .then(() => {
    const items = document.querySelectorAll(".item");
    const addToBasket = document.getElementById("add-to-basket");
    items.forEach(item => {
      item.addEventListener('click', (event) => {
        if(item.className === "item"){
          item.className += "expanded";
        }
        else {
          item.className = "item"
        }
      });
    });
  })
  .catch(err => {
    console.log(err);
  });

function addToBasket(itemId) {
  let favoriteItems = JSON.parse(localStorage.getItem("@favoriteItems")) || [];

  const selectedItem = shoppingItems.find(item => item.id.toString() === itemId);

  if (selectedItem) {
    favoriteItems.push(selectedItem);
    localStorage.setItem("@favoriteItems", JSON.stringify(favoriteItems));
  }

  updateCartNumber()
}
