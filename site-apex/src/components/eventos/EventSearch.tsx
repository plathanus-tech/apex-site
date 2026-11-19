import { useEffect, useState } from 'react';
import { SearchInput } from '@ds';

/**
 * Busca de eventos com o SearchInput do design system.
 * Enter envia para a página com todos os eventos (/eventos/todos?q=...). Preenche o campo com o `q` da URL.
 */
export default function EventSearch({ action = '/eventos/todos' }: { action?: string }) {
  const [value, setValue] = useState('');
  useEffect(() => {
    const q = new URLSearchParams(window.location.search).get('q');
    if (q) setValue(q);
  }, []);

  // Avisa a página (lista filtrada em /eventos/todos) a cada mudança, inclusive ao limpar o campo
  const change = (v: string) => {
    setValue(v);
    window.dispatchEvent(new CustomEvent('event-search', { detail: v }));
  };

  return (
    <form action={action} method="get" role="search">
      <SearchInput name="q" aria-label="Buscar evento" placeholder="Buscar evento" value={value} onChange={change} />
    </form>
  );
}
