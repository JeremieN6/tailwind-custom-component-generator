import { themeVariablesStyle, useThemeStore } from './theme';
function fontStack(font) {
    const needsQuote = /\s/.test(font);
    const primary = needsQuote ? `'${font}'` : font;
    return `${primary}, Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif`;
}
export const defaultTabsTokens = {
    labels: 'Overview,Details,FAQ',
    activeIndex: 0,
    variant: 'underline',
    rounded: 'rounded-lg',
    fontFamily: 'Inter',
    primaryColor: '#3b82f6',
};
export function buildTabsHtml(t) {
    const labels = t.labels.split(',').map(s => s.trim()).filter(Boolean);
    const ff = fontStack(t.fontFamily);
    const isCards = t.variant === 'cards';
    const tabs = labels.map((lbl, i) => {
        const active = i === (t.activeIndex ?? 0);
        const color = active ? t.primaryColor : '#94a3b8';
        return `<button type=\"button\" class=\"px-3 py-2 text-sm\" data-tab=\"${i}\" style=\"color:${color}\">${lbl}</button>`;
    }).join('');
    const panels = labels.map((lbl, i) => {
        const active = i === (t.activeIndex ?? 0);
        const inner = `<div class=\"twb-text-muted text-sm\">Content for ${lbl}</div>`;
        return `<div data-panel=\"${i}\" style=\"display:${active ? 'block' : 'none'};font-family:${ff}\">${isCards ? `<div class=\\"twb-card p-4 ${t.rounded}\\">${inner}</div>` : inner}</div>`;
    }).join('');
    return `<section class=\"py-16\"><div class=\"px-6 max-w-4xl mx-auto\"><div data-tabs style=\"font-family:${ff}\"><div class=\"flex items-center gap-4 twb-border pb-2\" style=\"border-color:${t.primaryColor}30\">${tabs}</div><div class=\"mt-4\">${panels}</div></div></div></section>`;
}
export function generateTabsFrameworks(tokens) {
    const theme = useThemeStore();
    const vars = themeVariablesStyle(theme.tokens);
    const fonts = `<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=Open+Sans:wght@400;600;700&display=swap\" rel=\"stylesheet\">`;
    const style = `<style>${vars}</style>`;
    const ff = fontStack(tokens.fontFamily);
    const labels = tokens.labels.split(',').map(s => s.trim()).filter(Boolean);
    // Vue
    const vue = `<template>\n  <section class=\"py-16\">\n    <div class=\"px-6 max-w-4xl mx-auto\">\n      <div style=\"font-family:${ff}\">\n        <div class=\"flex items-center gap-4 twb-border pb-2\" style=\"border-color:${tokens.primaryColor}30\">\n          <button v-for=\"(lbl,i) in labels\" :key=\"i\" type=\"button\" class=\"px-3 py-2 text-sm\" :style=\"{ color: i===active ? '${tokens.primaryColor}' : '#94a3b8' }\" @click=\"active=i\">{{ lbl }}</button>\n        </div>\n        <div class=\"mt-4\">\n          <div v-for=\"(lbl,i) in labels\" :key=\"'p'+i\" v-show=\"i===active\">\n            ${tokens.variant === 'cards' ? `<div class=\\"twb-card p-4 ${tokens.rounded}\\"><div class=\\"twb-text-muted text-sm\\">Content for {{ lbl }}</div></div>` : `<div class=\\"twb-text-muted text-sm\\">Content for {{ lbl }}</div>`}\n          </div>\n        </div>\n      </div>\n    </div>\n  </section>\n</template>\n<script setup lang=\"ts\">\nimport { ref } from 'vue'\nconst labels = ${JSON.stringify(labels)}\nconst active = ref(${tokens.activeIndex ?? 0})\n</script>\n<!-- Include in <head>: -->\n${fonts}\n${style}`;
    // React
    const react = `import { useState } from 'react'\nexport function Tabs(){\n  const labels = ${JSON.stringify(labels)}\n  const [active, setActive] = useState(${tokens.activeIndex ?? 0})\n  return (\n    <section className=\"py-16\">\n      <div className=\"px-6 max-w-4xl mx-auto\">\n        <div style={{fontFamily:'${ff}'}}>\n          <div className=\"flex items-center gap-4 twb-border pb-2\" style={{borderColor:'${tokens.primaryColor}30'}}>\n            {labels.map((lbl,i)=> (<button key={i} type=\"button\" className=\"px-3 py-2 text-sm\" style={{color: i===active ? '${tokens.primaryColor}' : '#94a3b8'}} onClick={()=>setActive(i)}>{lbl}</button>))}\n          </div>\n          <div className=\"mt-4\">\n            {labels.map((lbl,i)=> i===active && (${tokens.variant === 'cards' ? `<div className=\\"twb-card p-4 ${tokens.rounded}\\"><div className=\\"twb-text-muted text-sm\\">Content for {lbl}</div></div>` : `<div className=\\"twb-text-muted text-sm\\">Content for {lbl}</div>`}))}\n          </div>\n        </div>\n      </div>\n    </section>\n  )\n}\n// Include in <head>:\n// ${fonts}\n// ${style}`;
    // Svelte
    const svelte = `<svelte:head>\n${fonts}\n${style}\n</svelte:head>\n<script>\n  let labels = ${JSON.stringify(labels)}\n  let active = ${tokens.activeIndex ?? 0}\n</script>\n<section class=\"py-16\">\n  <div class=\"px-6 max-w-4xl mx-auto\">\n    <div style=\"font-family:${ff}\">\n      <div class=\"flex items-center gap-4 twb-border pb-2\" style=\"border-color:${tokens.primaryColor}30\">\n        {#each labels as lbl, i}\n          <button type=\"button\" class=\"px-3 py-2 text-sm\" style=\"color:{i===active ? '${tokens.primaryColor}' : '#94a3b8'}\" on:click=\"{()=> active=i}\">{lbl}</button>\n        {/each}\n      </div>\n      <div class=\"mt-4\">\n        {#each labels as lbl, i}\n          {#if i===active}\n            ${tokens.variant === 'cards' ? `<div class=\\"twb-card p-4 ${tokens.rounded}\\"><div class=\\"twb-text-muted text-sm\\">Content for {lbl}</div></div>` : `<div class=\\"twb-text-muted text-sm\\">Content for {lbl}</div>`}\n          {/if}\n        {/each}\n      </div>\n    </div>\n  </div>\n</section>`;
    // Angular
    const angular = `import { Component } from '@angular/core';\n\n@Component({\n  selector: 'tabs-wrapper',\n  standalone: true,\n  template: \`<section class=\\"py-16\\">\n    <div class=\\"px-6 max-w-4xl mx-auto\\">\n      <div style=\\"font-family:${ff}\\">\n        <div class=\\"flex items-center gap-4 twb-border pb-2\\" [ngStyle]=\\"{ 'border-color': '${tokens.primaryColor}30' }\\">\n          <button type=\\"button\\" class=\\"px-3 py-2 text-sm\\" *ngFor=\\"let lbl of labels; index as i\\" [ngStyle]=\\"{ color: i===active ? '${tokens.primaryColor}' : '#94a3b8' }\\" (click)=\\"active=i\">{{ lbl }}</button>\n        </div>\n        <div class=\\"mt-4\\">\n          <ng-container *ngFor=\\"let lbl of labels; index as i\\">\n            <div *ngIf=\\"i===active\\">${tokens.variant === 'cards' ? `<div class=\\\\\"twb-card p-4 ${tokens.rounded}\\\\\"><div class=\\\\\"twb-text-muted text-sm\\\\\">Content for {{ lbl }}</div></div>` : `<div class=\\\\\"twb-text-muted text-sm\\\\\">Content for {{ lbl }}</div>`}</div>\n          </ng-container>\n        </div>\n      </div>\n    </div>\n  </section>\`,\n  styles: [\`${vars}\`]\n})\nexport class TabsComponent {\n  labels: string[] = ${JSON.stringify(labels)};\n  active = ${tokens.activeIndex ?? 0};\n}`;
    // Plain HTML
    const html = `<!doctype html>\n<html>\n<head>\n${fonts}\n${style}\n<script src=\"https://cdn.tailwindcss.com\"><\/script>\n</head>\n<body>\n${buildTabsHtml(tokens)}\n<script>\n(function(){\n  var root = document.querySelector('[data-tabs]');\n  if(!root) return;\n  var buttons = root.querySelectorAll('[data-tab]');\n  var panels = root.querySelectorAll('[data-panel]');\n  buttons.forEach(function(btn){\n    btn.addEventListener('click', function(){\n      var idx = parseInt(btn.getAttribute('data-tab')||'0',10);\n      buttons.forEach(function(b,bi){ (b as any).style.color = (bi===idx)? '${tokens.primaryColor}':'#94a3b8'; });\n      panels.forEach(function(p,pi){ (p as any).style.display = (pi===idx)? 'block':'none'; });\n    });\n  });\n})();\n</script>\n</body>\n</html>`;
    return { vue, react, svelte, angular, html };
}
