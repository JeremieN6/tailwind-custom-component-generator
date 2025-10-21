import { themeVariablesStyle, useThemeStore } from './theme'

export interface CarouselTokens {
  images: string; // comma separated URLs
  autoplay?: boolean;
  intervalMs?: number;
  showIndicators?: boolean;
  rounded?: string;
  fontFamily: string;
  primaryColor: string;
}

function fontStack(font: string) {
  const needsQuote = /\s/.test(font)
  const primary = needsQuote ? `'${font}'` : font
  return `${primary}, Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif`
}

export const defaultCarouselTokens: CarouselTokens = {
  images: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1200&auto=format&fit=crop,https://images.unsplash.com/photo-1518779578993-ec3579fee39f?q=80&w=1200&auto=format&fit=crop,https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1200&auto=format&fit=crop',
  autoplay: true,
  intervalMs: 3000,
  showIndicators: true,
  rounded: 'rounded-lg',
  fontFamily: 'Inter',
  primaryColor: '#3b82f6',
}

export function buildCarouselHtml(t: CarouselTokens){
  const imgs = t.images.split(',').map(s=>s.trim()).filter(Boolean)
  const ff = fontStack(t.fontFamily)
  const slides = imgs.map((src,i)=>`<div class=\"w-full shrink-0\"><img src=\"${src}\" alt=\"\" class=\"w-full h-64 object-cover ${t.rounded}\"></div>`).join('')
  const indicators = t.showIndicators ? `<div class=\"absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2\">${imgs.map((_,i)=>`<span class=\"w-2.5 h-2.5 rounded-full\" data-idx=\"${i}\" style=\"background:${t.primaryColor}40\"></span>`).join('')}</div>` : ''
  return `<section class=\"py-16\"><div class=\"px-6 max-w-4xl mx-auto\"><div class=\"relative overflow-hidden\" data-carousel data-autoplay=\"${!!t.autoplay}\" data-interval=\"${t.intervalMs||3000}\" style=\"font-family:${ff}\"><div class=\"flex transition-transform duration-500 ease-out\" data-track>${slides}</div><button type=\"button\" class=\"absolute left-2 top-1/2 -translate-y-1/2 twb-btn twb-btn-outline rounded-full px-3 py-1\" aria-label=\"Prev\" style=\"--btn-color:${t.primaryColor}\">‹</button><button type=\"button\" class=\"absolute right-2 top-1/2 -translate-y-1/2 twb-btn twb-btn-outline rounded-full px-3 py-1\" aria-label=\"Next\" style=\"--btn-color:${t.primaryColor}\">›</button>${indicators}</div></div></section>`
}

export function generateCarouselFrameworks(tokens: CarouselTokens){
  const theme = useThemeStore()
  const vars = themeVariablesStyle(theme.tokens)
  const fonts = `<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=Open+Sans:wght@400;600;700&display=swap\" rel=\"stylesheet\">`
  const style = `<style>${vars}</style>`
  const ff = fontStack(tokens.fontFamily)
  const images = tokens.images.split(',').map(s=>s.trim()).filter(Boolean)

  // Vue
  const vue = `<template>\n  <section class=\"py-16\">\n    <div class=\"px-6 max-w-4xl mx-auto\">\n      <div class=\"relative overflow-hidden\" style=\"font-family:${ff}\">\n        <div class=\"flex transition-transform duration-500 ease-out\" :style=\"{ transform: 'translateX(' + (-index*100) + '%)' }\">\n          <div v-for=\"(src,i) in images\" :key=\"i\" class=\"w-full shrink-0\">\n            <img :src=\"src\" class=\"w-full h-64 object-cover ${tokens.rounded}\" alt=\"\"/>\n          </div>\n        </div>\n        <button type=\"button\" class=\"absolute left-2 top-1/2 -translate-y-1/2 twb-btn twb-btn-outline rounded-full px-3 py-1\" aria-label=\"Prev\" @click=\"prev\" style=\"--btn-color:${tokens.primaryColor}\">‹</button>\n        <button type=\"button\" class=\"absolute right-2 top-1/2 -translate-y-1/2 twb-btn twb-btn-outline rounded-full px-3 py-1\" aria-label=\"Next\" @click=\"next\" style=\"--btn-color:${tokens.primaryColor}\">›</button>\n        ${tokens.showIndicators ? `<div class=\\"absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2\\">`+images.map((_,i)=>`<span class=\\"w-2.5 h-2.5 rounded-full\\" :style=\\"{ background: index===${i} ? '${tokens.primaryColor}' : '${tokens.primaryColor}40' }\\"></span>`).join('')+`</div>` : ''}\n      </div>\n    </div>\n  </section>\n</template>\n<script setup lang=\"ts\">\nimport { ref, onMounted, onBeforeUnmount } from 'vue'\nconst images = ${JSON.stringify(images)}\nconst index = ref(0)\nlet timer: any\nfunction next(){ index.value = (index.value+1) % images.length }\nfunction prev(){ index.value = (index.value-1+images.length) % images.length }\nonMounted(()=>{ if(${!!tokens.autoplay}){ timer = setInterval(next, ${tokens.intervalMs||3000}) } })\nonBeforeUnmount(()=>{ if(timer) clearInterval(timer) })\n</script>\n<!-- Include in <head>: -->\n${fonts}\n${style}`

  // React
  const react = `import { useEffect, useRef, useState } from 'react'\nexport function Carousel(){\n  const images = ${JSON.stringify(images)}\n  const [index, setIndex] = useState(0)\n  const timer = useRef<any>(null)\n  const next = () => setIndex(i => (i+1)%images.length)\n  const prev = () => setIndex(i => (i-1+images.length)%images.length)\n  useEffect(()=>{ if(${!!tokens.autoplay}){ timer.current = setInterval(next, ${tokens.intervalMs||3000}); return ()=> timer.current && clearInterval(timer.current) } },[])\n  return (\n    <section className=\"py-16\">\n      <div className=\"px-6 max-w-4xl mx-auto\">\n        <div className=\"relative overflow-hidden\" style={{fontFamily:'${ff}'}} >\n          <div className=\"flex transition-transform duration-500 ease-out\" style={{transform: 'translateX(' + (-index*100) + '%)'}}>{images.map((src,i)=> (<div className=\"w-full shrink-0\" key={i}><img src={src} alt=\"\" className=\"w-full h-64 object-cover ${tokens.rounded}\"/></div>))}</div>\n          <button type=\"button\" className=\"absolute left-2 top-1/2 -translate-y-1/2 twb-btn twb-btn-outline rounded-full px-3 py-1\" aria-label=\"Prev\" onClick={prev} style={{'--btn-color':'${tokens.primaryColor}' } as any}>‹</button>\n          <button type=\"button\" className=\"absolute right-2 top-1/2 -translate-y-1/2 twb-btn twb-btn-outline rounded-full px-3 py-1\" aria-label=\"Next\" onClick={next} style={{'--btn-color':'${tokens.primaryColor}' } as any}>›</button>\n          ${tokens.showIndicators ? `<div className=\\"absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2\\">`+images.map((_,i)=>`<span className=\\"w-2.5 h-2.5 rounded-full\\" style=\\"background:${tokens.primaryColor}40\\"></span>`).join('')+`</div>` : ''}\n        </div>\n      </div>\n    </section>\n  )\n}\n// Include in <head>:\n// ${fonts}\n// ${style}`

  // Svelte
  const svelte = `<svelte:head>\n${fonts}\n${style}\n</svelte:head>\n<script>\n  let images = ${JSON.stringify(images)}\n  let index = 0\n  let timer\n  const next = () => index = (index+1) % images.length\n  const prev = () => index = (index-1+images.length) % images.length\n  onMount(()=>{ ${tokens.autoplay ? `timer = setInterval(next, ${tokens.intervalMs||3000})` : ''} })\n  onDestroy(()=>{ if(timer) clearInterval(timer) })\n</script>\n<section class=\"py-16\">\n  <div class=\"px-6 max-w-4xl mx-auto\">\n    <div class=\"relative overflow-hidden\" style=\"font-family:${ff}\">\n      <div class=\"flex transition-transform duration-500 ease-out\" style=\"transform: translateX(${`{`}-index*100${`}`}%);\">\n        {#each images as src, i}\n          <div class=\"w-full shrink-0\"><img src=\"{src}\" alt=\"\" class=\"w-full h-64 object-cover ${tokens.rounded}\"/></div>\n        {/each}\n      </div>\n      <button type=\"button\" class=\"absolute left-2 top-1/2 -translate-y-1/2 twb-btn twb-btn-outline rounded-full px-3 py-1\" aria-label=\"Prev\" on:click=\"{prev}\" style=\"--btn-color:${tokens.primaryColor}\">‹</button>\n      <button type=\"button\" class=\"absolute right-2 top-1/2 -translate-y-1/2 twb-btn twb-btn-outline rounded-full px-3 py-1\" aria-label=\"Next\" on:click=\"{next}\" style=\"--btn-color:${tokens.primaryColor}\">›</button>\n    </div>\n  </div>\n</section>`

  // Angular (standalone)
  const angular = `import { Component } from '@angular/core';\n\n@Component({\n  selector: 'carousel-wrapper',\n  standalone: true,\n  template: \`<section class=\\"py-16\\">\n    <div class=\\"px-6 max-w-4xl mx-auto\\">\n      <div class=\\"relative overflow-hidden\\" style=\\"font-family:${ff}\\">\n        <div class=\\"flex transition-transform duration-500 ease-out\\" [ngStyle]=\\"{ transform: 'translateX(' + (-index*100) + '%)' }\\">\n          <div class=\\"w-full shrink-0\\" *ngFor=\\"let src of images; index as i\\">\n            <img [src]=\\"src\\" alt=\\"\\" class=\\"w-full h-64 object-cover ${tokens.rounded}\\"/>\n          </div>\n        </div>\n        <button type=\\"button\\" class=\\"absolute left-2 top-1/2 -translate-y-1/2 twb-btn twb-btn-outline rounded-full px-3 py-1\\" aria-label=\\"Prev\\" (click)=\\"prev()\\" [ngStyle]=\\"{ '--btn-color': '${tokens.primaryColor}' }\\">‹</button>\n        <button type=\\"button\\" class=\\"absolute right-2 top-1/2 -translate-y-1/2 twb-btn twb-btn-outline rounded-full px-3 py-1\\" aria-label=\\"Next\\" (click)=\\"next()\\" [ngStyle]=\\"{ '--btn-color': '${tokens.primaryColor}' }\\">›</button>\n      </div>\n    </div>\n  </section>\`,\n  styles: [\`${vars}\`]\n})\nexport class CarouselComponent {\n  images: string[] = ${JSON.stringify(images)};\n  index = 0;\n  timer: any;\n  next(){ this.index = (this.index+1) % this.images.length }\n  prev(){ this.index = (this.index-1+this.images.length) % this.images.length }\n  ngOnInit(){ ${tokens.autoplay ? `this.timer = setInterval(()=> this.next(), ${tokens.intervalMs||3000});` : ''} }\n  ngOnDestroy(){ if(this.timer) clearInterval(this.timer) }\n}`

  const html = `<!doctype html>\n<html>\n<head>\n${fonts}\n${style}\n<script src=\"https://cdn.tailwindcss.com\"><\/script>\n</head>\n<body>\n${buildCarouselHtml(tokens)}\n<script>\n(function(){\n  var root = document.querySelector('[data-carousel]');\n  if(!root) return;\n  var track = root.querySelector('[data-track]');\n  var slides = Array.from(track.children);\n  var idx = 0;\n  function render(){ track.style.transform = 'translateX(' + (-idx*100) + '%)'; }\n  function next(){ idx = (idx+1) % slides.length; render(); }\n  function prev(){ idx = (idx-1+slides.length) % slides.length; render(); }\n  var btns = root.querySelectorAll('button[aria-label]');\n  if(btns[0]) btns[0].addEventListener('click', prev);\n  if(btns[1]) btns[1].addEventListener('click', next);\n  if(root.getAttribute('data-autoplay') === 'true'){ setInterval(next, parseInt(root.getAttribute('data-interval')||'3000',10)); }\n  render();\n})();\n</script>\n</body>\n</html>`

  return { vue, react, svelte, angular, html }
}
