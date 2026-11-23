import { Accordion } from '@ds';

export interface FaqItem { title: string; content: string; link?: { label: string; href: string } }

/** Acordeão do FAQ. Itens com `link` ganham um link sublinhado ao fim da resposta. */
export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  const mapped = items.map((i) => ({
    title: i.title,
    content: i.link ? (
      <>
        {i.content}{' '}
        <a href={i.link.href} style={{ color: 'var(--color-brand-400)', textDecoration: 'underline', textUnderlineOffset: '0.2em' }}>{i.link.label}</a>
      </>
    ) : i.content.includes('\n') ? (
      // Respostas com mais de um parágrafo: uma linha em branco entre eles
      <>
        {i.content.split('\n').map((t, n) => (
          <p key={n} style={{ margin: n === 0 ? 0 : 'var(--spacing-sm) 0 0' }}>{t}</p>
        ))}
      </>
    ) : i.content,
  }));
  return <Accordion items={mapped} headingLevel={3} defaultOpenIndex={[0]} />;
}
