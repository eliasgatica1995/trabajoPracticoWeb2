import { LitElement, html, css } from 'lit';

class ProductoItem extends LitElement {
    static properties = {
        title: { type: String },
        picture: { type: String },
        description: { type: String },
        price: { type: Number }
    };

    constructor() {
        super();
        this.title = 'Título del Producto';
        this.picture = 'https://via.placeholder.com/150';
        this.description = 'Descripción del producto';
        this.price = 0;
    }

    static styles = css`
        @import '/style.css';
    `;

    createRenderRoot() {
        return this;
    }

    render() {
        const product = {
            title: this.title,
            picture: this.picture,
            description: this.description,
            price: this.price
        };

        return html`
            <div class="max-w-96 shadow-lg bg-gray-100  h-full flex flex-col">
                <img src="${product.picture}" alt="${product.title}" class="aspect-square w-full mix-blend-multiply brightness-110">
                <div class="flex-1 p-3 bg-white flex flex-col justify-between">
                    <h2 class="text-xl font-bold mb-1">${product.title}</h2>
                    <p class="text-gray-600 mb-2">${product.description}</p>
                    <div class="text-2xl font-semibold text-green-600">$${product.price}</div>
                </div>
            </div>
        `;
    }

    renderError(error) {
        return html`
            <div class="text-red-600 font-semibold">Error loading product: ${error.message}</div>
        `;
    }
}

customElements.define('producto-item', ProductoItem);
