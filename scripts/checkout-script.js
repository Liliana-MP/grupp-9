
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

/*
$(document).ready(function() {
  fetchUser();
  function fetchUser() {
      let $loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));
  
      let $fName = $loggedInUser.firstname;
      let $lName = $loggedInUser.lastname;
      let $adress = $loggedInUser.adress;
      let $zipcode = $loggedInUser.zipcode;
      // City ska fixas när vi har databas
      // let $cityId = $loggedInUser.cityid;

      document.forms["confirm-form"]["fName"].value = $fName;
      document.forms["confirm-form"]["lName"].value = $lName;
      document.forms["confirm-form"]["adrs"].value = $adress;
      document.forms["confirm-form"]["zip"].value = $zipcode;
      // City ska fixas när vi har databas
      // document.forms["confirm-form"]["city"].value = $cityId;
  
  
  
       }  
  });
  */

  let resource = "./db.json"
  const $alert = $("#alert");

function checkForm(form) {
    
    let $firstname = $("#fName").val();
    let $lastname = $("#lName").val();
    let $adress = $("#adrs").val();
    let $zipCode = $("#zip").val();

    if (
      $firstname == "" ||
      $lastname == "" ||
      $adress == "" ||
      $zipCode == "" 
      ) {
      $alert.text("* Fyll i alla fälten");
    }
    else if(isNaN($zipCode)){
      $alert.text("* Enbart siffror i postnummer fältet")
    } 
    else if(!isNaN($firstname)){
      $alert.text("* Enbart bokstäver i förnamn fältet")
    } 
    else if(!isNaN($lastname)){
      $alert.text("* Enbart bokstäver i efternamn fältet")
    } 
    else if($adress.length <= 2){
      $alert.text("* Adressen måste ha mer än 2 bokstäver")
    } 
    else {
      sendOrder(form)
    }
  }

 async function sendOrder(form){
    let $firstname = $("#fName").val();
    let $lastname = $("#lName").val();
    let $adress = $("#adrs").val();
    let $zipCode = $("#zip").val();
    let products = new Array()
    
    let $customer2 = JSON.stringify({
      firstName: $firstname,
      lastName: $lastname,
      city: $adress,
      zipCode: $zipCode
    })

    let $customer = new FormData()
    $customer.append("lastName", $lastname)
    $customer.append("firstName", $firstname)

    console.log($customer)


   const shit = await axios.post('http://localhost:8080/orders/add',
    {
      customer: $customer2
    },
      {headers:{"Content-Type" : "application/json"}})
    .then(res => {if(res.data == "Order added")
  console.log(res)
else
$alert.text("* Något gick fel")})
.catch(err => console.error(err))

  }