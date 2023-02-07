import { ThemeCss } from "../theme";
import styles from "./button.scss?inline";

export class WebButton extends HTMLElement {
  private static _cssSheets: CSSStyleSheet[];
  static {
    window.customElements.define("web-button", WebButton);
    let buttonCss = new CSSStyleSheet();
    buttonCss.replaceSync(styles);
    this._cssSheets = [ThemeCss, buttonCss];
  }

  private _shadowRoot: ShadowRoot;
  private _type: string | null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "closed" });
    this._type = this.getAttribute("type");
    this.buildShadowRoot();
  }

  private buildShadowRoot() {
    this._shadowRoot.appendChild(this.buildButtonEl());
    this._shadowRoot.adoptedStyleSheets = WebButton._cssSheets;
  }

  private buildButtonEl() {
    let button = document.createElement("button");
    button.classList.add("web-button");
    button.classList.add(`web-button--${this._type}`);
    button.innerHTML = this.innerHTML;

    return button;
  }
}
