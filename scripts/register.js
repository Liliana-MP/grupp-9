function checkForm(form) {
    let $firstname = $("#firstname").val();
    let $lastname = $("#lastname").val();
    let $adress = $("#adress").val();
    let $postNr = $("#postNr").val();
    let $ort = $("#ort").val();
    let $mail = $("#mail").val();
    let $password = $("#password").val();

    if (
      $firstname == "" ||
      $lastname == "" ||
      $adress == "" ||
      $postNr == "" ||
      $ort == "" ||
      $mail == "" ||
      $password == ""
    ) {
      $("#alert").text("* Fyll i alla fälten");
    } 
    else if(!validatePassword($password)){
      $("#alert").text("* Lösenord måste innehålla minst en symbol, en siffra och en stor bokstav och minst 8 tecken")
    }
    else {
        const registeredUser = { firstname: $firstname, lastname: $lastname, adress: $adress, zipcode: $postNr, city: $ort, email: $mail, password: $password };
        localStorage.setItem("registeredUser", JSON.stringify(registeredUser));
        const getMyObject= JSON.parse(localStorage.getItem("registeredUser"));
        console.log(getMyObject);
      form.submit();
    }
  }

  function validatePassword(input) 
{ 
const paswd=  /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
if(paswd.test(input)) 
{ 
return true;
}
else
{ 
return false;
}
}  
