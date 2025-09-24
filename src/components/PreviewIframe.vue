<script setup lang="ts">
import { onMounted, onBeforeUnmount, ref, watch } from 'vue';

interface Props {
  html: string;
  dark?: boolean;
  paddingClass?: string; // e.g. 'p-10'
}

const props = withDefaults(defineProps<Props>(), {
  dark: false,
  paddingClass: 'p-10'
});

const iframeRef = ref<HTMLIFrameElement | null>(null);

function writeDoc() {
  const iframe = iframeRef.value;
  if (!iframe) return;
  const doc = iframe.contentDocument;
  if (!doc) return;

  // Build HTML string for iframe content
  const darkClass = props.dark ? 'dark' : '';
  const html = `<!doctype html>
  <html class="${darkClass}"><head>
    <meta charset=\"utf-8\">
    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">
    <link rel=\"preconnect\" href=\"https://fonts.googleapis.com\">
    <link rel=\"preconnect\" href=\"https://fonts.gstatic.com\" crossorigin>
  <link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@400;500;600;700&family=Roboto:wght@400;500;700&family=Open+Sans:wght@400;600;700&display=swap\" rel=\"stylesheet\">
    <style>
      html,body{margin:0;padding:0}
      body{font-family: Inter, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif;}
      .preview-container{background:white; border-radius: 0; width: 100%;}
      .preview-container > .full-bleed { margin-left: calc(-1 * var(--pad, 0px)); margin-right: calc(-1 * var(--pad, 0px)); }
      .dark .preview-container{background:#0b0f19}
    </style>
  </head>
  <body>
    <div class="preview-container ${props.paddingClass}">
      ${props.html}
    </div>
    <script>
      (function(){
        const ro = new ResizeObserver(()=>{
          const h = document.body.scrollHeight;
          parent.postMessage({ type: 'preview-iframe-resize', height: h }, '*');
        });
        ro.observe(document.body);
        function syncPad(){
          const c = document.querySelector('.preview-container');
          if(c){
            const cs = getComputedStyle(c);
            const pad = parseFloat(cs.paddingLeft)||0;
            document.documentElement.style.setProperty('--pad', pad + 'px');
          }
          const h = document.body.scrollHeight;
          parent.postMessage({ type: 'preview-iframe-resize', height: h }, '*');
        }
        window.addEventListener('load', syncPad);
        window.addEventListener('resize', syncPad);
        // initial
        syncPad();
      })();
    <\/script>
  </body></html>`;

  doc.open();
  doc.write(html);
  doc.close();

  // After writing, clone parent stylesheets (hashed build CSS) into the iframe
  try {
    const parentLinks = Array.from(window.document.querySelectorAll('link[rel="stylesheet"]')) as HTMLLinkElement[];
    parentLinks.forEach((lnk) => {
      const clone = doc.createElement('link');
      clone.setAttribute('rel', 'stylesheet');
      clone.setAttribute('href', lnk.getAttribute('href') || '');
      doc.head.appendChild(clone);
    });
    // Also copy inline <style> tags if any (rare in prod, common in dev)
    const parentStyles = Array.from(window.document.querySelectorAll('style')) as HTMLStyleElement[];
    parentStyles.forEach((st) => {
      const clone = doc.createElement('style');
      clone.textContent = st.textContent || '';
      doc.head.appendChild(clone);
    });
  } catch {}
}

function handleMessage(e: MessageEvent) {
  const iframe = iframeRef.value;
  if (!iframe) return;
  if (e.source !== iframe.contentWindow) return;
  if (!e.data || e.data.type !== 'preview-iframe-resize') return;
  const h = Math.max(200, Number(e.data.height) || 0);
  iframe.style.height = h + 'px';
}

onMounted(() => {
  window.addEventListener('message', handleMessage);
  writeDoc();
});

onBeforeUnmount(() => {
  window.removeEventListener('message', handleMessage);
});

watch(() => [props.html, props.dark], () => {
  writeDoc();
});
</script>

<template>
  <iframe ref="iframeRef" class="w-full border-0 block rounded-xl overflow-hidden bg-white dark:bg-gray-950"></iframe>
  <!-- Note: height is controlled dynamically via postMessage -->
</template>

<style scoped>
/* No additional styles */
</style>
