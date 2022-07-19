import { LitElement } from 'lit';

export declare class TextMonitor extends LitElement {
  private _selection;

  private _selectionParentElement;

  private _selector;

  constructor();

  connectedCallback(): void;

  disconnectedCallback(): void;

  handleSelection(): void;

  static styles: import('lit').CSSResult;

  getSelectedText(): import('lit-html').TemplateResult<1>;

  getFocusedElement(): import('lit-html').TemplateResult<1> | undefined;

  trackSelectedText(): void;

  render(): import('lit-html').TemplateResult<1>;
}
