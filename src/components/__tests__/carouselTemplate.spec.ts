import { beforeAll, describe, it, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { defaultCarouselTokens, buildCarouselHtml, generateCarouselFrameworks } from '../../stores/carouselTemplate'
import { componentRegistry } from '../../stores/componentRegistry'

beforeAll(()=>{
  setActivePinia(createPinia())
})

describe('carousel template generation', () => {
  it('builds basic carousel HTML with controls and track', () => {
    const html = buildCarouselHtml(defaultCarouselTokens)
    expect(html).toContain('data-carousel')
    expect(html).toContain('data-track')
  expect(html).toContain('aria-label="Prev"')
  expect(html).toContain('aria-label="Next"')
  })

  it('framework wrappers include fonts and theme vars', () => {
    const fw = generateCarouselFrameworks(defaultCarouselTokens)
    expect(fw.vue).toContain('fonts.googleapis.com')
    expect(fw.vue).toContain('<style>')
    expect(fw.vue).toContain('--twb-color-primary')
    expect(fw.react).toContain('export function Carousel')
    expect(fw.angular).toContain('carousel-wrapper')
  })

  it('is registered in the component registry', ()=>{
    const ids = componentRegistry.map(c=>c.id)
    expect(ids).toContain('carousel')
  })
})
