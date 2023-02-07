import { ThemeCss } from '../theme';
import styles from './input.scss?inline';

export class WebInput extends HTMLElement {
  private static _cssSheets: CSSStyleSheet[] = (function () {
    window.customElements.define('web-input', WebInput);
    let inputCss = new CSSStyleSheet();
    inputCss.replaceSync(styles);
    return [ThemeCss, inputCss];
  })();

  private _shadowRoot: ShadowRoot;
  private error: string | null;
  private required: string | null;
  private label: string | null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'closed' });
    this.error = this.getAttribute('error');
    this.required = this.getAttribute('required');
    this.label = this.getAttribute('label');
    this.buildShadowRoot();
    this.updateInputElement();
    this.updateErrorElement();
    this.updateLabelElement();
  }

  private buildTemplate() {
    let template = document.createElement('template');
    template.innerHTML = `
      <div class="web-input">
        <label class="web-input__label" for="${this.id}">${this.label}</label>
        <input class="web-input__input" />
        <div class="web-input__error">${this.error}</div>
      </div>
    `;

    return template;
  }

  attributeChangedCallback(name: string, oldValue: string, newValue: string) {
    if (name === 'required' || name === 'label' || name === 'error') {
      this[name] = newValue;
      if (name === 'error') {
        this.updateErrorElement();
      }
    }
    this.updateInputElement();
  }

  private updateLabelElement() {
    let labelElement = this._shadowRoot.querySelector('.web-input__label');
    if (labelElement) {
      if (this.error) {
        labelElement.classList.add('web-input__label--hasError');
      } else {
        labelElement.classList.remove('web-input__label--hasError');
      }
    }
  }

  private updateErrorElement() {
    let errorElement = this._shadowRoot.querySelector('.web-input__error');
    if (errorElement) {
      if (this.error) {
        errorElement.classList.add('web-input__error--visible');
      } else {
        errorElement.classList.remove('web-input__error--visible');
      }
    }
  }

  private updateInputElement() {
    let inputElement = this._shadowRoot?.querySelector('input');
    if (inputElement) {
      this.getAttributeNames()
        .filter(this.attributeNameMatchCustomAttributes.bind(this))
        .forEach((name) =>
          inputElement?.setAttribute(name, this.getAttribute(name) as string)
        );
      if (this.error) {
        inputElement.classList.add('web-input__input--hasError');
      } else {
        inputElement.classList.remove('web-input__input--hasError');
      }
    }
  }

  private attributeNameMatchCustomAttributes(name: string): boolean {
    return name !== 'error' && name !== 'required';
  }

  private buildShadowRoot() {
    this._shadowRoot.appendChild(this.buildTemplate().content.cloneNode(true));
    this._shadowRoot.adoptedStyleSheets = WebInput._cssSheets;
  }
}
