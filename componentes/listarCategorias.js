function listarCat(){
   
    let categorias = document.getElementById("categorias");
    console.log("listado de categorias")
    fetch("http://161.35.104.211:8000/categories/", {
          headers: {
            'accept': 'application/json',
            'Authorization': 'Bearer ' + 'elias'
          }
        })
        .then(res => res.json())
        .then(data => {
          categorias.innerHTML = data.map(category => 
           `<li>
              <a href="listado.html?categoria=${category.id}" 
                class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                ${category.title}
              </a>
            </li>
          `).join('');
        })
        .catch(err => console.error("Error cargando categorías:", err));
}
        
