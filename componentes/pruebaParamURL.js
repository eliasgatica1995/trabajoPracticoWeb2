window.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const categoriaId = params.get("categoria");

   fetch("http://161.35.104.211:8000/products",{
        headers: {
          'accept': 'application/json',
          'Authorization': 'Bearer ' + 'elias'
        }
      })
  .then(res => res.json())
  .then(productos => {
    const filtrados = productos.filter(p => p.category.id == categoriaId);
    console.log(filtrados);
  });

});
