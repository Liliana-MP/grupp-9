let total = 0

fetch("db.json").then(function(response) {
   
    response.json().then(function(data){
        data.product.forEach(element => {
            
            document.getElementById("product-in-cart").innerHTML += ` <tbody>
            <tr class="table-active">
              <th scope="row">${element.name}</th>
              <td>${element.price}</td>
              <td>
                <button type="button" class="btn btn-outline-secondary btn-sm">
                  -
                </button>
                1
                <button type="button" class="btn btn-outline-secondary btn-sm">
                  +
                </button>
              </td>
              <td>
                <button type="button" class="btn btn-outline-danger">
                  Ta bort
                </button>
              </td>
            </tr>
          </tbody>`

            total = total + parseFloat(element.price)
            document.getElementById("test").innerHTML = `${total} SEK`
         
        })
    })
})