/* eslint-disable no-console */
import { LitElement, html, css } from 'lit';
import { state } from 'lit/decorators.js';
import { finder } from '@medv/finder';

export class TextMonitor extends LitElement {
  @state()
  private _selection: Selection | null;

  @state()
  private _selectionParentElement: HTMLElement | null | undefined;

  @state()
  private _selector: String = '';

  constructor() {
    super();
    this._selection = null;
    this._selectionParentElement = null;
    this.handleSelection = this.handleSelection.bind(this);
    // this.getFocusedElement = this.getFocusedElement.bind(this);
  }

  connectedCallback() {
    // eslint-disable-next-line no-unused-expressions
    super.connectedCallback && super.connectedCallback();
    document.addEventListener('selectionchange', this.handleSelection);
    // document.addEventListener('focus', this.getFocusedElement, true);
  }

  disconnectedCallback() {
    document.removeEventListener('selectionchange', this.handleSelection);
    // document.removeEventListener('focus', this.getFocusedElement, true);
    // eslint-disable-next-line no-unused-expressions
    super.disconnectedCallback && super.disconnectedCallback();
  }

  handleSelection() {
    this._selection = document.getSelection();
    this._selectionParentElement = this._selection?.anchorNode?.parentElement;

    // queued updates getting lost when user highlights, so request update each time to keep UI in sync
    this.requestUpdate();
  }

  static styles = css`
    :host {
      box-sizing: border-box;
      padding: 15px;
      min-width: 320px;
      border: 2px solid darkgray;
      box-shadow: gray 2px 2px 8px;
      background-color: white;
      position: absolute;
      right: 30px;
      top: 30px;
      z-index: 99999;
    }

    code {
      display: block;
      max-width: 280px;
    }
  `;

  getSelectedText() {
    if (this._selection && !this._selection.isCollapsed) {
      return html`<code>${this._selection?.toString()}</code>`;
    }

    return html`<em>no text selected, yet</em>`;
  }

  // eslint-disable-next-line class-methods-use-this
  getFocusedElement() {
    if (document.activeElement === document.body) {
      return;
    }

    const el = document.activeElement;
    let text;

    // input field
    if (el instanceof HTMLInputElement) {
      text = el.value;
    }

    // textarea
    if (el instanceof HTMLTextAreaElement) {
      text = el.value;
    }

    // select element
    if (el instanceof HTMLSelectElement) {
      const index = el.selectedIndex;

      text = el.children[index].textContent;
    }

    this.requestUpdate();

    // eslint-disable-next-line consistent-return
    return html`<code>${text}</code>`;
  }

  trackSelectedText() {
    // TODO: when you click Track, it removes focus from the page, which changes selected text
    // need some kind of "lock"
    if (this._selectionParentElement instanceof HTMLElement) {
      this._selector = finder(this._selectionParentElement);

      console.log('selector', this._selector);
    } else {
      console.log('invalid selector');
    }
  }

  render() {
    return html`
      <div>
        <h1>Text Tracker</h1>
        <details>
          <summary>Instructions</summary>
          <ol>
            <li>
              Select some text or focus on something (like a form field) on the
              screen
            </li>
            <li>Press the Track button</li>
            <li>
              If the correct text is not showing up, try selecting something
              else on the page and coming back to what you want to track
            </li>
          </ol>
        </details>

        <p>Selected text: ${this.getSelectedText()}</p>
        <!-- <p>Focused element: </p> -->

        <button type="button" @click="${this.trackSelectedText}">Track</button>
      </div>
    `;
  }
}
