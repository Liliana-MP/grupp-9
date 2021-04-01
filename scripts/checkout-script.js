
var product = JSON.parse(localStorage.getItem("productsInCart")) || []

getItemFromLocalStorage();

function getItemFromLocalStorage() {
  product.forEach(product => {
    createDataInCart(product.name, product.price, product.quantityInCart)
  }); 
  updateTotal();
}

function createDataInCart(name, price, quantity) {
  document.getElementById("product-in-cart").innerHTML += `
  <tbody>
  <tr class="table-active">
    <th scope="row">${name}</th>
    <td>${price}</td>
    <td>
      <span>${quantity}</span>
    </td>
  </tr>
</tbody>`
updateTotal();
}

function updateTotal() {
  let total = 0
  product.forEach(product => {
    total += product.price * product.quantityInCart;
  });
  $("#total-amount").text(total.toFixed(2) + " SEK")
}


$(document).ready(function() {
  fetchUser();
  function fetchUser() {
      let $loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  
      let $fName = $loggedInUser.firstname;
      let $lName = $loggedInUser.lastname;
      let $adress = $loggedInUser.adress;
      let $zipcode = $loggedInUser.zipcode;
      let $cityId = $loggedInUser.cityid;

      document.forms["confirm-form"]["fName"].value = $fName;
      document.forms["confirm-form"]["lName"].value = $lName;
      document.forms["confirm-form"]["adrs"].value = $adress;
      document.forms["confirm-form"]["zip"].value = $zipcode;
      document.forms["confirm-form"]["city"].value = $cityId;
  
  
  
       }  
  });