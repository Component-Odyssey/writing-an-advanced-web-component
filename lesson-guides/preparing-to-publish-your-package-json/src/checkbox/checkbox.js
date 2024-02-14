import { LitElement, css, html } from 'lit'
import { baseStyles } from '../shared/base-styles.js'

class OdysseyCheckbox extends LitElement {
  static styles = css`
  ${baseStyles}

  :host {
    font-size: var(--checkbox-font-size);
    font-family: var(--checkbox-font-family);
  }

  :host([disabled]) {
    opacity: var(--checkbox-opacity-disabled);
  }

  .visually-hidden {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }

  label[for="checkbox"] {
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: var(--checkbox-gap);
    width: fit-content;
    user-select: none;
  }

  input[disabled]+label[for="checkbox"] {
    cursor: default;
  }

  input:focus-visible+label[for="checkbox"] {
    outline: var(--checkbox-outline-width-focused) solid var(--checkbox-outline-color-focused);
    outline-offset: var(--checkbox-outline-offset-focused);
  }

  input:checked+label[for="checkbox"] .visual-checkbox {
    background-color: var(--checkbox-check-background-color-checked);
    background-image: url(https://component-odyssey.s3.amazonaws.com/tick.svg);
    background-position: center;
    background-repeat: no-repeat;
    border: none;
  }

  input:not([disabled])+label[for="checkbox"]:active .visual-checkbox {
    background: var(--checkbox-check-background-color-active);
  }

  .visual-checkbox {
    display: inline-block;
    height: var(--checkbox-check-height);
    width: var(--checkbox-check-width);
    border-radius: var(--checkbox-check-border-radius);
    border: var(--checkbox-check-border-width) solid var(--checkbox-check-border-color);
  }
  `

  static properties = {
    checked: { type: Boolean, reflect: true },
    disabled: { type: Boolean, reflect: true }
  }

  constructor() {
    super()
  }

  render() {
    return html`
    <input ?disabled=${this.disabled} @change=${this.#onChange} id="checkbox" class="visually-hidden" type="checkbox" />
    <label for="checkbox">
      <span class="visual-checkbox"></span>
      <slot></slot>
    </label>
    `
  }

  #onChange = (e) => {
    this.checked = e.target.checked;
  }
}

customElements.define('odyssey-checkbox', OdysseyCheckbox)
