export interface HeroTokens {
  title: string;
  subtitle: string;
  primaryButtonLabel: string;
  secondaryButtonLabel: string;
  showSecondary: boolean;
  primaryColor: string;
  secondaryColor: string;
  gradientFrom: string;
  gradientTo: string;
  fontFamily: string;
  rounded: string; // e.g. 'rounded-lg'
  backgroundStyle: 'gradient' | 'solid' | 'image';
  maxWidth: string; // e.g. 'max-w-3xl'
  align: 'center' | 'left';
}

export const defaultHeroTokens: HeroTokens = {
  title: 'Build Amazing Products',
  subtitle: 'Create beautiful, responsive components with our visual editor',
  primaryButtonLabel: 'Get Started',
  secondaryButtonLabel: 'Learn More',
  showSecondary: true,
  primaryColor: '#3b82f6',
  secondaryColor: '#6366f1',
  gradientFrom: '#3b82f6',
  gradientTo: '#6366f1',
  fontFamily: 'Inter',
  rounded: 'rounded-lg',
  backgroundStyle: 'gradient',
  maxWidth: 'max-w-3xl',
  align: 'center'
};

export function buildHeroHtml(tokens: HeroTokens): string {
  const containerAlign = tokens.align === 'center' ? 'text-center mx-auto' : 'text-left';
  const flexAlign = tokens.align === 'center' ? 'justify-center' : 'justify-start';
  const bg = tokens.backgroundStyle === 'gradient'
    ? `bg-gradient-to-r from-[${tokens.gradientFrom}] to-[${tokens.gradientTo}]`
    : tokens.backgroundStyle === 'solid'
      ? `bg-[${tokens.primaryColor}]`
      : 'bg-cover bg-center';

  const imageStyle = tokens.backgroundStyle === 'image'
    ? `style=\"background-image:url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1400&q=80');\"`
    : '';

  return `<section class=\"relative overflow-hidden ${bg} py-24 full-bleed\" ${imageStyle}>
  <div class=\"relative z-10 px-6 ${tokens.maxWidth} ${containerAlign}\">
    <h1 class=\"text-4xl md:text-5xl font-bold tracking-tight mb-6 text-gray-900 dark:text-white\" style=\"font-family:${tokens.fontFamily}\">${tokens.title}</h1>
    <p class=\"text-lg md:text-xl mb-10 max-w-2xl ${tokens.align === 'center' ? 'mx-auto' : ''} text-gray-600 dark:text-gray-300\" style=\"font-family:${tokens.fontFamily}\">${tokens.subtitle}</p>
    <div class=\"flex flex-wrap gap-4 ${flexAlign}\">
      <a href=\"#\" class=\"inline-flex items-center px-8 py-3 font-medium text-white shadow ${tokens.rounded}\" style=\"background:${tokens.primaryColor};font-family:${tokens.fontFamily}\">${tokens.primaryButtonLabel}</a>
      ${tokens.showSecondary ? `<a href=\"#\" class=\"inline-flex items-center px-8 py-3 font-medium ring-1 ring-inset transition ${tokens.rounded} text-gray-700 dark:text-white/90 ring-gray-300 dark:ring-white/40 hover:bg-gray-100 dark:hover:bg-white/10\" style=\"font-family:${tokens.fontFamily}\">${tokens.secondaryButtonLabel}</a>` : ''}
    </div>
  </div>
  <div class=\"absolute inset-0 bg-black/30\" aria-hidden=\"true\" style=\"display:${tokens.backgroundStyle === 'image' ? 'block' : 'none'}\"></div>
</section>`;
}

export interface MultiFrameworkCode {
  vue: string;
  react: string;
  svelte: string;
  angular: string;
  html: string;
}

export function generateFrameworkWrappers(html: string, tokens: HeroTokens): MultiFrameworkCode {
  const vue = `<template>\n${html}\n</template>\n\n<script setup lang=\"ts\">\n// No logic required for static hero.\n</script>`;
  const react = `export function Hero(){\n  return (\n    <>\n      ${html.replace(/class=\\"/g, 'className=\"')}\n    </>\n  );\n}`;
  const svelte = `${html}`;
  const angular = `<div class=\"hero-wrapper\">\n${html}\n</div>`;
  const fullHtml = html;
  return { vue, react, svelte, angular, html: fullHtml };
}
