# Apex: site institucional

- `site-apex/`: site (Astro + React) com as páginas Home, Eventos, Reservas e a lista de eventos.
- `storybook-apex/`: design system do Apex (tokens e componentes). O site importa dele pelo alias `@ds` (`../storybook-apex/src`), então as duas pastas precisam ficar lado a lado.

## Rodar o site

```bash
cd site-apex
npm install
npm run dev     # http://localhost:4321
npm run build
```

## Conteúdo

- Textos e dados das páginas: `site-apex/src/data/` (`site.ts`, `eventos.ts`, `reservas.ts`).
- Itens ainda de exemplo (placeholders) e valores a confirmar estão comentados nesses arquivos.
- Formulário de contato: o envio ainda não tem integração (`CONTACT_ENDPOINT` em `site.ts`).
