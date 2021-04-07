$(document).ready(function() {
  
renderUser();

editUser();
        });

        function editUser(userId){
          const userFromArray = JSON.parse(localStorage.getItem("userDb"));
          userFromArray.forEach(e =>{
            // console.log(userId);
            if (e.id === userId){
              sessionStorage.setItem("userToEdit", e.JSON.stringify());
              console.log("funkar")
            }
          });
        }

        function renderUser(){
            let userArray = [];
            // console.log("hej")
            fetch("db.json").then(function(response) {
            
              if (response.status !== 200){
                console.log("Något gick fel. Status kod: " + response.status);
                return;
              }
              
                response.json().then(function(data){
                  let userFromDb = [];
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

                    $("#table-customer").append(
                        `<tr onclick="editUser(${element.id})">
                        <th scope="row">${element.id}</th>
                        <td>${element.firstname}</td>
                        <td>${element.lastname}</td>
                        <td>${element.email}</td>
                        <td>${element.phonenumber}</td>
                        <td>${element.adress}</td>
                        <td>${element.zipcode}</td>
                        <td>${element.cityid}</td>
                      </tr>`

                        );
                    

                    userObjects = { firstname: $firstname, lastname: $lastname, adress: $adress, zipcode: $zip, city: $cityId, email: $email, telefonnummer: $tNumber };

                    userFromDb.push(userObjects);
                  localStorage.setItem("userDb", JSON.stringify(userFromDb));

                
            
                  var getUser= JSON.parse(localStorage.getItem("userDb"));
     
                    })
           

            
                })
            })
            
            }