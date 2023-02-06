import styles from "./button.css";

class WebButton extends HTMLElement {
  private _shadowRoot: ShadowRoot;
  private _type: string | null;
  constructor() {
    super();
    this._type = this.getAttribute("type");
    this.openShadowRoot();
  }

  private openShadowRoot() {
    this._shadowRoot = this.attachShadow({ mode: "closed" });
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
    button.className = "web-button";
    button.innerHTML = this.innerHTML;

    return button;
  }
}

window.customElements.define("web-button", WebButton);
