import { __decorate } from "tslib";
import { LitElement, html, css } from 'lit';
import { state } from 'lit/decorators.js';
import { finder } from '@medv/finder';
export class TextMonitor extends LitElement {
    constructor() {
        super();
        this._selector = '';
        this._selection = null;
        this._selectionParentElement = null;
        this.handleSelection = this.handleSelection.bind(this);
        this.getFocusedElement = this.getFocusedElement.bind(this);
    }
    connectedCallback() {
        // eslint-disable-next-line no-unused-expressions
        super.connectedCallback && super.connectedCallback();
        document.addEventListener('selectionchange', this.handleSelection);
        document.addEventListener('focus', this.getFocusedElement, true);
    }
    disconnectedCallback() {
        document.removeEventListener('selectionchange', this.handleSelection);
        document.removeEventListener('focus', this.getFocusedElement, true);
        // eslint-disable-next-line no-unused-expressions
        super.disconnectedCallback && super.disconnectedCallback();
    }
    handleSelection() {
        var _a, _b;
        this._selection = document.getSelection();
        this._selectionParentElement = (_b = (_a = this._selection) === null || _a === void 0 ? void 0 : _a.anchorNode) === null || _b === void 0 ? void 0 : _b.parentElement;
        // queued updates getting lost when user highlights, so request update each time to keep UI in sync
        this.requestUpdate();
    }
    getSelectedText() {
        var _a;
        if (this._selection && !this._selection.isCollapsed) {
            return html `<pre>${(_a = this._selection) === null || _a === void 0 ? void 0 : _a.toString()}</pre>`;
        }
        return html `<em>no text selected, yet</em>`;
    }
    // eslint-disable-next-line class-methods-use-this
    getFocusedElement() {
        if (document.activeElement === document.body) {
            return;
        }
        const el = document.activeElement;
        let text;
        // for a dropdown
        if (el instanceof HTMLSelectElement) {
            const index = el.selectedIndex;
            text = el.children[index].textContent;
        }
        else {
            text = el === null || el === void 0 ? void 0 : el.textContent;
        }
        this.requestUpdate();
        return html `<pre>${text}</pre>`;
    }
    trackSelectedText() {
        if (this._selectionParentElement instanceof HTMLElement) {
            this._selector = finder(this._selectionParentElement);
            console.log('selector', this._selector);
        }
        else {
            console.log('invalid selector');
        }
    }
    render() {
        return html `
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
            <li>If the correct text is not showing up, try selecting something else on the page and coming back to what you want to track</li>
          </ol>
        </details>

        <p>Selected text: ${this.getSelectedText()}</p>
        <p>Focused element: ${this.getFocusedElement()}</p>

        <button type="button" @click="${this.trackSelectedText}">Track</button>
      </div>
    `;
    }
}
TextMonitor.styles = css `
    :host {
      box-sizing: border-box;
      padding: 15px;
      min-width: 300px;
      border: 2px solid darkgray;
      box-shadow: gray 2px 2px 8px;
      background-color: white;
      position: absolute;
      right: 30px;
      top: 30px;
      z-index: 99999;
    }
  `;
__decorate([
    state()
], TextMonitor.prototype, "_selection", void 0);
__decorate([
    state()
], TextMonitor.prototype, "_selectionParentElement", void 0);
__decorate([
    state()
], TextMonitor.prototype, "_selector", void 0);
//# sourceMappingURL=TextMonitor.js.map