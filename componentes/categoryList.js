import { LitElement, html } from 'lit';
import './ProductoItem';

class CategoryList extends LitElement {
  static properties = {
    apiUrl: { type: String, attribute: 'api-url' },
    apiToken: { type: String, attribute: 'api-token' },
    categories: { type: Array, state: true },
    error: { type: Object, state: true },
  };

  constructor() {
    super();
    this.categories = [];
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

          if (!this.categories) {
            this.categories = [];
            return;
          }


        })
        .catch(err => {
          this.error = err;
        });
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
      ${this.categories.map(product => {
        const price = Math.floor(product.price * 1000);
        return html`
             
                        <li>
                            <a href="#" class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2" onclick="listarCategoria('Verduras')">Verduras</a>
                        </li>
                       
                    


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
