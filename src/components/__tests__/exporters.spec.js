import { beforeAll, describe, it, expect } from 'vitest';
import { createPinia, setActivePinia } from 'pinia';
import { componentRegistry, generateFrameworks } from '../../stores/componentRegistry';
beforeAll(() => {
    setActivePinia(createPinia());
});
describe('multi-framework exporters parity', () => {
    it('includes fonts and theme vars in Svelte output', () => {
        const hero = componentRegistry.find(c => c.id === 'hero');
        const html = hero.build(hero.defaults);
        const fw = generateFrameworks(html);
        expect(fw.svelte).toContain('fonts.googleapis.com');
        expect(fw.svelte).toContain('<style>');
        expect(fw.svelte).toContain('--twb-color-primary');
    });
    it('includes fonts and theme vars in Angular instructions/output', () => {
        const hero = componentRegistry.find(c => c.id === 'hero');
        const html = hero.build(hero.defaults);
        const fw = generateFrameworks(html);
        expect(fw.angular).toContain('fonts.googleapis.com');
        expect(fw.angular).toContain('<style>');
        expect(fw.angular).toContain('--twb-color-primary');
    });
});
