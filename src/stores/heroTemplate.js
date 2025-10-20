function fontStack(font) {
    const needsQuote = /\s/.test(font);
    const primary = needsQuote ? `'${font}'` : font;
    return `${primary}, Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif`;
}
export const defaultHeroTokens = {
    eyebrow: 'New',
    title: 'Build faster with Tailwind blocks',
    subtitle: 'Craft clean, responsive sections and export to your framework of choice.',
    primaryButtonLabel: 'Get Started',
    secondaryButtonLabel: 'Learn More',
    showSecondary: true,
    align: 'center',
    maxWidth: 'max-w-3xl',
    fontFamily: 'Inter',
    rounded: 'rounded-lg',
    primaryColor: '#3b82f6',
    secondaryColor: '#64748b',
    backgroundStyle: 'theme',
    gradientFrom: '#3b82f6',
    gradientTo: '#6366f1',
    bgImageUrl: '',
    overlayOpacity: 0.3,
    buttonStyle: 'solid',
    fullBleed: false,
};
export function buildHeroHtml(tokens) {
    const ff = fontStack(tokens.fontFamily);
    const containerAlign = tokens.align === 'center' ? 'text-center mx-auto' : 'text-left';
    const flexAlign = tokens.align === 'center' ? 'justify-center' : 'justify-start';
    // Background handling
    let bgClass = '';
    let styleAttr = '';
    if (tokens.backgroundStyle === 'gradient') {
        const from = tokens.gradientFrom || tokens.primaryColor;
        const to = tokens.gradientTo || tokens.secondaryColor || tokens.primaryColor;
        bgClass = 'bg-gradient-to-r from-[var(--c1)] to-[var(--c2)]';
        styleAttr = `style="--c1:${from};--c2:${to};"`;
    }
    else if (tokens.backgroundStyle === 'solid') {
        const color = tokens.primaryColor;
        bgClass = 'bg-[var(--solid-bg)]';
        styleAttr = `style="--solid-bg:${color};"`;
    }
    else if (tokens.backgroundStyle === 'theme') {
        bgClass = 'bg-white dark:bg-gray-900';
    }
    else if (tokens.backgroundStyle === 'image') {
        bgClass = 'bg-cover bg-center';
        const url = tokens.bgImageUrl && tokens.bgImageUrl.trim().length > 0
            ? tokens.bgImageUrl
            : 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80';
        styleAttr = `style="background-image:url('${url}');"`;
    }
    const bleedClass = tokens.fullBleed ? 'full-bleed' : '';
    const overlayOpacity = typeof tokens.overlayOpacity === 'number' ? tokens.overlayOpacity : 0.3;
    const overlay = tokens.backgroundStyle === 'image'
        ? `<div class="absolute inset-0" aria-hidden="true" style="background: rgba(0,0,0, ${overlayOpacity})"></div>`
        : '';
    // Buttons
    const primaryBtnBase = `inline-flex items-center px-8 py-3 font-medium ${tokens.rounded}`;
    let primaryBtn = '';
    const btnStyle = tokens.buttonStyle || 'solid';
    if (btnStyle === 'outline') {
        primaryBtn = `<a href="#" class="${primaryBtnBase} ring-1 ring-inset" style="font-family:${ff};color:${tokens.primaryColor};border-color:${tokens.primaryColor}">${tokens.primaryButtonLabel}</a>`;
    }
    else if (btnStyle === 'soft') {
        primaryBtn = `<a href="#" class="${primaryBtnBase} text-[color:var(--btn-color)] bg-[color:var(--btn-bg)]" style="--btn-bg:${tokens.primaryColor}20;--btn-color:${tokens.primaryColor};font-family:${ff}">${tokens.primaryButtonLabel}</a>`;
    }
    else {
        primaryBtn = `<a href="#" class="${primaryBtnBase} text-white shadow" style="background:${tokens.primaryColor};font-family:${ff}">${tokens.primaryButtonLabel}</a>`;
    }
    const secondaryBtn = tokens.showSecondary
        ? `<a href="#" class="inline-flex items-center px-8 py-3 font-medium ring-1 ring-inset transition ${tokens.rounded} text-gray-700 dark:text-white/90 ring-gray-300 dark:ring-white/40 hover:bg-gray-100 dark:hover:bg-white/10" style="font-family:${ff}">${tokens.secondaryButtonLabel || 'Learn more'}</a>`
        : '';
    return `<section class="relative overflow-hidden ${bgClass} py-24 ${bleedClass}" ${styleAttr}>
  ${overlay}
  <div class="relative z-10 px-6 ${tokens.maxWidth} ${containerAlign}">
    ${tokens.eyebrow ? `<div class=\"text-xs uppercase tracking-widest text-muted mb-2\" style=\"font-family:${ff}\">${tokens.eyebrow}</div>` : ''}
    <h1 class="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white" style="font-family:${ff}">${tokens.title}</h1>
    <p class="text-lg md:text-xl mb-10 max-w-2xl ${tokens.align === 'center' ? 'mx-auto' : ''} text-gray-600 dark:text-gray-300" style="font-family:${ff}">${tokens.subtitle}</p>
    <div class="flex flex-wrap gap-4 ${flexAlign}">
      ${primaryBtn}
      ${secondaryBtn}
    </div>
  </div>
</section>`;
}
// Generate simple multi-framework wrappers around the raw HTML for this Hero
// Note: These are string templates meant for export; they are not executed in tests.
export function generateFrameworkWrappers(html, _tokens) {
    // Vue single-file component wrapper
    const vue = `<template>\n${html}\n</template>\n<script setup lang=\"ts\"></script>`;
    // React component wrapper (basic class->className replacement)
    const reactHtml = html.replace(/class=\"/g, 'className="');
    const react = `export function Hero(){\n  return (\n    <>\n${reactHtml}\n    </>\n  );\n}`;
    // Svelte can use the HTML directly
    const svelte = html;
    // Angular component wrapper with a simple selector 'hero-wrapper'
    const angular = `import { Component } from '@angular/core';\n\n@Component({\n  selector: 'hero-wrapper',\n  standalone: true,\n  template: \`${html}\`\n})\nexport class HeroComponent {}`;
    return { vue, react, svelte, angular };
}
