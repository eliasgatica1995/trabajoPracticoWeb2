function listarCategorias(){

    let products = document.getElementById("categorias");
    products.innerHTML=`
                <categories-list
                    api-url="http://161.35.104.211:8000/categories/"
                    api-token="elias"
                >
                </categories-list>
            `;
}