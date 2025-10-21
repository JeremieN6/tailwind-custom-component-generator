import { themeVariablesStyle, useThemeStore } from './theme';
function fontsLinks() {
    return `<link rel="preconnect" href="https://fonts.googleapis.com">\n<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>\n<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=Open+Sans:wght@400;600;700&display=swap" rel="stylesheet">`;
}
function toReactJsx(html) {
    return html.replace(/class=\"/g, 'className="');
}
export function aggregatePageFrameworks(blocksHtml) {
    const theme = useThemeStore();
    const vars = themeVariablesStyle(theme.tokens);
    const fonts = fontsLinks();
    const style = `<style>${vars}</style>`;
    const body = blocksHtml.join('\n');
    const vue = `<template>\n${body}\n</template>\n<script setup lang=\"ts\"></script>\n<!-- Include in <head>: -->\n${fonts}\n${style}`;
    const react = `export function Page(){\n  return (<>\n${toReactJsx(body)}\n  </>);\n}\n// Include in <head>:\n// ${fonts}\n// ${style}`;
    const svelte = `<svelte:head>\n${fonts}\n${style}\n</svelte:head>\n${body}`;
    const angular = `// Include in index.html <head>:\n// ${fonts}\n// ${style}\n\n<div class=\"page\">\n${body}\n</div>`;
    const html = `<!doctype html>\n<html>\n<head>\n${fonts}\n${style}\n<script src=\"https://cdn.tailwindcss.com\"><\/script>\n</head>\n<body>\n${body}\n</body>\n</html>`;
    return { vue, react, svelte, angular, html };
}
