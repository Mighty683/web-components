import { ThemeCss } from "../theme";
import styles from "./button.scss?inline";

export class WebButton extends HTMLElement {
  static css: CSSStyleSheet;
  static {
    window.customElements.define("web-button", WebButton);
    this.css = new CSSStyleSheet();
    this.css.replaceSync(styles);
  }

  private _shadowRoot: ShadowRoot;
  private _type: string | null;
  

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "closed" });
    this._type = this.getAttribute("type");
    this.openShadowRoot();
  }

  private openShadowRoot() {
    this._shadowRoot.appendChild(this.buildButtonEl());
    this._shadowRoot.adoptedStyleSheets = [ThemeCss, WebButton.css];
  }

  private buildButtonEl() {
    let button = document.createElement("button");
    button.classList.add("web-button");
    button.classList.add(`web-button--${this._type}`);
    button.innerHTML = this.innerHTML;

    return button;
  }
}
