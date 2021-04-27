var product = JSON.parse(localStorage.getItem("productsInCart")) || [];
sessionStorage.setItem("productsInCart", JSON.stringify(product));
localStorage.removeItem("productsInCart");

getItemFromLocalStorage();
getCustomerFromSessionStorage();

function getItemFromLocalStorage() {
  var product = JSON.parse(sessionStorage.getItem("productsInCart")) || [];
  product.forEach((product) => {
    createDataInCart(product.name, product.price, product.quantityInCart);
  });
  updateTotal();
}

function getCustomerFromSessionStorage() {
  let customer = JSON.parse(sessionStorage.getItem("Customer")) || [];
  customer.forEach((customer) => {
    createCustomerData(
      customer.firstName,
      customer.lastName,
      customer.adress,
      customer.zipCode
    );
  });
}

function createDataInCart(name, price, quantity) {
  document.getElementById("reciept").innerHTML += `
  <tbody>
  <tr class="table-active">
    <th scope="row">${name}</th>
    <td>${price} SEK</td>
    <td>
      <span>${quantity}</span>
    </td>
  </tr>
</tbody>`;
  updateTotal();
}

function createCustomerData(firstName, lastName, adress, zipcode) {
  document.getElementById("customer-info").innerHTML += `
    <tbody>
    <tr class="table-active">
      <td scope="row">${firstName}</td>
      <td>${lastName}</td>
      <td>${adress}</td>
      <td>
        <span>${zipcode}</span>
      </td>
    </tr>
  </tbody>`;
}

function updateTotal() {
  let total = 0;
  product.forEach((product) => {
    total += product.price * product.quantityInCart;
  });
  $("#total-amount").text(total.toFixed(2) + " SEK");
}
