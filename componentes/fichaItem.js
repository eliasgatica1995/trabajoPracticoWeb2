// super-product-card-min.js (Lit + Tailwind)
import { LitElement, html, css } from 'lit';
export class ProductCardMin extends LitElement {
  static styles = css`:host{display:block}`;
  render() {
    return html ` <h3>Producto Card</h3> `;
  }
}
customElements.define('producto-card', ProductoCard);