import { beforeAll, describe, it, expect } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { componentRegistry } from '../../stores/componentRegistry'

beforeAll(()=>{
  setActivePinia(createPinia())
})

describe('utilitaires variables CSS (twb-*)', ()=>{
  it('Hero utilise twb-btn sur le bouton principal', ()=>{
    const hero = componentRegistry.find(c=>c.id==='hero')!
    const html = hero.build(hero.defaults)
    expect(html).toContain('twb-btn')
  })

  it('CTA utilise twb-btn-solid', ()=>{
    const cta = componentRegistry.find(c=>c.id==='cta')!
    const html = cta.build(cta.defaults)
    expect(html).toContain('twb-btn-solid')
  })

  it('Pricing utilise twb-card pour les cartes', ()=>{
    const pricing = componentRegistry.find(c=>c.id==='pricing')!
    const html = pricing.build(pricing.defaults as any)
    expect(html).toContain('twb-card')
  })

  it('FAQ utilise twb-card (variant cards) et twb-border (variant par défaut)', ()=>{
    const faq = componentRegistry.find(c=>c.id==='faq')!
    const htmlCards = faq.build({ ...(faq.defaults as any), variant: 'cards' })
    const htmlBordered = faq.build({ ...(faq.defaults as any), variant: 'bordered' })
    expect(htmlCards).toContain('twb-card')
    expect(htmlBordered).toContain('twb-border')
  })
})
