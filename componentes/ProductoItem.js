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
          <div class="flex gap-2 mt-4">
            <a
              type="button"
              href="ficha.html?producto=${product.id}"
              class="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
            >
              Ver más
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
              class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Añadir al carrito
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
