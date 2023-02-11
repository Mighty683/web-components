import { ThemeCss } from '../theme';
import {
  registerAttribute,
  registerComponent,
  registerRenderFunction,
} from '../utils/decorators';
import styles from './button.scss?inline';

@registerComponent('web-button')
export class WebButton extends HTMLElement {
  static get observedAttributes() {
    return ['type'];
  }
  private static _cssSheets: CSSStyleSheet[] = (function () {
    let buttonCss = new CSSStyleSheet();
    buttonCss.replaceSync(styles);
    return [ThemeCss, buttonCss];
  })();

  private _shadowRoot: ShadowRoot;

  @registerAttribute('type')
  readonly type: string | undefined;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'closed' });
    this.buildShadowRoot();
  }

  @registerRenderFunction()
  private buildShadowRoot() {
    this._shadowRoot.innerHTML = '';
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
