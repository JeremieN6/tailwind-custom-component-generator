import { beforeAll, describe, it, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { defaultTabsTokens, buildTabsHtml, generateTabsFrameworks } from '../../stores/tabsTemplate'
import { componentRegistry } from '../../stores/componentRegistry'

beforeAll(()=>{
  setActivePinia(createPinia())
})

describe('tabs template generation', () => {
  it('builds basic tabs HTML with data attributes', () => {
    const html = buildTabsHtml(defaultTabsTokens)
    expect(html).toContain('data-tabs')
    expect(html).toContain('data-tab="0"')
    expect(html).toContain('data-panel="0"')
  })

  it('framework wrappers include fonts and theme vars', () => {
    const fw = generateTabsFrameworks(defaultTabsTokens)
    expect(fw.vue).toContain('fonts.googleapis.com')
    expect(fw.vue).toContain('<style>')
    expect(fw.vue).toContain('--twb-color-primary')
    expect(fw.react).toContain('export function Tabs')
    expect(fw.angular).toContain('tabs-wrapper')
  })

  it('is registered in the component registry', ()=>{
    const ids = componentRegistry.map(c=>c.id)
    expect(ids).toContain('tabs')
  })
})
