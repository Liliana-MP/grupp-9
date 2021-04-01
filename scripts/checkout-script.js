
var product = JSON.parse(localStorage.getItem("productsInCart")) || []

getItemFromLocalStorage();

function getItemFromLocalStorage() {
  product.forEach(product => {
    createDataInCart(product.name, product.price, product.quantityInCart, product.id)
  }); 
  updateTotal();
}

function createDataInCart(name, price, quantity, id) {
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
      let $firstname = JSON.parse(localStorage.getItem("firstname"));
      console.log($firstname);
  
      let $fName = $loggedInUser.firstname;
      let $lName = $loggedInUser.lastname;
      let $adress = $loggedInUser.adress;
      let $cityId = $loggedInUser.cityid;
      console.log($cityId);
  
         document.forms["orderForm"]["fName"].value = $fName;
         document.forms["orderForm"]["lName"].value = $lName;
         document.forms["orderForm"]["adrs"].value = $adress;
         document.forms["orderForm"]["city"].value = $cityId;
  
  
       }
  
       
      });