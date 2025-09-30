import { LitElement, html, css } from "lit";

class ProductoItem extends LitElement {
  static properties = {
    id: { type: Number },
    title: { type: String },
    picture: { type: String },
    description: { type: String },
    price: { type: Number },
  };

  constructor() {
    super();
    this.id = 0;
    this.title = "Título del Producto";
    this.picture = "https://via.placeholder.com/150";
    this.description = "Descripción del producto";
    this.price = 0;
  }

  static styles = css`
    @import "/style.css";
  `;

  createRenderRoot() {
    return this;
  }

  render() {
    //en el boton de añadir al carrito, se usa hidden md:inline para no mostrar el mensaje "Añadir a carrito" hasta una pantalla media
    //en pantallas moviles, se muestra un icono (block md:hidden), cuando se utiliza una pantalla media, cambia al mensaje
    const product = {
      id: this.id,
      title: this.title,
      picture: this.picture,
      description: this.description,
      price: this.price,
    };

    return html`
      <div class="max-w-96 shadow-lg bg-gray-100  h-full flex flex-col">
        <a href="ficha.html?producto=${product.id}">
          <img
            src="${product.picture}"
            alt="${product.title}"
            class="aspect-square w-full mix-blend-multiply brightness-110"
          />
        </a>
        <div class="flex-1 p-3 bg-white flex flex-col justify-between">
          <h2 class="text-xl font-bold mb-1">${product.title}</h2>
          <p class="text-gray-600 mb-2">${product.description}</p>
          <div class="text-2xl font-semibold text-blue-600 text-center">
            $${product.price}
          </div>
          <div class="flex gap-2 mt-4 justify-center align-middle">
            <a
              type="button"
              href="ficha.html?producto=${product.id}"
              class="h-10 w-10 flex items-center justify-center rounded-md cursor-pointer text-white hover:text-green-800 border-2 border-green-700 bg-green-700 hover:bg-transparent transition-all duration-300"
            >
               <svg class="h-6 w-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd" clip-rule="evenodd" d="M14.795 13.408l5.204 5.204a1 1 0 01-1.414 1.414l-5.204-5.204a7.5 7.5 0 111.414-1.414zM8.5 14A5.5 5.5 0 103 8.5 5.506 5.506 0 008.5 14z" />
                      </svg> 
            </a>
          
            <button
                type="button"
                @click=${() => {
                  this.dispatchEvent(
                    new CustomEvent("agregar-carrito", {
                      detail: product,
                      bubbles: true,
                      composed: true,
                    })
                  );
                }}
                class="h-10 w-10 md:h-10 md:w-40 flex items-center justify-center rounded-md cursor-pointer text-white hover:text-green-800 border-2 border-green-700 bg-green-700 hover:bg-transparent transition-all duration-300"
              >
              
              <span class="hidden md:inline">Añadir al carrito</span>
              <svg class="h-6 w-6 block md:hidden text" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M10.39 11.5C10.39 11.09 10.73 10.75 11.14 10.75H12.39V9.5C12.39 9.09 12.73 8.75 13.14 8.75C13.55 8.75 13.89 9.09 13.89 9.5V10.75H15.14C15.55 10.75 15.89 11.09 15.89 11.5C15.89 11.91 15.55 12.25 15.14 12.25H13.89V13.5C13.89 13.91 13.55 14.25 13.14 14.25C12.73 14.25 12.39 13.91 12.39 13.5V12.25H11.14C10.73 12.25 10.39 11.91 10.39 11.5ZM11.25 18.75C11.25 19.58 10.58 20.25 9.75 20.25C8.92 20.25 8.25 19.58 8.25 18.75C8.25 17.92 8.92 17.25 9.75 17.25C10.58 17.25 11.25 17.92 11.25 18.75ZM17.75 18.75C17.75 19.58 17.08 20.25 16.25 20.25C15.42 20.25 14.75 19.58 14.75 18.75C14.75 17.92 15.42 17.25 16.25 17.25C17.08 17.25 17.75 17.92 17.75 18.75ZM20.73 7.68L18.73 15.68C18.65 16.01 18.35 16.25 18 16.25H8C7.64 16.25 7.33 15.99 7.26 15.63L5.37 5.25H4C3.59 5.25 3.25 4.91 3.25 4.5C3.25 4.09 3.59 3.75 4 3.75H6C6.36 3.75 6.67 4.01 6.74 4.37L7.17 6.75H20C20.23 6.75 20.45 6.86 20.59 7.04C20.73 7.22 20.78 7.46 20.73 7.68ZM19.04 8.25H7.44L8.62 14.75H17.41L19.03 8.25H19.04Z" fill="currentColor"></path> </g>
              </svg>
            
            </button>
          </div>
        </div>
      </div>
    `;
  }

  renderError(error) {
    return html`
      <div class="text-red-600 font-semibold">
        Error loading product: ${error.message}
      </div>
    `;
  }
}

customElements.define("producto-item", ProductoItem);
