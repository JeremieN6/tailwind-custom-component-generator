import { themeVariablesStyle, useThemeStore } from './theme';
function fontStack(font) {
    const needsQuote = /\s/.test(font);
    const primary = needsQuote ? `'${font}'` : font;
    return `${primary}, Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif`;
}
export const defaultFaqTokens = {
    title: 'Frequently Asked Questions',
    subtitle: 'Get answers to common questions',
    questions: 'How does it work?,Is it customizable?,What frameworks are supported?',
    variant: 'bordered',
    openFirst: false,
    rounded: 'rounded-lg',
    fontFamily: 'Inter',
    primaryColor: '#3b82f6',
};
export function buildFaqHtml(t) {
    const qs = t.questions.split(',').map(q => q.trim());
    const ff = fontStack(t.fontFamily);
    const wrapper = t.variant === 'cards' ? 'grid md:grid-cols-2 gap-4' : 'space-y-4';
    return `<section class=\"py-24\"><div class=\"px-6 max-w-4xl mx-auto text-center mb-14\"><h2 class=\"text-4xl font-bold mb-4 text-gray-900 dark:text-white\" style=\"font-family:${ff}\">${t.title}</h2><p class=\"text-lg text-gray-600 dark:text-gray-300\" style=\"font-family:${ff}\">${t.subtitle}</p></div><div class=\"max-w-3xl mx-auto ${wrapper}\">${qs.map((q, i) => {
        const open = t.openFirst && i === 0;
        if (t.variant === 'cards') {
            return `<div class=\"twb-card p-5 ${t.rounded}\" style=\"font-family:${ff}\"><div class=\"font-medium text-gray-900 dark:text-white mb-2\">${q}</div><div class=\"text-sm twb-text-muted\">Lorem ipsum dolor sit amet.</div></div>`;
        }
        if (t.variant === 'plain') {
            return `<div class=\"py-2\" style=\"font-family:${ff}\"><div class=\"font-medium text-gray-900 dark:text-white\">${q}</div></div>`;
        }
        // bordered (default)
        return `<div class=\"twb-border p-4 ${t.rounded}\" style=\"border-color:${t.primaryColor}30;font-family:${ff}\"><div class=\"flex justify-between items-center\"><span class=\"text-gray-900 dark:text-white\">${q}</span><span class=\"w-6 h-6 flex items-center justify-center rounded-full text-white text-sm\" style=\"background:${t.primaryColor}\">${open ? '-' : '+'}</span></div>${open ? `<div class=\\\"mt-2 text-sm twb-text-muted\\\">Lorem ipsum dolor sit amet.</div>` : ''}</div>`;
    }).join('')}</div></section>`;
}
export function generateFaqFrameworks(tokens) {
    const theme = useThemeStore();
    const vars = themeVariablesStyle(theme.tokens);
    const fonts = `<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=Open+Sans:wght@400;600;700&display=swap\" rel=\"stylesheet\">`;
    const style = `<style>${vars}</style>`;
    const ff = fontStack(tokens.fontFamily);
    const questions = tokens.questions.split(',').map(q => q.trim());
    // Vue SFC
    const vue = `<template>\n  <section class=\"py-24\">\n    <div class=\"px-6 max-w-4xl mx-auto text-center mb-14\">\n      <h2 class=\"text-4xl font-bold mb-4 text-gray-900 dark:text-white\" style=\"font-family:${ff}\">${tokens.title}</h2>\n      <p class=\"text-lg text-gray-600 dark:text-gray-300\" style=\"font-family:${ff}\">${tokens.subtitle}</p>\n    </div>\n    <div class=\"max-w-3xl mx-auto space-y-4\">\n      <div v-for=\"(q,i) in questions\" :key=\"i\" class=\"twb-border p-4 ${tokens.rounded}\" style=\"border-color:${tokens.primaryColor}30;font-family:${ff}\">\n        <div class=\"flex justify-between items-center\" @click=\"toggle(i)\">\n          <span class=\"text-gray-900 dark:text-white\">{{ q }}</span>\n          <span class=\"w-6 h-6 flex items-center justify-center rounded-full text-white text-sm\" :style=\"{background: primary}\">{{ openIndex===i ? '-' : '+' }}</span>\n        </div>\n        <div v-if=\"openIndex===i\" class=\"mt-2 text-sm twb-text-muted\">Lorem ipsum dolor sit amet.</div>\n      </div>\n    </div>\n  </section>\n</template>\n<script setup lang=\"ts\">\nimport { ref } from 'vue'\nconst questions = ${JSON.stringify(questions)}\nconst openIndex = ref(${tokens.openFirst ? 0 : -1})\nconst primary = '${tokens.primaryColor}'\nfunction toggle(i:number){ openIndex.value = openIndex.value===i ? -1 : i }\n</script>\n<!-- Include in <head>: -->\n${fonts}\n${style}`;
    // React
    const react = `import { useState } from 'react'\nexport function Faq(){\n  const questions = ${JSON.stringify(questions)}\n  const [openIndex, setOpenIndex] = useState(${tokens.openFirst ? 0 : -1})\n  const primary='${tokens.primaryColor}'\n  return (\n    <section className=\"py-24\">\n      <div className=\"px-6 max-w-4xl mx-auto text-center mb-14\">\n        <h2 className=\"text-4xl font-bold mb-4 text-gray-900 dark:text-white\" style={{fontFamily:'${ff}'}}>${tokens.title}</h2>\n        <p className=\"text-lg text-gray-600 dark:text-gray-300\" style={{fontFamily:'${ff}'}}>${tokens.subtitle}</p>\n      </div>\n      <div className=\"max-w-3xl mx-auto space-y-4\">\n        {questions.map((q,i)=> (\n          <div key={i} className=\"twb-border p-4 ${tokens.rounded}\" style={{borderColor: primary+'30', fontFamily:'${ff}'}}>\n            <div className=\"flex justify-between items-center\" onClick={()=> setOpenIndex(openIndex===i?-1:i)}>\n              <span className=\"text-gray-900 dark:text-white\">{q}</span>\n              <span className=\"w-6 h-6 flex items-center justify-center rounded-full text-white text-sm\" style={{background: primary}}>{openIndex===i?'−':'+'}</span>\n            </div>\n            {openIndex===i && (<div className=\"mt-2 text-sm twb-text-muted\">Lorem ipsum dolor sit amet.</div>)}\n          </div>\n        ))}\n      </div>\n    </section>\n  )\n}\n// Include in <head>:\n// ${fonts}\n// ${style}`;
    // Svelte
    const svelte = `<svelte:head>\n${fonts}\n${style}\n</svelte:head>\n<script>\n  let questions = ${JSON.stringify(questions)}\n  let openIndex = ${tokens.openFirst ? 0 : -1}\n  const primary='${tokens.primaryColor}'\n</script>\n<section class=\"py-24\">\n  <div class=\"px-6 max-w-4xl mx-auto text-center mb-14\">\n    <h2 class=\"text-4xl font-bold mb-4 text-gray-900 dark:text-white\" style=\"font-family:${ff}\">${tokens.title}</h2>\n    <p class=\"text-lg text-gray-600 dark:text-gray-300\" style=\"font-family:${ff}\">${tokens.subtitle}</p>\n  </div>\n  <div class=\"max-w-3xl mx-auto space-y-4\">\n    {#each questions as q, i}\n      <div class=\"twb-border p-4 ${tokens.rounded}\" style=\"border-color:${tokens.primaryColor}30;font-family:${ff}\">\n        <div class=\"flex justify-between items-center\" on:click=\"{()=> openIndex = openIndex===i ? -1 : i}\">\n          <span class=\"text-gray-900 dark:text-white\">{q}</span>\n          <span class=\"w-6 h-6 flex items-center justify-center rounded-full text-white text-sm\" style=\"background:{primary}\">{openIndex===i?'−':'+'}</span>\n        </div>\n        {#if openIndex===i}\n          <div class=\"mt-2 text-sm twb-text-muted\">Lorem ipsum dolor sit amet.</div>\n        {/if}\n      </div>\n    {/each}\n  </div>\n</section>`;
    // Angular
    const angular = `import { Component } from '@angular/core';\n\n@Component({\n  selector: 'faq-wrapper',\n  standalone: true,\n  template: \`<section class=\\\"py-24\\\">\n    <div class=\\\"px-6 max-w-4xl mx-auto text-center mb-14\\\">\n      <h2 class=\\\"text-4xl font-bold mb-4 text-gray-900 dark:text-white\\\" style=\\\"font-family:${ff}\\\">${tokens.title}</h2>\n      <p class=\\\"text-lg text-gray-600 dark:text-gray-300\\\" style=\\\"font-family:${ff}\\\">${tokens.subtitle}</p>\n    </div>\n    <div class=\\\"max-w-3xl mx-auto space-y-4\\\">\n      <div class=\\\"twb-border p-4 ${tokens.rounded}\\\" *ngFor=\\\"let q of questions; index as i\\\" [ngStyle]=\\\"{ 'border-color': primary+'30', 'font-family': '${ff}' }\\\">\n        <div class=\\\"flex justify-between items-center\\\" (click)=\\\"toggle(i)\\\">\n          <span class=\\\"text-gray-900 dark:text-white\\\">{{ q }}</span>\n          <span class=\\\"w-6 h-6 flex items-center justify-center rounded-full text-white text-sm\\\" [ngStyle]=\\\"{ background: primary }\\\">{{ openIndex===i ? '−' : '+' }}</span>\n        </div>\n        <div *ngIf=\\\"openIndex===i\\\" class=\\\"mt-2 text-sm twb-text-muted\\\">Lorem ipsum dolor sit amet.</div>\n      </div>\n    </div>\n  </section>\`,\n  styles: [\`${vars}\`]\n})\nexport class FaqComponent {\n  questions: string[] = ${JSON.stringify(questions)};\n  openIndex = ${tokens.openFirst ? 0 : -1};\n  primary = '${tokens.primaryColor}';\n  toggle(i: number){ this.openIndex = this.openIndex===i ? -1 : i; }\n}`;
    // Plain HTML + script
    const html = `<!doctype html>\n<html>\n<head>\n${fonts}\n${style}\n<script src=\"https://cdn.tailwindcss.com\"><\/script>\n</head>\n<body>\n${buildFaqHtml(tokens)}\n<script>\n  (function(){\n    var container = document.currentScript.previousElementSibling;\n    if(!container) return;\n    var items = container.querySelectorAll('.twb-border, .twb-card, .py-2');\n    items.forEach(function(item, idx){\n      var header = item.querySelector('.flex');\n      if(!header) return;\n      header.addEventListener('click', function(){\n        var content = item.querySelector('.mt-2');\n        if(!content) return;\n        var isOpen = content.style.display !== 'none' && content.innerHTML.trim() !== '';\n        // Toggle: simple display change for demo\n        content.style.display = isOpen ? 'none' : 'block';\n      });\n    });\n  })();\n</script>\n</body>\n</html>`;
    return { vue, react, svelte, angular, html };
}
