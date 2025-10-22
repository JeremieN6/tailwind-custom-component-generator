import { themeVariablesStyle, useThemeStore } from './theme';
function fontsLinks() {
    return `<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">`;
}
function toReactJsx(html) {
    return html.replace(/class=\"/g, 'className="');
}
function ensureScriptTag(snippet) {
    const isTag = /<script[\s>]/i.test(snippet.trim());
    return isTag ? snippet : `<script>\n${snippet}\n<\/script>`;
}
export function aggregatePageFrameworks(blocks) {
    const theme = useThemeStore();
    const vars = themeVariablesStyle(theme.tokens);
    const fonts = fontsLinks();
    const style = `<style>${vars}</style>`;
    const htmls = [];
    const scriptSets = {
        vue: new Set(), react: new Set(), svelte: new Set(), angular: new Set(), html: new Set()
    };
    for (const b of blocks) {
        if (typeof b === 'string') {
            htmls.push(b);
            continue;
        }
        htmls.push(b.html);
        if (b.scripts) {
            for (const key of Object.keys(b.scripts)) {
                const code = b.scripts[key];
                if (code)
                    scriptSets[key].add(code);
            }
        }
    }
    const body = htmls.join('\n');
    // Build script comments per framework (de-duplicated)
    const commentFor = (fw) => {
        const items = Array.from(scriptSets[fw]);
        if (items.length === 0)
            return '';
        const pref = fw === 'react' || fw === 'angular' || fw === 'vue' || fw === 'svelte' ? '// ' : '';
        return `\n${pref}Scripts to include (de-duplicated):\n` + items.map(s => `${pref}${s.replace(/\n/g, '\\n')}`).join('\n');
    };
    // HTML standalone: inject actual <script> tags at the end of body
    const htmlScripts = Array.from(scriptSets.html).map(ensureScriptTag).join('\n');
    const vue = `<template>\n${body}\n</template>\n<script setup lang=\"ts\"></script>\n<!-- Include in <head>: -->\n${fonts}\n${style}${commentFor('vue')}`;
    const react = `export function Page(){\n  return (<>\n${toReactJsx(body)}\n  </>);\n}\n// Include in <head>:\n// ${fonts}\n// ${style}${commentFor('react')}`;
    const svelte = `<svelte:head>\n${fonts}\n${style}\n</svelte:head>\n${body}${commentFor('svelte')}`;
    const angular = `// Include in index.html <head>:\n// ${fonts}\n// ${style}${commentFor('angular')}\n\n<div class=\"page\">\n${body}\n</div>`;
    const html = `<!doctype html>\n<html>\n<head>\n${fonts}\n${style}\n<script src=\"https://cdn.tailwindcss.com\"><\/script>\n</head>\n<body>\n${body}\n${htmlScripts}\n</body>\n</html>`;
    return { vue, react, svelte, angular, html };
}
