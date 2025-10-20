import { describe, it, expect, beforeAll } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { componentRegistry, generateFrameworks } from '../../stores/componentRegistry';
beforeAll(() => {
    setActivePinia(createPinia());
});
describe('component registry', () => {
    it('contains hero and cta definitions', () => {
        const ids = componentRegistry.map(c => c.id);
        expect(ids).toContain('hero');
        expect(ids).toContain('cta');
    });
    it('builds CTA HTML with custom title', () => {
        const cta = componentRegistry.find(c => c.id === 'cta');
        const html = cta.build({ ...cta.defaults, title: 'Custom CTA' });
        expect(html).toContain('Custom CTA');
    });
    it('generates frameworks output', () => {
        const hero = componentRegistry.find(c => c.id === 'hero');
        const html = hero.build(hero.defaults);
        const fw = generateFrameworks(html);
        expect(fw.vue).toContain('<template>');
        expect(fw.react).toContain('export function Component');
    });
});
