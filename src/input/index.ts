import { ThemeCss } from '../theme';
import {
  registerAttribute,
  registerComponent,
  registerRenderFunction,
} from '../utils/decorators';
import styles from './input.scss?inline';

@registerComponent('web-input')
export class WebInput extends HTMLElement {
  static get observedAttributes() {
    return ['error', 'required', 'label'];
  }

  private static _cssSheets: CSSStyleSheet[] = (function () {
    let inputCss = new CSSStyleSheet();
    inputCss.replaceSync(styles);
    return [ThemeCss, inputCss];
  })();

  private _shadowRoot: ShadowRoot;

  @registerAttribute('error')
  private readonly error?: string;
  @registerAttribute('required')
  private readonly required?: string;
  @registerAttribute('label')
  private readonly label?: string;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'closed' });
    this._shadowRoot.adoptedStyleSheets = WebInput._cssSheets;
    this.buildShadowRoot();
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
    return name !== 'error' && name !== 'required' && name !== 'label';
  }

  @registerRenderFunction()
  private buildShadowRoot() {
    this._shadowRoot.innerHTML = '';
    this._shadowRoot.appendChild(this.buildTemplate().content.cloneNode(true));
    this.updateInputElement();
    this.updateErrorElement();
    this.updateLabelElement();
  }
}
