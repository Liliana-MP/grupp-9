var product = JSON.parse(localStorage.getItem("productsInCart")) || []

getItemFromLocalStorage();

function getItemFromLocalStorage() {
  product.forEach(product => {
    createDataInCart(product.name, product.price, product.quantityInCart, product.id)
  }); 
  $(".remove-btn").click(removeProduct)
  $(".decrease-btn").click(decreaseQuantity)
  $(".increase-btn").click(increaseQuantity)
  updateTotal();
}

function createDataInCart(name, price, quantity, id) {
  document.getElementById("product-in-cart").innerHTML += `
  <tbody>
  <tr class="table-active">
    <th scope="row">${name}</th>
    <td>${price}</td>
    <td>
      <button type="button" class="btn btn-outline-secondary btn-sm decrease-btn" id="${id}">
        -
      </button>
      <span>${quantity}</span>
      <button type="button" class="btn btn-outline-secondary btn-sm increase-btn" id="${id}">
        +
      </button>
    </td>
    <td>
      <button type="button" class="btn btn-outline-danger remove-btn" id="${id}">
        Ta bort
      </button>
    </td>
  </tr>
</tbody>`
}

function updateTotal() {
  let total = 0
  product.forEach(product => {
    total += product.price * product.quantityInCart;
  });
  $("#total-amount").text(total.toFixed(2) + " SEK")
}

function removeProduct() {
    $(this).parent().parent().parent().remove();
    product = product.filter(item => item.id != this.id)
    saveCart()
    updateTotal()
}

function decreaseQuantity() {
  var temp = product.find(item => item.id == this.id)
  if (temp.quantityInCart > 1) {
    temp.quantityInCart--
    $(this).parent().children("span").text(temp.quantityInCart)
    updateTotal()
    saveCart()
  }
  else {
    temp.quantityInCart = 1
  }
}

function increaseQuantity() {
  var temp = product.find(item => item.id == this.id)
  temp.quantityInCart++
  $(this).parent().children("span").text(temp.quantityInCart)
  updateTotal()
  saveCart()
}

function saveCart() {
  localStorage.setItem("productsInCart", JSON.stringify(product))
}