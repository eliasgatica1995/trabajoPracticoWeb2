import { LitElement, html, css } from "lit";
import { state } from "lit/decorators.js";

export class CarritoCompra extends LitElement {
  static styles = css`
    @import "/style.css";
  `;
  static properties = {
    cantidad: { type: Number, state: true },
    items: { type: Array, state: true },
    total: { type: Number, state: true },

    error: { type: String },
    visible: {
      type: Boolean,
      state: true,
      reflect: true,
      attribute: "visible",
    },
  };

  constructor() {
    super();
    this.cantidad = 1;
    this.items = [];
    this.total = 0;
    this.visible = false;
  }
  createRenderRoot() {
    return this;
  }
  connectedCallback() {
    super.connectedCallback();
    const carrito = localStorage.getItem("carrito");
    if (carrito) {
      this.items = JSON.parse(carrito);
    }
    this.calcularTotal();
  }

  renderError(error) {
    return html` <div class="text-red-500">${error}</div> `;
  }

  toggleCarrito() {
    this.visible = !this.visible;
  }

  // se ejecuta cada vez que se agrega o elimina un item del carrito.
  calcularTotal() {
    this.total = this.items.reduce(
      (cont, item) => cont + item.price * item.cantidad,
      0 // cantidad inciial del contador.
    );
  }

  agregarAlCarrito(producto) {
    const productoExistente = this.items.findIndex(
      (item) => item.id === producto.id
    );
    // chequeo si ya existe el producto en el carrito.
    if (productoExistente !== -1) {
      this.items[productoExistente].cantidad++;
    } else {
      const nuevoItem = {
        ...producto,
        cantidad: 1,
      };

      this.items.push(nuevoItem);
    }

    console.log("item agregado." + this.items);

    this.calcularTotal();
    localStorage.setItem("carrito", JSON.stringify(this.items));
  }

  eliminarDelCarrito(idProducto) {
    //mantiene todos los productos menos el que coincide con idProducto.
    this.items = this.items.filter((item) => {
      return item.id !== idProducto;
    });
    // productyo existente es el indice del producto en el array.
    const productoExistente = this.items.findIndex(
      (producto) => producto.id === idProducto
    );
    if (productoExistente !== -1) {
      this.items[productoExistente].cantidad--;
      if (this.items[productoExistente].cantidad <= 0) {
        //elimina el producto del carrito utilizando el indice.
        this.items.splice(productoExistente, 1);
      }
    }
    this.calcularTotal();
    localStorage.setItem("carrito", JSON.stringify(this.items));
  }

  vaciarCarrito() {
    this.items = [];
    this.total = 0;
    localStorage.removeItem("carrito");
  }

  render() {
    return html`
      <button
        ${console.log(this.visible)}
        @click="${this.toggleCarrito}"
        class="fixed bottom-5 right-5 z-50 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-full shadow-lg transition"
      >
        🛒
      </button>

      <div
        class=${`
    fixed bottom-20 right-5 z-40 w-80 max-h-[400px] overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-lg p-4
    transition-all duration-300 ease-in-out
    ${
      this.visible
        ? "opacity-100 scale-100"
        : "opacity-0 scale-95 pointer-events-none"
    }
  `}
      >
        <!-- contenido del carrito -->
        <div class="carrito">
          <h2>Carrito de Compras</h2>
          <ul>
            ${this.items.map(
              (item) => html`
                <li>
                  <span>${item.title}</span>
                  <span>${item.price}</span>
                  <span>${item.cantidad}</span>
                  <button @click=${() => this.eliminarDelCarrito(item.id)}>
                    Eliminar
                  </button>
                </li>
              `
            )}
          </ul>
          <p>Total: ${this.total}</p>
          <button @click=${this.vaciarCarrito}>Vaciar Carrito</button>
        </div>
      </div>
    `;
  }
}

customElements.define("carrito-compra", CarritoCompra);
