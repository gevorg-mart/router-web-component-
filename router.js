import link from './link';
import view from './view';

class Router extends HTMLElement {
  constructor() {
    super();
    this._currentView = null;
    this._routes = new Map();
    this._onChanged = this._onChanged.bind(this);
  }

  connectedCallback() {
    // the other components should initialized together with router
    view(this);
    link(this);
    this._attachListeners();
    this._onChanged();
  }

  _attachListeners() {
    window.addEventListener('popstate', this._onChanged);
  }

  /**
   * For dispatching event, when route changed
   */
  _dispatchEvent() {
    const event = document.createEvent('Event');
    event.initEvent('routechanged');
    this.dispatchEvent(event);
  }

  _onChanged() {
    const path = document.location.pathname;
    const routes = Array.from(this._routes.keys());
    const route = routes.find(r => r.test(path));

    if (!route) {
      return;
    }

    const newView = this._routes.get(route);
    if (newView === this._currentView) {
      newView.update();
      return;
    }

    if (this._currentView) {
      this._currentView.out();
    }
    newView.in();
    this._currentView = newView;
    this._dispatchEvent();
  }

  /**
   * for adding new route
   * @param {RegExp} routeMatch
   * @param {string} routeView
   */
  add(routeMatch, routeView) {
    const pattern = new RegExp(routeMatch, 'i');

    if (this._routes.has(pattern)) {
      // console.warn(`the route "${route}" already exist`);
    }
    this._routes.set(pattern, routeView);
  }

  /**
   * navigate url corresponding route
   * @param {string} href
   */
  go(href) {
    window.history.pushState(null, null, href);
    this._onChanged();
  }
}

export default function init() {
  customElements.define('app-router', Router);
}
