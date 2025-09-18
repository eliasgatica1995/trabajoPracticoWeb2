import { LitElement, html } from 'lit';
import './ProductoItem';

class ProductosList extends LitElement {
  static properties = {
    apiUrl: { type: String, attribute: 'api-url' },
    apiToken: { type: String, attribute: 'api-token' },
    allProducts: { type: Array, state: true },
    products: { type: Array, state: true },
    error: { type: Object, state: true },
    category: { type: String, attribute: 'category' }
  };

  constructor() {
    super();
    this.allProducts = [];
    this.products = [];
    this.error = null;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.apiUrl && this.apiToken) {
      fetch(this.apiUrl, {
        headers: {
          'accept': 'application/json',
          'Authorization': 'Bearer ' + this.apiToken
        }
      })
        .then(res => res.json())
        .then(response => {
            const products = response;

          if (!products) {
            this.allProducts = [];
            this.products = [];
            return;
          }

          this.allProducts = products;
          this.applyFilter();
        })
        .catch(err => {
          this.error = err;
        });
    }
  }

  updated(changedProps) {
    if (changedProps.has('category')) {
      this.applyFilter();
    }
  }

  applyFilter() {
    if (!this.category) {
      this.products = this.allProducts;
    } else {
      this.products = this.allProducts.filter(
        p =>
          p.category &&
          p.category.title.toLowerCase() === this.category.toLowerCase()
      );
    }
  }

  createRenderRoot() {
    return this; // usa el DOM global
  }

  render() {
    if (this.error) {
      return this.renderError(this.error);
    }

    return html`
      ${this.products.map(product => {
        const price = Math.floor(product.price * 1000);
        return html`
          <producto-item
            title="${product.title}"
            picture="http://161.35.104.211:8000${product.pictures[0]}"
            description="${product.description}"
            price="${price}">
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

customElements.define('productos-list', ProductosList);
