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
            const categories = response;

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
      ${this.categories.map(category => {
        return html`
             
                        <li>
                            <a href="listado.html?categoria=${category.idCategoria}" class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">${category.title}</a>
                        </li>
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

customElements.define('categories-list', CategoryList);
