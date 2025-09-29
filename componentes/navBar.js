import { LitElement, html, css } from 'lit';

class NavBar extends LitElement {
  static properties = {
    categories: { type: Array }
  };

  constructor() {
    super();
    this.categories = [];
  }

  connectedCallback() {
    super.connectedCallback();
    this.loadCategories();
  }

  loadCategories() {
    fetch("http://161.35.104.211:8000/categories/", {
      headers: {
        'accept': 'application/json',
        'Authorization': 'Bearer seba'
      }
    })
      .then(res => res.json())
      .then(data => {
        this.categories = data;
      })
      .catch(err => console.error("Error cargando categorías:", err));
  }

  createRenderRoot() {
    return this; // usa el DOM global
  }

  render() {
    return html`
      <div class="max-w-2xl mx-auto"> 
        <nav class="border-gray-200 fixed top-0 left-0 right-0 z-50 bg-white ">
          <div class="container mx-auto flex flex-wrap items-center justify-between">
            <a href="#" class="flex">
              <img src="./images/marketLogo.svg" class="h-10 mr-3" alt="Logo">
              <span class="self-center text-lg font-semibold whitespace-nowrap">SuperMarket</span>
            </a>

            <!-- Menú -->
            <div class="hidden md:block w-full md:w-auto" id="mobile-menu">
              <ul class="flex-col md:flex-row flex items-center md:space-x-8 mt-4 md:mt-0 md:text-sm md:font-medium">
                <li>
                  <a href="listado.html" class="text-gray-700 hover:bg-gray-50">Productos</a>
                </li>
                <li>
                  <button class="text-gray-700 flex items-center">Categorías</button>
                  <div class="bg-white rounded shadow my-4 w-44">
                    <ul class="py-1">
                      ${this.categories.map(cat => html`
                        <li>
                          <a href="listado.html?categoria=${cat.id}"
                             class="text-sm hover:bg-gray-100 text-gray-700 block px-4 py-2">
                            ${cat.title}
                          </a>
                        </li>
                      `)}
                    </ul>
                  </div>
                </li>
                <li>
                  <img src="/images/cartLogo.svg" class="h-10 mr-3" alt="Logo">
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    `;
  }
}

customElements.define('nav-bar', NavBar);
