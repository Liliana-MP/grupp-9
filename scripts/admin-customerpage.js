$(document).ready(function() {
  
renderUser();



        });

        function renderUser(){
            let userArray = [];
            // console.log("hej")
            fetch("db.json").then(function(response) {
            
              if (response.status !== 200){
                console.log("Något gick fel. Status kod: " + response.status);
                return;
              }
              
                response.json().then(function(data){
                  
                  // Renderar ut produkter
                    data.user.forEach(element => {
                        
                    $id = element.id;
                    $firstname = element.firstname;
                    $lastname = element.lastname;
                    $email = element.email;
                    $tNumber = element.phonenumber;
                    $adress = element.address;
                    $zip = element.zipcode;
                    $cityId = element.city;

                
                    // console.log($id);
                    //   if(getCategoryId == 0){
                    //     product(element)
                    // }else{
                     
                    //   if(getCategoryId == element.categoryid)
                    //   product(element)
                    // } 
                    // console.log(element)
                    })
                //     sessionStorage.setItem("products",JSON.stringify(userArray))
                //     sessionStorage.setItem("categorys", JSON.stringify(data.category))
                
                //   renderCategory(data)


                  const userFromDb = { firstname: $firstname, lastname: $lastname, adress: $adress, zipcode: $zip, city: $cityId, email: $email, telefonnummer: $tNumber };
                  localStorage.setItem("userDb", JSON.stringify(userFromDb));
                
                  const getUser= JSON.parse(localStorage.getItem("userDb"));
                  console.log(getUser);
            
                })
            })
            }