import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { fileURLToPath } from 'node:url';
import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Publicação em subpasta (GitHub Pages: https://<org>.github.io/<repositório>/).
 * Defina BASE_PATH (ex.: BASE_PATH=/apex-site) só na hora de publicar; sem ela o site continua na raiz ("/"), como no desenvolvimento.
 */
const rawBase = (process.env.BASE_PATH ?? '').trim();
const base = rawBase && rawBase !== '/' ? '/' + rawBase.replace(/^\/+|\/+$/g, '') : '';

/**
 * O Astro já ajusta os arquivos que ele mesmo gera (/_astro/...), mas os endereços escritos à mão no código
 * ("/images/...", "/videos/...", "/eventos"...) ficam sem a subpasta. Depois do build, este passo acrescenta a subpasta
 * a esses endereços nos HTML e nos scripts (inclusive nos dados enviados aos componentes React dentro do HTML).
 */
function prefixBasePaths() {
  const FOLDERS = 'images|videos|video|brand';
  const PAGES = 'eventos|reservas|v2pe';
  const quote = '(["\'`]|&quot;|&#34;|&#39;)';
  const rules = [
    // arquivos estáticos: "/images/..." → "/apex-site/images/..."
    [new RegExp(`${quote}/(${FOLDERS})/`, 'g'), `$1${base}/$2/`],
    // páginas: "/eventos", "/eventos/todos", "/reservas#contato"
    [new RegExp(`${quote}/(${PAGES})(?=[/"'\`#?&]|$)`, 'g'), `$1${base}/$2`],
    // início do site: href="/" e href="/#faq"
    [/(\bhref=)(["'])\/(?=["'#?])/g, `$1$2${base}/`],
    // lista de imagens do srcset: "a.webp 640w, /images/b.webp 1000w"
    [new RegExp(`(,\\s*)/(${FOLDERS})/`, 'g'), `$1${base}/$2/`],
  ];
  const walk = (dir, out = []) => {
    for (const name of readdirSync(dir)) {
      const full = join(dir, name);
      if (statSync(full).isDirectory()) walk(full, out);
      else if (/\.(html|js|mjs|css)$/.test(name)) out.push(full);
    }
    return out;
  };
  return {
    name: 'prefix-base-paths',
    hooks: {
      'astro:build:done': ({ dir }) => {
        if (!base) return;
        const root = fileURLToPath(dir);
        let changed = 0;
        for (const file of walk(root)) {
          const before = readFileSync(file, 'utf8');
          let after = before;
          for (const [re, to] of rules) after = after.replace(re, to);
          if (after !== before) { writeFileSync(file, after); changed++; }
        }
        console.log(`[prefix-base-paths] subpasta "${base}" aplicada em ${changed} arquivos`);
      },
    },
  };
}

// O site reutiliza tokens e componentes do Design System (../storybook-apex/src) pelo alias @ds.
export default defineConfig({
  ...(base ? { base } : {}),
  integrations: [react(), prefixBasePaths()],
  vite: {
    resolve: {
      alias: { '@ds': fileURLToPath(new URL('../storybook-apex/src', import.meta.url)) },
      dedupe: ['react', 'react-dom'],
    },
    server: { fs: { allow: ['..'] } },
  },
});
