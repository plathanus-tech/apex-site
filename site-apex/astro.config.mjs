import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import { fileURLToPath } from 'node:url';

// O site reutiliza tokens e componentes do Design System (../storybook-apex/src) pelo alias @ds.
export default defineConfig({
  integrations: [react()],
  vite: {
    resolve: {
      alias: { '@ds': fileURLToPath(new URL('../storybook-apex/src', import.meta.url)) },
      dedupe: ['react', 'react-dom'],
    },
    server: { fs: { allow: ['..'] } },
  },
});
