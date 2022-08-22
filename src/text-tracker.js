import { finder } from "@medv/finder";

const template = document.createElement("template");
template.innerHTML = `
  <style>
    :host {
      box-sizing: border-box;
      padding: 15px;
      width: 320px;
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

    #selected-text {
      max-height: 60px;
      overflow: scroll;
      border: 1px solid lightgray;
      padding: 5px;
      margin-bottom: 10px;
    }
  </style>
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

        <h2>Selected text</h2> 
        <div id="selected-text"><em>no text selected, yet</em></div>

        <button type="button" id="track">Track</button>
      </div>`;

class TextTracker extends HTMLElement {
  constructor() {
    super();
    this._selectedElement = null;
    this._selector = "";
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    this.shadowRoot
      .getElementById("track")
      .addEventListener("click", () => this.trackSelectedText(), true);

    document.addEventListener("click", (e) => this.handleSelection(e));

    // capture input events that fire
    document.addEventListener("input", (e) => this.handleSelection(e), true);
  }

  disconnectedCallback() {
    document.removeEventListener("click", (e) => this.handleSelection(e));
    document.removeEventListener("input", () => this.handleSelection(), true);
  }

  handleSelection(e) {
    console.log({ e });

    // ignore clicks inside the component itself
    if (e.target.nodeName.toLowerCase() === "text-tracker") {
      return;
    }
    // Reset previous element's styles
    if (this._selectedElement) {
      this._selectedElement.style.outline = null;
    }

    this._selectedElement = e.target;

    if (!this._selectedElement) {
      this.shadowRoot.getElementById("selected-text").innerHTML =
        this.getSelectedText();

      return;
    }

    this._selectedElement.style.outlineWidth = "2px";
    this._selectedElement.style.outlineStyle = "dotted";
    this._selectedElement.style.outlineColor = "blue";

    this.shadowRoot.getElementById("selected-text").innerHTML =
      this.getSelectedText();
  }

  getSelectedText() {
    // Handle text selection
    // Select element => get option's value
    if (this._selectedElement instanceof HTMLSelectElement) {
      const label = this._selectedElement.children[this._selectedElement.selectedIndex].label;
      return `<code>${label}: ${this._selectedElement.value}</code>`;
    }

    // Input or Text area => get label
    if (
      this._selectedElement instanceof HTMLInputElement ||
      this._selectedElement instanceof HTMLTextAreaElement
    ) {
      let allLabels = "";
      this._selectedElement.labels.forEach(
        (label) => (allLabels += label.textContent.trim())
      );
      return `<code>${allLabels}</code>`;
    }

    if (this._selectedElement instanceof HTMLElement) {
      return `<code>${this._selectedElement.innerText}</code>`;
    }

    return `<em>no text selected, yet</em>`;
  }

  trackSelectedText() {
    if (this._selectedElement instanceof HTMLElement) {
      this._selector = finder(this._selectedElement);

      if (this._selectedElement instanceof HTMLSelectElement) {
        const childIndex = this._selectedElement.selectedIndex + 1;

        this._selector = `${this._selector} option:nth-child(${childIndex})`;
      }
      console.log("selector", this._selector);
    } else {
      console.log("invalid selector");
    }
  }
}

customElements.define("text-tracker", TextTracker);
