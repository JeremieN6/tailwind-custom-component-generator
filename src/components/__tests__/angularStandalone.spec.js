import { describe, it, expect } from 'vitest';
import { generateAngularStandalone } from '../../stores/angularStandalone';
describe('Angular standalone generator', () => {
    it('generates a valid standalone component with defaults', () => {
        const html = '<div class="page">Hello</div>';
        const ts = generateAngularStandalone(html);
        expect(ts).toContain("import { Component } from '@angular/core'");
        expect(ts).toContain('@Component');
        expect(ts).toContain('standalone: true');
        expect(ts).toContain("selector: 'app-exported-page'");
        expect(ts).toContain('export class ExportedPageComponent');
        expect(ts).toContain(html);
    });
    it('supports custom selector, componentName and styles', () => {
        const ts = generateAngularStandalone('<p>Body</p>', { selector: 'app-x', componentName: 'XComp', styles: [':host{display:block}'] });
        expect(ts).toContain("selector: 'app-x'");
        expect(ts).toContain('export class XComp');
        expect(ts).toContain(':host{display:block}');
    });
});
