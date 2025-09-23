function listarCat(){

    let products = document.getElementById("categorias");
    console.log("listado de categorias")
   fetch("http://161.35.104.211:8000/categories/", {
        headers: {
          'accept': 'application/json',
          'Authorization': 'Bearer ' + 'elias'
        }
      })
        .then(res => res.json())
        .then(producs => console.log(producs))
    /*
    products.innerHTML=`
                <categories-list
                    api-url="http://161.35.104.211:8000/categories/"
                    api-token="elias"
                >
                
                </categories-list>
            `;
 
*/

}