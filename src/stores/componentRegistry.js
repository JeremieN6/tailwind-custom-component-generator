// Import uniquement la fonction de construction Hero (les types ne sont pas nécessaires ici au runtime)
import { buildHeroHtml } from './heroTemplate';
function fontStack(font) {
    const needsQuote = /\s/.test(font);
    const primary = needsQuote ? `'${font}'` : font;
    return `${primary}, Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif`;
}
const ctaDefaults = {
    title: 'Ready to get started?',
    subtitle: 'Join thousands of developers building better products',
    buttonLabel: 'Start Building',
    align: 'center',
    width: 'max-w-2xl',
    fontFamily: 'Inter',
    primaryColor: '#3b82f6',
    accentColor: '#f59e0b',
    rounded: 'rounded-lg'
};
function buildCtaHtml(t) {
    const align = t.align === 'center' ? 'text-center mx-auto' : 'text-left';
    const ff = fontStack(t.fontFamily);
    return `<section class=\"py-20\"><div class=\"px-6 ${t.width} ${align}\"><h2 class=\"text-4xl font-bold mb-6 text-gray-900 dark:text-white\" style=\"font-family:${ff}\">${t.title}</h2><p class=\"text-lg text-gray-600 dark:text-gray-300 mb-8\" style=\"font-family:${ff}\">${t.subtitle}</p><a href=\"#\" class=\"inline-flex px-8 py-3 text-white font-medium ${t.rounded}\" style=\"background:${t.primaryColor};font-family:${ff}\">${t.buttonLabel}</a></div></section>`;
}
const pricingDefaults = {
    title: 'Simple Pricing',
    subtitle: "Choose the plan that's right for you",
    highlightLabel: 'Popular',
    priceA: '$39',
    priceB: '$99',
    priceC: '$199',
    fontFamily: 'Inter',
    primaryColor: '#3b82f6',
    secondaryColor: '#64748b',
    accentColor: '#f59e0b',
    rounded: 'rounded-lg'
};
function buildPricingHtml(t) {
    const ff = fontStack(t.fontFamily);
    return `<section class=\"py-24\"><div class=\"px-6 max-w-5xl mx auto text-center mb-14\"><h2 class=\"text-4xl font-bold mb-4 text-gray-900 dark:text-white\" style=\"font-family:${ff}\">${t.title}</h2><p class=\"text-lg text-gray-600 dark:text-gray-300\" style=\"font-family:${ff}\">${t.subtitle}</p></div><div class=\"grid md:grid-cols-3 gap-8 max-w-5xl mx-auto\">${['Starter', 'Pro', 'Enterprise'].map((plan, i) => { const price = [t.priceA, t.priceB, t.priceC][i]; const highlight = i === 1; const borderClass = highlight ? `style=\\\"border-color:${t.primaryColor}\\\" border-2` : 'border border-gray-200 dark:border-gray-700'; const badge = highlight ? `<div class=\\\"absolute -top-3 left-1/2 -translate-x-1/2 text-white text-xs px-3 py-1 rounded-full\\\" style=\\\"background:${t.primaryColor}\\\">${t.highlightLabel}</div>` : ''; return `<div class=\"${borderClass} p-6 ${t.rounded} text-center relative\">${badge}<h3 class=\"text-xl font-semibold mb-4 text-gray-900 dark:text-white\" style=\"font-family:${ff}\">${plan}</h3><div class=\"text-3xl font-bold mb-4\" style=\"color:${highlight ? t.primaryColor : t.secondaryColor};font-family:${ff}\">${price}</div><a href=\"#\" class=\"inline-flex w-full justify-center px-4 py-2 text-sm font-medium ${highlight ? 'text-white' : ''} ${t.rounded} border transition\" style=\"background:${highlight ? t.primaryColor : 'transparent'};border-color:${t.primaryColor};color:${highlight ? 'white' : t.primaryColor};font-family:${ff}\">Choose Plan</a></div>`; }).join('')}</div></section>`;
}
const featuresDefaults = {
    title: 'Powerful Features',
    subtitle: 'Everything you need to build amazing products',
    items: 'Fast,Secure,Scalable',
    fontFamily: 'Inter',
    primaryColor: '#3b82f6',
    accentColor: '#f59e0b',
    secondaryColor: '#6366f1'
};
function buildFeaturesHtml(t) {
    const list = t.items.split(',').map(s => s.trim());
    const ff = fontStack(t.fontFamily);
    return `<section class=\"py-24\"><div class=\"px-6 max-w-4xl mx-auto text-center mb-16\"><h2 class=\"text-4xl font-bold mb-4 text-gray-900 dark:text-white\" style=\"font-family:${ff}\">${t.title}</h2><p class=\"text-lg text-gray-600 dark:text-gray-300\" style=\"font-family:${ff}\">${t.subtitle}</p></div><div class=\"grid md:grid-cols-3 gap-10 max-w-5xl mx-auto\">${list.map((label, i) => { const color = [t.primaryColor, t.accentColor, t.secondaryColor || t.primaryColor][i % 3]; return `<div class=\"text-center\"><div class=\"w-14 h-14 mx-auto mb-4 rounded-lg flex items-center justify-center\" style=\"background:${color}20\"><div class=\"w-7 h-7 rounded\" style=\"background:${color}\"></div></div><h3 class=\"text-xl font-semibold mb-2 text-gray-900 dark:text-white\" style=\"font-family:${ff}\">${label}</h3><p class=\"text-gray-600 dark:text-gray-300 text-sm\">Lorem ipsum dolor sit amet.</p></div>`; }).join('')}</div></section>`;
}
const faqDefaults = { title: 'Frequently Asked Questions', subtitle: 'Get answers to common questions', questions: 'How does it work?,Is it customizable?,What frameworks are supported?', variant: 'bordered', openFirst: false, rounded: 'rounded-lg', fontFamily: 'Inter', primaryColor: '#3b82f6' };
function buildFaqHtml(t) {
    const qs = t.questions.split(',').map(q => q.trim());
    const ff = fontStack(t.fontFamily);
    const wrapper = t.variant === 'cards' ? 'grid md:grid-cols-2 gap-4' : 'space-y-4';
    return `<section class=\"py-24\"><div class=\"px-6 max-w-4xl mx-auto text-center mb-14\"><h2 class=\"text-4xl font-bold mb-4 text-gray-900 dark:text-white\" style=\"font-family:${ff}\">${t.title}</h2><p class=\"text-lg text-gray-600 dark:text-gray-300\" style=\"font-family:${ff}\">${t.subtitle}</p></div><div class=\"max-w-3xl mx-auto ${wrapper}\">${qs.map((q, i) => {
        const open = t.openFirst && i === 0;
        if (t.variant === 'cards') {
            return `<div class=\"border border-gray-200 dark:border-gray-700 p-5 ${t.rounded} bg-white dark:bg-gray-900\" style=\"font-family:${ff}\"><div class=\"font-medium text-gray-900 dark:text-white mb-2\">${q}</div><div class=\"text-sm text-gray-600 dark:text-gray-300\">Lorem ipsum dolor sit amet.</div></div>`;
        }
        if (t.variant === 'plain') {
            return `<div class=\"py-2\" style=\"font-family:${ff}\"><div class=\"font-medium text-gray-900 dark:text-white\">${q}</div></div>`;
        }
        // bordered (default)
        return `<div class=\"border border-gray-200 dark:border-gray-700 p-4 ${t.rounded}\" style=\"border-color:${t.primaryColor}30;font-family:${ff}\"><div class=\"flex justify-between items-center\"><span class=\"text-gray-900 dark:text-white\">${q}</span><span class=\"w-6 h-6 flex items-center justify-center rounded-full text-white text-sm\" style=\"background:${t.primaryColor}\">${open ? '-' : '+'}</span></div>${open ? `<div class=\"mt-2 text-sm text-gray-600 dark:text-gray-300\">Lorem ipsum dolor sit amet.</div>` : ''}</div>`;
    }).join('')}</div></section>`;
}
const testimonialsDefaults = { title: 'What Our Customers Say', subtitle: 'Trusted by developers worldwide', names: 'John Doe,Jane Smith,Mike Johnson', fontFamily: 'Inter', primaryColor: '#3b82f6', accentColor: '#f59e0b' };
function buildTestimonialsHtml(t) {
    const names = t.names.split(',').map(n => n.trim());
    const ff = fontStack(t.fontFamily);
    return `<section class="py-24 bg-gray-50 dark:bg-gray-900"><div class="px-6 max-w-4xl mx-auto text-center mb-14"><h2 class="text-4xl font-bold mb-4 text-gray-900 dark:text-white" style="font-family:${ff}">${t.title}</h2><p class="text-lg text-gray-600 dark:text-gray-300" style="font-family:${ff}">${t.subtitle}</p></div><div class="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">${names.map((n, i) => { const color = [t.primaryColor, t.accentColor, t.secondaryColor || t.primaryColor][i % 3]; return `<div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 p-6 rounded-lg shadow-sm"><div class="flex mb-4">${Array.from({ length: 5 }).map(() => `<div class=\"w-4 h-4 mr-1 rounded\" style=\"background:${t.accentColor}\"></div>`).join('')}</div><p class="text-gray-600 dark:text-gray-300 mb-4 text-sm">"Amazing tool for rapid prototyping!"</p><div class="flex items-center"><div class="w-10 h-10 rounded-full mr-3" style="background:${color}"></div><div><div class="font-semibold text-gray-900 dark:text-white" style="font-family:${ff}">${n}</div><div class="text-xs text-gray-500 dark:text-gray-400">Customer</div></div></div></div>`; }).join('')}</div></section>`;
}
// Hero reuse existing tokens & builder
import { defaultHeroTokens } from './heroTemplate';
export const componentRegistry = [
    {
        id: 'hero',
        label: 'Hero',
        category: 'Hero',
        description: 'Prominent marketing section',
        defaults: defaultHeroTokens,
        fields: [
            { key: 'eyebrow', label: 'Eyebrow', type: 'text' },
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
            { key: 'primaryButtonLabel', label: 'Primary Button', type: 'text' },
            { key: 'secondaryButtonLabel', label: 'Secondary Button', type: 'text', condition: (t) => t.showSecondary },
            { key: 'showSecondary', label: 'Show Secondary', type: 'boolean' },
            { key: 'align', label: 'Align', type: 'select', options: [{ label: 'Center', value: 'center' }, { label: 'Left', value: 'left' }] },
            { key: 'maxWidth', label: 'Max Width', type: 'select', options: [{ label: '2XL', value: 'max-w-2xl' }, { label: '3XL', value: 'max-w-3xl' }, { label: '4XL', value: 'max-w-4xl' }] },
            { key: 'primaryColor', label: 'Primary Color', type: 'color' },
            { key: 'secondaryColor', label: 'Secondary Color', type: 'color' },
            { key: 'gradientFrom', label: 'Gradient From', type: 'color' },
            { key: 'gradientTo', label: 'Gradient To', type: 'color' },
            { key: 'buttonStyle', label: 'Primary Button Style', type: 'select', options: [{ label: 'Solid', value: 'solid' }, { label: 'Outline', value: 'outline' }, { label: 'Soft', value: 'soft' }] },
            { key: 'fontFamily', label: 'Font Family', type: 'select', options: [{ label: 'Inter', value: 'Inter' }, { label: 'Poppins', value: 'Poppins' }, { label: 'Roboto', value: 'Roboto' }, { label: 'Open Sans', value: 'Open Sans' }] },
            { key: 'rounded', label: 'Rounded', type: 'select', options: [{ label: 'None', value: 'rounded-none' }, { label: 'Default', value: 'rounded' }, { label: 'md', value: 'rounded-md' }, { label: 'lg', value: 'rounded-lg' }, { label: 'xl', value: 'rounded-xl' }, { label: 'Full', value: 'rounded-full' }] },
            { key: 'backgroundStyle', label: 'Background Style', type: 'select', options: [{ label: 'Theme (follows UI)', value: 'theme' }, { label: 'Gradient', value: 'gradient' }, { label: 'Solid', value: 'solid' }, { label: 'Image', value: 'image' }] },
            { key: 'bgImageUrl', label: 'Background Image URL', type: 'text', condition: (t) => t.backgroundStyle === 'image' },
            { key: 'overlayOpacity', label: 'Overlay Opacity (0..1)', type: 'text', condition: (t) => t.backgroundStyle === 'image' },
            { key: 'fullBleed', label: 'Full Bleed', type: 'boolean' }
        ],
        build: (tokens) => buildHeroHtml(tokens)
    },
    {
        id: 'cta',
        label: 'CTA',
        category: 'Marketing',
        description: 'Call to action block',
        defaults: ctaDefaults,
        fields: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
            { key: 'buttonLabel', label: 'Button Label', type: 'text' },
            { key: 'align', label: 'Align', type: 'select', options: [{ label: 'Center', value: 'center' }, { label: 'Left', value: 'left' }] },
            { key: 'width', label: 'Width', type: 'select', options: [{ label: '2XL', value: 'max-w-2xl' }, { label: '3XL', value: 'max-w-3xl' }] },
            { key: 'primaryColor', label: 'Primary Color', type: 'color' },
            { key: 'fontFamily', label: 'Font Family', type: 'select', options: [{ label: 'Inter', value: 'Inter' }, { label: 'Poppins', value: 'Poppins' }, { label: 'Roboto', value: 'Roboto' }, { label: 'Open Sans', value: 'Open Sans' }] },
            { key: 'rounded', label: 'Rounded', type: 'select', options: [{ label: 'None', value: 'rounded-none' }, { label: 'Default', value: 'rounded' }, { label: 'lg', value: 'rounded-lg' }] }
        ],
        build: (t) => buildCtaHtml(t)
    },
    {
        id: 'pricing',
        label: 'Pricing',
        category: 'Marketing',
        description: '3-tier pricing grid',
        defaults: pricingDefaults,
        fields: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
            { key: 'highlightLabel', label: 'Highlight Label', type: 'text' },
            { key: 'priceA', label: 'Price A', type: 'text' },
            { key: 'priceB', label: 'Price B', type: 'text' },
            { key: 'priceC', label: 'Price C', type: 'text' },
            { key: 'primaryColor', label: 'Primary Color', type: 'color' },
            { key: 'secondaryColor', label: 'Secondary Color', type: 'color' },
            { key: 'fontFamily', label: 'Font Family', type: 'select', options: [{ label: 'Inter', value: 'Inter' }, { label: 'Poppins', value: 'Poppins' }, { label: 'Open Sans', value: 'Open Sans' }] },
            { key: 'rounded', label: 'Rounded', type: 'select', options: [{ label: 'None', value: 'rounded-none' }, { label: 'Default', value: 'rounded' }, { label: 'lg', value: 'rounded-lg' }] }
        ],
        build: (t) => buildPricingHtml(t)
    },
    {
        id: 'features',
        label: 'Features',
        category: 'Content',
        description: 'Feature grid',
        defaults: featuresDefaults,
        fields: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
            { key: 'items', label: 'Items (comma list)', type: 'text' },
            { key: 'primaryColor', label: 'Primary Color', type: 'color' },
            { key: 'secondaryColor', label: 'Secondary Color', type: 'color' },
            { key: 'accentColor', label: 'Accent Color', type: 'color' },
            { key: 'fontFamily', label: 'Font Family', type: 'select', options: [{ label: 'Inter', value: 'Inter' }, { label: 'Roboto', value: 'Roboto' }, { label: 'Open Sans', value: 'Open Sans' }] }
        ],
        build: (t) => buildFeaturesHtml(t)
    },
    {
        id: 'faq',
        label: 'FAQ',
        category: 'Content',
        description: 'Accordion questions',
        defaults: faqDefaults,
        fields: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
            { key: 'questions', label: 'Questions (comma list)', type: 'text' },
            { key: 'variant', label: 'Style', type: 'select', options: [{ label: 'Bordered', value: 'bordered' }, { label: 'Cards', value: 'cards' }, { label: 'Plain', value: 'plain' }] },
            { key: 'openFirst', label: 'Open first item', type: 'boolean' },
            { key: 'rounded', label: 'Rounded', type: 'select', options: [{ label: 'Default', value: 'rounded' }, { label: 'lg', value: 'rounded-lg' }, { label: 'xl', value: 'rounded-xl' }] },
            { key: 'primaryColor', label: 'Primary Color', type: 'color' },
            { key: 'fontFamily', label: 'Font Family', type: 'select', options: [{ label: 'Inter', value: 'Inter' }, { label: 'Roboto', value: 'Roboto' }, { label: 'Open Sans', value: 'Open Sans' }] }
        ],
        build: (t) => buildFaqHtml(t)
    },
    {
        id: 'testimonials',
        label: 'Testimonials',
        category: 'Content',
        description: 'Customer quotes',
        defaults: testimonialsDefaults,
        fields: [
            { key: 'title', label: 'Title', type: 'text' },
            { key: 'subtitle', label: 'Subtitle', type: 'textarea' },
            { key: 'names', label: 'Names (comma list)', type: 'text' },
            { key: 'primaryColor', label: 'Primary Color', type: 'color' },
            { key: 'secondaryColor', label: 'Secondary Color', type: 'color' },
            { key: 'accentColor', label: 'Accent Color', type: 'color' },
            { key: 'fontFamily', label: 'Font Family', type: 'select', options: [{ label: 'Inter', value: 'Inter' }, { label: 'Poppins', value: 'Poppins' }, { label: 'Open Sans', value: 'Open Sans' }] }
        ],
        build: (t) => buildTestimonialsHtml(t)
    }
];
import { themeVariablesStyle, useThemeStore } from './theme';
export function generateFrameworks(html) {
    const theme = useThemeStore();
    const vars = themeVariablesStyle(theme.tokens);
    const fonts = `<link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">\n<link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>\n<link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=Open+Sans:wght@400;600;700&display=swap\" rel=\"stylesheet\">`;
    const style = `<style>${vars}</style>`;
    const vue = `<template>\n${html}\n</template>\n<script setup lang=\"ts\"></script>\n<!-- Include in <head>: -->\n${fonts}\n${style}`;
    const react = `export function Component(){\n  return (<>\n${html.replace(/class=\\\"/g, 'className=\"')}\n  </>);\n}\n// Include in <head>:\n// ${fonts}\n// ${style}`;
    const svelte = html;
    const angular = `<div class=\"wrapper\">\n${html}\n</div>`;
    const plain = `<!doctype html>\n<html>\n<head>\n${fonts}\n${style}\n<script src=\"https://cdn.tailwindcss.com\"><\/script>\n</head>\n<body>\n${html}\n</body>\n</html>`;
    return { vue, react, svelte, angular, html: plain };
}
const navbarDefaults = {
    brand: 'BrandName',
    links: 'Features,Pricing,Docs,Contact',
    ctaLabel: 'Sign in',
    sticky: false,
    transparent: false,
    fontFamily: 'Inter',
    primaryColor: '#3b82f6',
};
function buildNavbarHtml(t) {
    const items = t.links.split(',').map(s => s.trim());
    const ff = fontStack(t.fontFamily);
    const wrapClass = [t.sticky ? 'sticky top-0 z-40 shadow-sm' : '', t.transparent ? 'bg-transparent' : 'bg-white dark:bg-gray-900'].filter(Boolean).join(' ');
    return `<nav class="${wrapClass}"><div class="py-4 px-6 max-w-6xl mx-auto flex items-center justify-between"><div class="text-lg font-semibold text-gray-900 dark:text-white" style="font-family:${ff}">${t.brand}</div><ul class="hidden md:flex items-center gap-6 text-sm" style="font-family:${ff}">${items.map(i => `<li><a href="#" class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">${i}</a></li>`).join('')}</ul><div class="flex items-center gap-3"><a href="#" class="hidden md:inline-flex px-4 py-2 text-sm rounded border" style="border-color:${t.primaryColor};color:${t.primaryColor};font-family:${ff}">${t.ctaLabel}</a><a href="#" class="md:hidden inline-flex items-center justify-center w-9 h-9 rounded border border-gray-300 dark:border-gray-600" style="border-color:${t.primaryColor}50">☰</a></div></div></nav>`;
}
const footerDefaults = { copyright: '© 2025 Your Company. All rights reserved.', fontFamily: 'Inter', primaryColor: '#3b82f6' };
function buildFooterHtml(t) {
    const ff = fontStack(t.fontFamily);
    return `<footer class="py-10 bg-gray-50 dark:bg-gray-900"><div class="px-6 max-w-6xl mx-auto text-center text-sm text-gray-600 dark:text-gray-400" style="font-family:${ff}">${t.copyright}</div></footer>`;
}
const blogDefaults = { title: 'Latest Articles', subtitle: 'Insights and tutorials', posts: 'Design Systems,Build Faster,Ship Confidently', fontFamily: 'Inter', primaryColor: '#3b82f6' };
function buildBlogHtml(t) {
    const posts = t.posts.split(',').map(s => s.trim());
    const ff = fontStack(t.fontFamily);
    return `<section class="py-24"><div class="px-6 max-w-5xl mx-auto text-center mb-14"><h2 class="text-4xl font-bold mb-2 text-gray-900 dark:text-white" style="font-family:${ff}">${t.title}</h2><p class="text-gray-600 dark:text-gray-300" style="font-family:${ff}">${t.subtitle}</p></div><div class="grid sm:grid-cols-2 md:grid-cols-3 gap-6 max-w-5xl mx-auto">${posts.map(p => `<article class="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden bg-white dark:bg-gray-900"><div class="h-28 bg-gray-200 dark:bg-gray-800"></div><div class="p-4"><h3 class="font-semibold mb-1 text-gray-900 dark:text-white" style="font-family:${ff}">${p}</h3><p class="text-xs text-gray-500 dark:text-gray-400">Lorem ipsum dolor sit amet.</p></div></article>`).join('')}</div></section>`;
}
const mediaTextDefaults = { title: 'Beautifully simple', text: 'Craft clean, responsive sections with ease.', imageUrl: 'https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?q=80&w=1200&auto=format&fit=crop', align: 'right', fontFamily: 'Inter', primaryColor: '#3b82f6', rounded: 'rounded-xl' };
function buildMediaTextHtml(t) {
    const orderA = t.align === 'left' ? 'md:order-1' : 'md:order-2';
    const orderB = t.align === 'left' ? 'md:order-2' : 'md:order-1';
    const ff = fontStack(t.fontFamily);
    return `<section class="py-24"><div class="px-6 max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center"><div class="${orderA}"><img src="${t.imageUrl}" alt="" class="w-full h-64 object-cover ${t.rounded}"></div><div class="${orderB}"><h2 class="text-3xl font-bold mb-3 text-gray-900 dark:text-white" style="font-family:${ff}">${t.title}</h2><p class="text-gray-600 dark:text-gray-300 mb-6" style="font-family:${ff}">${t.text}</p><a href="#" class="inline-flex px-5 py-2 text-white ${t.rounded}" style="background:${t.primaryColor};font-family:${ff}">Learn more</a></div></div></section>`;
}
// Push into registry
componentRegistry.push({
    id: 'navbar',
    label: 'Navbar',
    category: 'Layout',
    description: 'Top navigation bar',
    defaults: navbarDefaults,
    fields: [
        { key: 'brand', label: 'Brand', type: 'text' },
        { key: 'links', label: 'Links (comma list)', type: 'text' },
        { key: 'ctaLabel', label: 'CTA Label', type: 'text' },
        { key: 'sticky', label: 'Sticky', type: 'boolean' },
        { key: 'transparent', label: 'Transparent', type: 'boolean' },
        { key: 'fontFamily', label: 'Font Family', type: 'select', options: [{ label: 'Inter', value: 'Inter' }, { label: 'Roboto', value: 'Roboto' }, { label: 'Open Sans', value: 'Open Sans' }] },
        { key: 'primaryColor', label: 'Primary Color', type: 'color' }
    ],
    build: (t) => buildNavbarHtml(t)
}, {
    id: 'footer',
    label: 'Footer',
    category: 'Layout',
    description: 'Simple footer',
    defaults: footerDefaults,
    fields: [
        { key: 'copyright', label: 'Copyright', type: 'text' },
        { key: 'fontFamily', label: 'Font Family', type: 'select', options: [{ label: 'Inter', value: 'Inter' }, { label: 'Roboto', value: 'Roboto' }, { label: 'Open Sans', value: 'Open Sans' }] }
    ],
    build: (t) => buildFooterHtml(t)
}, {
    id: 'blog',
    label: 'Blog Cards',
    category: 'Content',
    description: 'Grid of blog teasers',
    defaults: blogDefaults,
    fields: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'subtitle', label: 'Subtitle', type: 'text' },
        { key: 'posts', label: 'Posts (comma list)', type: 'text' },
        { key: 'fontFamily', label: 'Font Family', type: 'select', options: [{ label: 'Inter', value: 'Inter' }, { label: 'Roboto', value: 'Roboto' }, { label: 'Open Sans', value: 'Open Sans' }] }
    ],
    build: (t) => buildBlogHtml(t)
}, {
    id: 'media-text',
    label: 'Media + Text',
    category: 'Content',
    description: 'Paragraph with image',
    defaults: mediaTextDefaults,
    fields: [
        { key: 'title', label: 'Title', type: 'text' },
        { key: 'text', label: 'Text', type: 'textarea' },
        { key: 'imageUrl', label: 'Image URL', type: 'text' },
        { key: 'align', label: 'Image align', type: 'select', options: [{ label: 'Left', value: 'left' }, { label: 'Right', value: 'right' }] },
        { key: 'primaryColor', label: 'Primary Color', type: 'color' },
        { key: 'rounded', label: 'Rounded', type: 'select', options: [{ label: 'Default', value: 'rounded' }, { label: 'lg', value: 'rounded-lg' }, { label: 'xl', value: 'rounded-xl' }] }
    ],
    build: (t) => buildMediaTextHtml(t)
});
