const _dependencies = {};

class Link extends HTMLElement {
  get href() {
    return this.getAttribute('href');
  }

  set href(val) {
    if (val) {
      this.setAttribute('href', val);
    } else {
      this.removeAttribute('href');
    }
    this.link.setAttribute('href', val);
  }

  constructor() {
    super();
    this._router = _dependencies.router;
    this._onClick = this._onClick.bind(this);
  }

  static get observedAttributes() {
    return ['href'];
  }

  _onClick(evt) {
    evt.preventDefault();
    this._router.go(evt.target.href);
  }

  _moveNodes(link) {
    Array.from(this.childNodes).forEach((node) => {
      link.appendChild(node);
    });
  }

  _clear() {
    Array.from(this.childNodes).forEach((node) => {
      this.removeChild(node);
    });
  }

  connectedCallback() {
    const link = document.createElement('a');
    link.href = this.href;
    link.addEventListener('click', this._onClick);
    this._moveNodes(link);
    this._clear();
    this.appendChild(link);
  }
}

export default function init(router) {
  _dependencies.router = router;
  customElements.define('app-link', Link);
}
