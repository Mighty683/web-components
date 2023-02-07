import { ThemeCss } from '../theme';
import styles from './button.scss?inline';

export class WebButton extends HTMLElement {
  private static _cssSheets: CSSStyleSheet[] = (function () {
    window.customElements.define('web-button', WebButton);
    let buttonCss = new CSSStyleSheet();
    buttonCss.replaceSync(styles);
    return [ThemeCss, buttonCss];
  })();

  private _shadowRoot: ShadowRoot;
  private type: string | null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'closed' });
    this.type = this.getAttribute('type');
    this.buildShadowRoot();
  }
  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (Object.hasOwn(this, name)) {
      this[name as 'type'] = newValue;
    }
  }

  private buildShadowRoot() {
    this._shadowRoot.appendChild(this.buildButtonEl());
    this._shadowRoot.adoptedStyleSheets = WebButton._cssSheets;
  }

  private buildButtonEl() {
    let button = document.createElement('button');
    button.classList.add('web-button');
    button.classList.add(`web-button--${this.type}`);
    button.innerHTML = this.innerHTML;

    return button;
  }
}
