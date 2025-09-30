import { LitElement, html } from "lit";
import "./ProductoItem";

class ProductosList extends LitElement {
  static properties = {
    apiUrl: { type: String, attribute: "api-url" },
    apiToken: { type: String, attribute: "api-token" },
    products: { type: Array, state: true },
    error: { type: Object, state: true },
    category: { type: String, attribute: "category" },
  };

  constructor() {
    super();
    this.products = [];
    this.error = null;
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadProducts();
  }

  loadProducts() {
    if (this.apiUrl && this.apiToken) {
      fetch(this.apiUrl + "/products/", {
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + this.apiToken,
        },
      })
        .then((res) => res.json())
        .then((response) => {
          let products = response || [];

          if (this.category) {
            products = products.filter(
              (p) => p.category_id == Number(this.category)
            );
          }

          this.products = products;
        })
        .catch((err) => {
          this.error = err;
        });
    }
  }

  createRenderRoot() {
    return this;
  }

  render() {
    if (this.error) {
      return this.renderError(this.error);
    }

    return html`
      ${this.products.map((product) => {
        const price = Math.floor(product.price * 1000);
        return html`
          <producto-item
            id=${product.id}
            title="${product.title}"
            picture="${product.pictures[0]}"
            description="${product.description}"
            price="${price}"
            apiUrl="${this.apiUrl}"
          >
          </producto-item>
        `;
      })}
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

customElements.define("productos-list", ProductosList);
