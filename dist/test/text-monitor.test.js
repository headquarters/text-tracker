import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import '../src/text-monitor.js';
describe('TextMonitor', () => {
    // it('has a default title "Hey there" and counter 5', async () => {
    //   const el = await fixture<TextMonitor>(html`<text-monitor></text-monitor>`);
    //   expect(el.title).to.equal('Hey there');
    //   expect(el.counter).to.equal(5);
    // });
    // it('increases the counter on button click', async () => {
    //   const el = await fixture<TextMonitor>(html`<text-monitor></text-monitor>`);
    //   el.shadowRoot!.querySelector('button')!.click();
    //   expect(el.counter).to.equal(6);
    // });
    // it('can override the title via attribute', async () => {
    //   const el = await fixture<TextMonitor>(html`<text-monitor title="attribute title"></text-monitor>`);
    //   expect(el.title).to.equal('attribute title');
    // });
    it('passes the a11y audit', async () => {
        const el = await fixture(html `<text-monitor></text-monitor>`);
        await expect(el).shadowDom.to.be.accessible();
    });
});
//# sourceMappingURL=text-monitor.test.js.map