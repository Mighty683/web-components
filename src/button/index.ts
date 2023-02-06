import styles from "./button.scss?inline";

export class WebButton extends HTMLElement {
  private _shadowRoot: ShadowRoot;
  private _type: string | null;
  static {
    window.customElements.define("web-button", WebButton);
  }
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: "closed" });
    this._type = this.getAttribute("type");
    this.openShadowRoot();
  }

  private openShadowRoot() {
    this._shadowRoot.appendChild(this.buildStyles());
    this._shadowRoot.appendChild(this.buildButtonEl());
  }

  private buildStyles() {
    let stylesElement = document.createElement("style");
    stylesElement.innerHTML = styles;

    return stylesElement;
  }

  private buildButtonEl() {
    let button = document.createElement("button");
    button.classList.add("web-button");
    button.classList.add(`web-button--${this._type}`);
    button.innerHTML = this.innerHTML;

    return button;
  }
}
