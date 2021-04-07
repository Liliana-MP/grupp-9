let resource = "./db.json"

function openSidePanel(){
  document.getElementById("sidebar").style.width = "250px";
  document.getElementById("main").style.marginLeft = "auto";
}

function closeSidePanel(){
  document.getElementById("sidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "auto";
}


async function validate_product(form) {
    let $name = $("#product-name").val()
    let $producer = $("#product-producer").val()
    let $category = $("#product-category").val()
    let $quantity = $("#product-quantity").val()
    let $price = $("#product-price").val()

    const errorTxt = $("#alert-two")


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
     
    else {
      // funktion för att spara/ändra produkt i db
      form.submit()
    }
    
  }

 


  async function render_product(){
    let $product = $("#search-product").val()
    let $name = $("#product-name")
    let $producer = $("#product-producer")
    let $category = $("#product-category")
    let $quantity = $("#product-quantity")
    let $price = $("#product-price")

    const errorTxt = $("#alert-one")

    var responce = await fetch(resource)
    var data = await responce.json()

    if ($product == "")
    errorTxt.text("* Fyll i fältet")
    else {
      const product = data.product.find(item => item.name.toUpperCase() == $product.toUpperCase())
  
    if(product !== undefined){
      const producer = await data.company.find(item => item.id == product.companyid)
      const category = await data.category.find(item => item.id == product.categoryid)
        $name.val(product.name)
        $producer.val(producer.name)
        $category.val(category.name)
        $quantity.val(product.quantity)
        $price.val(product.price)
        errorTxt.text("")
    }
    else errorTxt.text("* Produkten finns inte")
  }

  }


  async function remove_product(form){
    let $product = $("#search-product")
    const errorTxt = $("#alert-one")
    var responce = await fetch(resource)
    var data = await responce.json()

    const product = data.product.find(item => item.name.toUpperCase() == $product.val().toUpperCase())
    if ($product.val() == "")
    errorTxt.text("* Fyll i fältet")
    else if (product == undefined)
     errorTxt.text("* Produkten finns inte")
    else {
       alert("borta")
       $(form).parent().submit()
    // tabort produkt från db
    
  }
  }
  
