import { beforeAll, describe, it, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { defaultModalTokens, buildModalHtml, generateModalFrameworks } from '../../stores/modalTemplate'
import { componentRegistry } from '../../stores/componentRegistry'

beforeAll(()=>{
  setActivePinia(createPinia())
})

describe('modal template generation', () => {
  it('builds modal HTML with open/close controls', () => {
    const html = buildModalHtml(defaultModalTokens)
    expect(html).toContain('data-open-modal')
    expect(html).toContain('data-modal-root')
  })

  it('framework wrappers include fonts and theme vars', () => {
    const fw = generateModalFrameworks(defaultModalTokens)
    expect(fw.vue).toContain('fonts.googleapis.com')
    expect(fw.vue).toContain('<style>')
    expect(fw.vue).toContain('--twb-color-primary')
    expect(fw.react).toContain('export function Modal')
    expect(fw.angular).toContain('modal-wrapper')
  })

  it('is registered in the component registry', ()=>{
    const ids = componentRegistry.map(c=>c.id)
    expect(ids).toContain('modal')
  })
})
