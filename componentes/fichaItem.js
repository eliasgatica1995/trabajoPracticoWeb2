import { LitElement, html, css } from "lit";
import { state } from "lit/decorators.js";
export class ProductoFicha extends LitElement {
  // se muestra como bloque.
  static styles = css`
    :host {
      display: block;
    }
  `;

  static styles = css`
    @import "/style.css";
  `;

  static properties = {
    //api conexion
    apiUrl: { type: String, attribute: "api-url" },
    apiToken: { type: String, attribute: "api-token" },

    //producto
    titulo: { type: String, state: true },
    imagen: { type: String, state: true },
    descripcion: { type: String, state: true },
    precio: { type: Number, state: true },
    categoria: { type: Object, state: true },
    tags: { type: Array, state: true },

    //carrito
    error: { type: String },
  };

  constructor() {
    super();
    this.titulo = "Producto";
    this.imagen = "";
    this.descripcion = "Descripción del producto";
    this.precio = 0;
  }

  createRenderRoot() {
    return this;
  }

  connectedCallback() {
    super.connectedCallback();

    const params = new URLSearchParams(window.location.search);
    const id = params.get("producto");

    if (this.apiUrl && this.apiToken) {
      fetch(this.apiUrl + "/products/" + id + "/", {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + this.apiToken,
        },
      })
        .then((res) => res.json())
        .then((item) => {
          this.titulo = item.title;
          this.imagen = item.pictures[0];
          this.descripcion = item.description;
          this.precio = item.price;
          this.tags = item.tags;
          this.categoria = item.category;

          // actualización del componente
          this.requestUpdate();
        })
        .catch((err) => {
          this.error = err;
        });
    } else {
      this.error = "Faltan parámetros obligatorios: api-url y api-token";
    }
  }

  getProductoId() {
    return this.id;
  }
  getProductoData() {
    return {
      id: this.id,
      title: this.titulo,
      price: Math.floor(this.precio * 1000),
      description: this.descripcion,
      picture: this.imagen,
      categoria: this.categoria,
      tags: this.tags,
    };
  }

  renderError(error) {
    console.log("error:" + error);
    return html` <div class="text-red-500">${error}</div> `;
  }

  getCarrito() {
    return this.carrito;
  }

  render() {
    if (this.error) {
      return this.renderError(this.error);
    }
    const carrito = document.getElementById("carrito");
    const body = document.querySelector("body");

    this.price = Math.floor(this.precio * 1000);

    return html`
      <!-- Contenido Head ficha -->

      <div
        class="bg-white rounded-lg shadow-lg overflow-hidden max-w-xl mx-auto"
      >
        <div class="relative">
          <img
            src="${this.apiUrl + this.categoria.picture}"
            alt="${this.categoria.title}"
            class="w-full h-32 object-cover opacity-80"
          />
          <div
            class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center"
          >
            <h3 class="text-white text-lg font-semibold">
              ${this.categoria.description}
            </h3>
          </div>
        </div>

        <!-- Contenido producto ficha -->

        <div
          class="bg-white rounded-lg shadow p-6 md:flex gap-6 max-w-4xl mx-auto"
        >
          <img
            class="w-full md:w-1/2 h-64 my-2 object-cover rounded"
            src="${this.apiUrl + this.imagen}"
            alt="${this.titulo}"
          />
          <div class="md:flex-1 mt-6 md:mt-0">
            <h1 class="text-2xl font-bold">${this.titulo}</h1>

            <!-- estrellas y reseñas estaticas -->
            <div class="mt-2 text-gray-600 flex items-center gap-2">
              <span href="" class="text-green-600 font-semibold"
                >★★★★☆ 4.9
              </span>
              <a href="#">· 120 reseñas</a>
            </div>

            <div class="mt-4 text-3xl font-extrabold">$${this.price}</div>
            <p class="mt-4 text-gray-700">${this.descripcion}</p>

            <div class="mt-6 flex items-center gap-3">
              <span class="text-sm text-gray-600">Categoría:</span>
              <span class="text-sm font-medium">${this.categoria.title}</span>
            </div>

            <!-- Contenido Tags Ficha -->

            ${this.tags?.length
              ? html`
                  <div class="mt-4 flex gap-2 flex-wrap">
                    ${this.tags.map((tag) => {
                      const styles = {
                        Promoción: "bg-red-100 text-red-800",
                        Orgánico: "bg-green-100 text-green-800",
                        "Producto local": "bg-blue-100 text-blue-800",
                      };
                      const style =
                        styles[tag.title] || "bg-gray-100 text-gray-800";
                      return html`
                        <span class="px-2 py-1 ${style} text-xs rounded"
                          >${tag.title}</span
                        >
                      `;
                    })}
                  </div>
                `
              : ""}

            <!-- Boton carrito y contador con +-  -->
            <div class="mt-6 flex items-center gap-3">
              <div class="flex items-center border rounded">
                <button
                  @click=${() => carrito.restarCarrito(this.getProductoId())}
                  class="px-3 text-xl text-gray-600 hover:text-black"
                >
                  −
                </button>
                <div class="px-4 font-medium">
                  ${carrito.getProductoCantidad(this.getProductoId())}
                </div>
                <button
                  @click=${() =>
                    carrito.agregarAlCarrito(this.getProductoData())}
                  class="px-3 text-xl text-gray-600 hover:text-black"
                >
                  +
                </button>
              </div>
              <button
                class="ml-auto bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded font-medium"
                @click=${() => carrito.agregarAlCarrito(this.getProductoData())}
              >
                Añadir al carrito
              </button>
            </div>
          </div>
        </div>
      </div>
    `;
  }
}

customElements.define("producto-ficha", ProductoFicha);
