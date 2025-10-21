import { beforeAll, describe, it, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { aggregatePageFrameworks } from '../../stores/exportAggregator'

beforeAll(()=>{
  setActivePinia(createPinia())
})

describe('export aggregator', () => {
  it('includes fonts and theme vars once and concatenates blocks', () => {
    const htmls = [
      '<section id="a"><h2 class="text-2xl">Block A</h2></section>',
      '<section id="b"><p class="twb-text-muted">Block B</p></section>',
    ]
    const page = aggregatePageFrameworks(htmls)

    // Fonts and style present in Svelte and HTML
  // We include one preconnect and one stylesheet link
  expect(page.svelte.match(/fonts.googleapis.com/g)?.length).toBe(2)
    expect(page.html.match(/<style>/g)?.length).toBe(1)

    // Blocks concatenated: pick unique strings from blocks
    expect(page.html).toContain('Block A')
    expect(page.html).toContain('Block B')
  })
})
