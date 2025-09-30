import { LitElement, html, css } from "lit";
import { state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
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

  // abre o cierra carrito
  toggleCarrito() {
    this.visible = !this.visible;
    const main = document.getElementById("main");
    const carro = document.getElementById("carrito");
    if (this.visible) {
      main.classList.add("blur-xs");
      carro.classList.remove("blur-xs");
    } else {
      main.classList.remove("blur-xs");
    }
  }

  // se ejecuta cada vez que se agrega o elimina un item del carrito.
  calcularTotal() {
    this.total = this.items.reduce(
      (cont, item) => cont + item.price * item.cantidad,
      0 // cantidad inciial del contador.
    );
  }

  // se ejecuta cada vez que se agrega un item al carrito.
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

    this.calcularTotal();
    localStorage.setItem("carrito", JSON.stringify(this.items));
  }

  // se ejecuta cada vez que se elimina o resta un item del carrito.
  restarCarrito(idProducto) {
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

  // vacia todo el carrito.
  vaciarCarrito() {
    this.items = [];
    this.total = 0;
    localStorage.removeItem("carrito");
  }

  // elimina un producto del carrito sin importar la cantidad.
  eliminarCarrito(idProducto) {
    //mantiene todos los productos menos el que coincide con idProducto.
    this.items = this.items.filter((item) => {
      return item.id !== idProducto;
    });
    this.calcularTotal();
    localStorage.setItem("carrito", JSON.stringify(this.items));
  }

  //retorna el total de items en el carrito (suma de cantidades)
  calcularCantidad() {
    // contador de items en el carrito (suma de cantidades)
    return this.items.reduce((cont, item) => cont + item.cantidad, 0);
  }

  //calcula el subtotal de un item en particular.
  calcularSubtotal(id) {
    const item = this.items.find((item) => item.id === id);
    return item ? item.price * item.cantidad : 0;
  }

  //calcula la cantidad de un item en particular.
  getProductoCantidad(id) {
    const item = this.items.find((item) => item.id === id);
    return item ? item.cantidad : 0;
  }

  render() {
    return html`
      <button
        @click=${this.toggleCarrito}
        class=${classMap({
          " bg-amber-500 z-40 hover:bg-amber-600 text-black px-6 py-2 rounded font-medium": true,
          hidden: this.visible,
          block: !this.visible,
        })}
      >
      🛒
      <span class="hidden md:inline"> Carrito</span>    
         (${this.calcularCantidad()})
      </button>

      <aside
        class=${classMap({
          "fixed top-0 right-0 h-full bg-white shadow-lg z-50 transition-transform duration-800 ease-in-out": true,
          hidden: !this.visible,
          block: this.visible,
          "flex flex-col": true,
        })}
      >
        <div fixed class="p-4 border-b flex justify-between items-center">
          <h2 class="text-lg font-semibold">Tu carrito</h2>
          <button
            @click=${this.toggleCarrito}
            class="text-gray-500 hover:text-black"
          >
            <a href="#">✖</a>
          </button>
        </div>

        <div class="flex-1 overflow-y-auto p-4 space-y-4">
          ${this.items.length === 0
            ? html`<p class="text-gray-500">El carrito está vacío.</p>`
            : this.items.map(
                (item) => html`
                  <div class="flex items-center justify-between">
                    <div>
                      <img
                        src="${item.picture}"
                        alt="${item.title}"
                        class="w-16 h-16 object-cover"
                      />

                      <a class="font-medium">${item.title}</a>
                      <p class="text-sm text-gray-500">$${item.price}</p>

                      <div class="flex items-center space-x-1">
                        <p class="text-sm text-gray-500">x${item.cantidad}</p>
                        <button
                          @click=${() => this.restarCarrito(item.id)}
                          class="bg-amber-500  py-1 px-2 rounded hover:bg-amber-600 text-black text-xs"
                        >
                          -
                        </button>

                        <button
                          @click=${() => this.agregarAlCarrito(item)}
                          class="  bg-green-600  py-1 px-2 rounded hover:bg-green-700 text-black text-xs"
                        >
                          +
                        </button>
                      </div>
                    </div>
                    <p class="font-semibold">
                      $${this.calcularSubtotal(item.id)}
                    </p>
                  </div>

                  <button
                    @click=${() => this.eliminarCarrito(item.id)}
                    class="bg-red-600 text-white py-1 px-2 rounded hover:bg-red-700  text-xs"
                  >
                    Eliminar Item
                  </button>
                `
              )}
        </div>

        <div class="p-4 border-t">
          <p class="text-lg font-semibold mb-4">
            Total: $${this.total.toFixed(2)}
          </p>
          <button
            @click=${this.vaciarCarrito}
            class="w-1/2 bg-amber-500 text-black py-2 rounded hover:bg-amber-600"
          >
            Vaciar carrito
          </button>

          <button
            class="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          >
            Finalizar compra
          </button>
        </div>
      </aside>
    `;
  }
}

customElements.define("carrito-compra", CarritoCompra);
