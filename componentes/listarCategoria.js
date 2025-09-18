function listarCategoria(category){

    let products = document.getElementById("productosCat");
    products.innerHTML=`
                 <productos-list 
                    class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8 gap-6"
                    api-url="http://161.35.104.211:8000/products/"
                    api-token="elias"
                    category="${category}"
                    >
                </productos-list>
            `;
}