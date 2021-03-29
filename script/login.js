let resource = "./db.json"

function checkIfUserExist(){
  console.log(validateEmailBox());
  console.log(validateNotEmpty());
  if(validateNotEmpty()){
  if(validateEmailBox()){ 
    fetch(resource)
    .then(resp => resp.json())
    .then(data => data.User.forEach(element => {
      console.log(element.email);
      if (checkIfUserExist1(element)){
        alert("loggas in bre")
        return true
      }
      
    }))
    .catch(err => console.error(err))
    
  }}
  else {
    alert("failersa")
  return false}
}

function checkIfUserExist1(user){
  let inputEmail = $("#e-mail").val()
  if (inputEmail == user.email)
  return true;
  else
  return false;
}

  
   
function validateNotEmpty(){
  let inputEmail = $("#e-mail").val()
  let inputPassword = $("#password").val() 

  if(inputPassword == "" || inputEmail == ""){
  return false;
}else{
  return true;
}
}

function validateEmailBox(){
    let inputEmail = $("#e-mail").val()

    let pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;


    if(inputEmail.match(pattern)){
      return true;
    } else {
      return (false);
    }
  }
