let resource = "./db.json"


async function validate_product(form) {
    let $name = $("#product-name").val()
    let $producer = $("#product-producer").val()
    let $category = $("#product-category").val()
    let $quantity = $("#product-quantity").val()
    let $price = $("#product-price").val()

    const errorTxt = $("#alert")


    var responce = await fetch(resource)
    var data = await responce.json()

    const producer = data.company.find(item => item.name.toUpperCase() == $producer.toUpperCase())
    const category = data.category.find(item => item.name.toUpperCase() == $category.toUpperCase())

    if ($name == "" || $producer == ""|| $category == ""|| $quantity == ""|| $price == "") 
        errorTxt.text("* Fyll i alla fälten korrekt")

     else if(producer == undefined)
     errorTxt.text("* Tillverkaren finns inte i registret")

     else if(category == undefined)
     errorTxt.text("* Kategorin finns inte i registret")

     else if(isNaN($quantity))
     errorTxt.text("* Bara nummer i antal fältet")

     else if(isNaN($price))
     errorTxt.text("* Bara nummer i pris fältet")

     else if($quantity < 0)
     errorTxt.text("* Antal kan inte bli mindre än 0")

     else if($price <= 0)
     errorTxt.text("* Pris måste vara över 0")
     
    else form.submit()
    
  }


  function validateNotEmpty() {
    let $name = $("#product-name").val()
    let $producer = $("#product-producer").val()
    let $category = $("#product-category").val()
    let $quantity = $("#product-quantity").val()
    let $price = $("#product-price").val()

    if ($name == "" || $producer == ""|| $category == ""|| $quantity == ""|| $price == "")
      return false;
    else
      return true;
  
  }
  