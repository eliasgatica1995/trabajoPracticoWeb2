
function loadHome(){
    loadTags();
    loadProdHome();
}
function loadTags(){
    
   //Fetch de tags y renderizado en botones
    let btnTags = document.getElementById("botonesTags");
    fetch("http://161.35.104.211:8000/tags/", {
          headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + 'elias'
          }
        })
        .then(res => res.json())
        .then(data => {
          btnTags.innerHTML = data.map(tag => 
           `
              <a href="listado.html?categoria=${tag.id}" 
                class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                ${tag.title}
              </a>
            
          `).join('');
        })
        .catch(err => console.error("Error cargando categorías:", err));
}
function loadProdHome(){
    let productos = document.getElementById("productosHome");
      fetch("http://161.35.104.211:8000/products/", {
          headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + 'elias'
          }
        })
        .then(res => res.json())
        .then(data =>{
             productos.innerHTML = data.map(product => 
             
           `
             <producto-item
                id=${product.id}
                title="${product.title}"
                picture="http://161.35.104.211:8000${product.pictures[0]}"
                description="${product.description}"
                price="${Math.floor(product.price * 1000)}">
             </producto-item>

          `).join('');


          })

}

function renderizarProductos(productos){




}