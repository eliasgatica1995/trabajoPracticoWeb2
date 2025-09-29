function listarProductos(category) {
  if (!category) {
    const params = new URLSearchParams(window.location.search);
    category = params.get("categoria") || "";
  }
  let products = document.getElementById("productosCat");
  products.innerHTML = `
                 <productos-list 
                    class="grid grid-cols-2 md:gr id-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-6"
                    api-url="http://161.35.104.211:8000"

                    api-token="seba"
                    category="${category}"
                    >
                </productos-list>
            `;
}
document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const categoriaId = params.get("categoria") || "";
  listarProductos(categoriaId);
});
