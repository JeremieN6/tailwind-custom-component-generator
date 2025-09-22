import { describe, it, expect } from 'vitest';
import { buildHeroHtml, defaultHeroTokens, generateFrameworkWrappers } from '../../stores/heroTemplate';
describe('hero template generation', () => {
    it('builds html with provided title', () => {
        const html = buildHeroHtml({ ...defaultHeroTokens, title: 'Custom Title' });
        expect(html).toContain('Custom Title');
    });
    it('respects alignment center vs left', () => {
        const center = buildHeroHtml({ ...defaultHeroTokens, align: 'center' });
        const left = buildHeroHtml({ ...defaultHeroTokens, align: 'left' });
        expect(center).toContain('text-center');
        expect(left).toContain('text-left');
    });
    it('generates multi-framework wrappers', () => {
        const html = buildHeroHtml(defaultHeroTokens);
        const fw = generateFrameworkWrappers(html, defaultHeroTokens);
        expect(fw.vue).toContain('<template>');
        expect(fw.react).toContain('export function Hero');
        expect(fw.svelte).toContain('<section');
        expect(fw.angular).toContain('hero-wrapper');
    });
});
