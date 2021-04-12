$(document).ready(function () {
  var user = JSON.parse(sessionStorage.getItem("userToEdit"));
  console.log(user);

  document.forms["orderForm"]["fName"].value = user.firstname;
  document.forms["orderForm"]["lName"].value = user.lastname;
  document.forms["orderForm"]["adrs"].value = user.adress;
  document.forms["orderForm"]["email"].value = user.email;
  document.forms["orderForm"]["tNumber"].value = user.telefonnummer;
  document.forms["orderForm"]["city"].value = user.city;
  document.forms["orderForm"]["zip"].value = user.zipcode;
});
