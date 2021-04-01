let resource = "./db.json"
const $alert = $("#alert");

async function checkForm(form) {
  var responce = await fetch(resource)
  var data = await responce.json()
    
    let $firstname = $("#firstname").val();
    let $lastname = $("#lastname").val();
    let $adress = $("#adress").val();
    let $zipCode = $("#zipCode").val();
    let $county = $("#county").val();
    let $mail = $("#mail").val();
    let $password = $("#password").val();
    let user = data.user.find(item => item.email === $mail)

    if (
      $firstname == "" ||
      $lastname == "" ||
      $adress == "" ||
      $zipCode == "" ||
      $county == "" ||
      $mail == "" ||
      $password == ""
    ) {
      $alert.text("* Fyll i alla fälten");
    }
    else if(isNaN($zipCode)){
      $alert.text("* Enbart siffror i postnummer fältet")
    } 
    else if(!validatePassword($password)){
      $alert.text("* Lösenord måste innehålla minst en symbol, en siffra och en stor bokstav och minst 8 tecken")
    }
    else if(!validateEmailBox($mail)){
      $alert.text("* Felaktig e-post address")
    }
    else if(user !== undefined){
      $alert.text("* Finns redan ett konto med den e-post addressen")
    }
    else {
        const registeredUser = { firstname: $firstname, lastname: $lastname, adress: $adress, zipcode: $zipCode, city: $county, email: $mail, password: $password };
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
else return false;
}  

function validateEmailBox(inputEmail) {
  let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;

  if (pattern.test(inputEmail)) {
    return true;
  } else {
    return (false);
  }
}