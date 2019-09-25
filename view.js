const _dependencies = {};

class View extends HTMLElement {
  get component() {
    return this.getAttribute('component') || null;
  }

  set component(val) {
    if (val) {
      this.setAttribute('match', val);
    } else {
      this.removeAttribute('match', val);
    }
  }

  get match() {
    return this.getAttribute('match') || null;
  }

  set match(val) {
    if (val) {
      this.setAttribute('match', val);
    } else {
      this.removeAttribute('match', val);
    }
  }

  constructor() {
    super();
    this.router = _dependencies.router;
  }

  connectedCallback() {
    this.router.add(this.match, this);
  }

  _clear() {
    Array.from(this.childNodes).forEach((node) => {
      this.removeChild(node);
    });
  }

  in() {
    const viewComponent = document.createElement(this.component);
    this._clear();
    this.appendChild(viewComponent);
  }

  out() {
    this._clear();
  }

  update() {

  }
}

export default function init(router) {
  _dependencies.router = router;
  customElements.define('app-view', View);
}
