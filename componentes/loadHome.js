let arrayProd = [];

function loadHome() {
  loadTags();
  loadProdHome();
}
function loadTags() {
  //Fetch de tags y renderizado en botones
  let btnTags = document.getElementById("botonesTags");

  //agrega boton para mostrar todos
  btnTags.innerHTML = `
              <button type="button" class="px-8 py-2.5 rounded-md cursor-pointer text-white hover:text-green-800 text-sm tracking-wider font-medium border-2 outline-0 border-green-700 bg-green-700 hover:bg-transparent transition-all duration-300 my-1.5" onclick="renderizarProductos(arrayProd)">Mostrar todos</button>
     
          `;
  //obtencion de tags y generacion de botones para cada uno
  fetch("http://161.35.104.211:8000/tags/", {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + "seba",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      btnTags.innerHTML += data
        .map(
          (tag) =>
            `
           <button type="button" class="px-8 py-2.5 rounded-md cursor-pointer text-white hover:text-green-800 text-sm tracking-wider font-medium border-2 outline-0 border-green-700 bg-green-700 hover:bg-transparent transition-all duration-300 my-1.5" onclick="filtrarPorTag(${tag.id})">${tag.title}</button>
     
          `
        )
        .join("");
    })
    .catch((err) => console.error("Error cargando categorías:", err));
}

//realiza el fetch de productos y los muestra con renderizarProductos
function loadProdHome() {
  fetch("http://161.35.104.211:8000/products/", {
    headers: {
      accept: "application/json",
      Authorization: "Bearer " + "seba",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      arrayProd = data;
      renderizarProductos(data);
    });
}
//filtrarPorTag usa un tagId para filtrar arrayProd(tiene todos los productos) y guarda esos productos
//filtrados en otro array, productosFiltrados.
//cada producto puede tener mas de un tag, asi que para cada producto, miramos el arreglo de tags que tenga
//y si coincide con tagId, devolvemos true porque cumple con la condicion de filtro
function filtrarPorTag(tagId) {
  let productosFiltrados = arrayProd.filter((prod) => {
    //prod.tags seria el arreglo que contiene los tags
    for (let i = 0; i < prod.tags.length; i++) {
      //console.log("Nombre de prod: ", prod.title, " tag:", prod.tags[i].id);
      if (prod.tags[i].id == tagId) return true;
    }
    return false;
  });
  //renderizar los que no fueron filtrados
  renderizarProductos(productosFiltrados);
}

//renderiza un array de productos que le pasemos como parametro,limpia antes de hacerlo. Usa product item
function renderizarProductos(arrayProd) {
  let productos = document.getElementById("productosHome");

  productos.innerHTML = "";
  if (arrayProd.length === 0) {
    productos.innerHTML = "<p>No hay productos para mostrar.</p>";
    return;
  }
  productos.innerHTML = arrayProd
    .map(
      (product) =>
        `
                <producto-item
                    id=${product.id}
                    title="${product.title}"
                    picture="${product.pictures[0]}"
                    description="${product.description}"
                    price="${Math.floor(product.price * 1000)}">
                </producto-item>
            `
    )
    .join("");
}
