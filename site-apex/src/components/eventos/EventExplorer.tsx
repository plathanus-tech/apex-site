import { useEffect, useMemo, useState } from 'react';
import { Badge, Button, Dialog, Dropdown, SearchInput } from '@ds';
import { statusLabel, type EventItem } from '../../data/eventos';
import styles from './EventExplorer.module.css';

const UF: Record<string, string> = { SC: 'Santa Catarina', PR: 'Paraná', RS: 'Rio Grande do Sul', SP: 'São Paulo', RJ: 'Rio de Janeiro', MG: 'Minas Gerais', GO: 'Goiás' };
const MONTHS = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
const monthLabel = (m: string) => `${MONTHS[Number(m.slice(5, 7)) - 1]}/${m.slice(0, 4)}`;

const ORDERS = [
  { value: 'most_recent', label: 'Mais recentes' },
  { value: 'oldest', label: 'Mais antigos' },
  { value: 'name', label: 'Nome (A a Z)' },
];

// Parâmetros da URL (mesmos nomes de filtros da lista do Apex, em português)
const PARAMS = { state: 'estado', period: 'periodo', category: 'categoria', modality: 'modalidade', order: 'ordem', q: 'q' } as const;
interface Filters { state: string; period: string; category: string; modality: string; order: string; q: string }
const DEFAULTS: Filters = { state: 'all', period: 'all', category: 'all', modality: 'all', order: 'most_recent', q: '' };

const tone = (e: EventItem) => (e.status === 'abertas' ? 'success' : e.status === 'breve' ? 'warning' : 'neutral');
const norm = (s: string) => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();

/**
 * Lista completa de eventos, com busca, filtros (estado, período, categoria e modalidade), ordenação e "Limpar todos".
 * Tudo roda no navegador e fica refletido na URL, para a busca da seção "Próximos eventos" (?q=) e os links continuarem funcionando.
 */
export default function EventExplorer({ events }: { events: EventItem[] }) {
  const [f, setF] = useState<Filters>(DEFAULTS);
  const [drawer, setDrawer] = useState(false); // gaveta de filtros (celular e tablet)

  // Lê a URL e, no celular, começa com os filtros recolhidos
  useEffect(() => {
    const sp = new URLSearchParams(window.location.search);
    setF({
      state: sp.get(PARAMS.state) ?? DEFAULTS.state, period: sp.get(PARAMS.period) ?? DEFAULTS.period,
      category: sp.get(PARAMS.category) ?? DEFAULTS.category, modality: sp.get(PARAMS.modality) ?? DEFAULTS.modality,
      order: sp.get(PARAMS.order) ?? DEFAULTS.order, q: sp.get(PARAMS.q) ?? DEFAULTS.q,
    });
  }, []);

  const update = (patch: Partial<Filters>) => {
    const next = { ...f, ...patch };
    setF(next);
    const sp = new URLSearchParams();
    (Object.keys(PARAMS) as (keyof Filters)[]).forEach((k) => { if (next[k] && next[k] !== DEFAULTS[k]) sp.set(PARAMS[k], next[k]); });
    const qs = sp.toString();
    window.history.replaceState(null, '', qs ? `?${qs}` : window.location.pathname);
  };

  const opts = useMemo(() => {
    const uniq = (xs: string[]) => Array.from(new Set(xs));
    return {
      states: uniq(events.map((e) => e.state)).sort(),
      periods: uniq(events.map((e) => e.startsAt.slice(0, 7))).sort(),
      modalities: uniq(events.map((e) => e.modality)).sort((a, b) => a.localeCompare(b, 'pt-BR')),
      categories: uniq(events.flatMap((e) => e.categories)).sort((a, b) => a.localeCompare(b, 'pt-BR', { numeric: true })),
    };
  }, [events]);

  const list = useMemo(() => {
    const term = norm(f.q.trim());
    const out = events.filter((e) =>
      (f.state === 'all' || e.state === f.state) &&
      (f.period === 'all' || e.startsAt.startsWith(f.period)) &&
      (f.category === 'all' || e.categories.includes(f.category)) &&
      (f.modality === 'all' || e.modality === f.modality) &&
      (!term || norm(`${e.title} ${e.venue} ${e.place}`).includes(term)));
    return out.sort((a, b) =>
      f.order === 'name' ? a.title.localeCompare(b.title, 'pt-BR')
        : f.order === 'oldest' ? a.startsAt.localeCompare(b.startsAt)
          : b.startsAt.localeCompare(a.startsAt));
  }, [events, f]);

  const active = (['state', 'period', 'category', 'modality'] as const).filter((k) => f[k] !== 'all').length;
  const clear = () => update({ ...DEFAULTS });
  const dd = (size: 'sm' | 'md', label: string, key: 'state' | 'period' | 'category' | 'modality', all: string, items: { value: string; label: string }[]) => (
    <Dropdown
      label={label} size={size} value={f[key]} onChange={(v) => update({ [key]: v } as Partial<Filters>)}
      options={[{ value: 'all', label: all }, ...items]}
    />
  );

  // Filtros compactos (36px) na coluna do desktop e no tamanho normal (44px) na gaveta do celular, para facilitar o toque
  const fieldsFor = (size: 'sm' | 'md') => (
    <>
      {dd(size, 'Estado', 'state', 'Todos os estados', opts.states.map((s) => ({ value: s, label: UF[s] ?? s })))}
      {dd(size, 'Período', 'period', 'Todos os períodos', opts.periods.map((p) => ({ value: p, label: monthLabel(p) })))}
      {dd(size, 'Categoria', 'category', 'Todas as categorias', opts.categories.map((c) => ({ value: c, label: c })))}
      {dd(size, 'Modalidade', 'modality', 'Todas as modalidades', opts.modalities.map((m) => ({ value: m, label: m })))}
    </>
  );
  const canClear = active > 0 || !!f.q || f.order !== DEFAULTS.order;

  return (
    <div className={styles.root}>
      {/* Desktop: filtros em coluna ao lado da lista */}
      <aside className={styles.side} aria-label="Filtros">
        <div className={styles.sideInner}>
        <div className={styles.sideHead}>
          <h2 className={styles.sideTitle}>Filtros</h2>
          <button type="button" className={styles.clear} onClick={clear} disabled={!canClear}>Limpar todos</button>
        </div>
        <div className={styles.fields}>{fieldsFor('sm')}</div>
        </div>
      </aside>

      <section className={styles.results} aria-label="Eventos">
        <div className={styles.bar}>
          <div className={styles.search}>
            <SearchInput name="q" aria-label="Buscar evento" placeholder="Buscar evento" value={f.q} onChange={(v) => update({ q: v })} />
          </div>
          <button type="button" className={styles.filterBtn} onClick={() => setDrawer(true)} aria-haspopup="dialog">
            <span className="material-symbols-outlined" aria-hidden="true">tune</span>
            Filtros{active > 0 && <span className={styles.badge} aria-label={`${active} filtros ativos`}>{active}</span>}
          </button>
        </div>

        <div className={styles.resHead}>
          <p className={styles.count} aria-live="polite">
          {list.length === 0 ? 'Nenhum evento encontrado' : list.length === events.length && active === 0 && !f.q ? `Exibindo todos os eventos (${list.length})` : `Exibindo ${list.length} de ${events.length} eventos`}
        </p>
          {/* Desktop: a ordenação fica na linha de resultados, à direita (no celular ela está na gaveta) */}
          <div className={styles.sortInline}>
            <span className={styles.sortLabel}>Ordenar por</span>
            <Dropdown aria-label="Ordenar por" size="sm" value={f.order} onChange={(v) => update({ order: v })} options={ORDERS} />
          </div>
        </div>

        {list.length > 0 ? (
          <ul className={styles.cards}>
            {list.map((e) => (
              <li key={e.title}>
                <article className={styles.card}>
                  <a className={styles.link} href={e.href} aria-label={`Ver o evento ${e.title}`}>
                    <div className={styles.img}>
                      {e.image
                        ? <img src={e.image} alt="" loading="lazy" decoding="async" />
                        : <span className={styles.ph} aria-hidden="true"><span className="material-symbols-outlined">image</span><span>[Imagem do evento]</span></span>}
                    </div>
                    <div className={styles.body}>
                      <Badge status={tone(e)}>{statusLabel[e.status]}</Badge>
                      <h3>{e.title}</h3>
                      <ul className={styles.meta}>
                        <li><span className="material-symbols-outlined" aria-hidden="true">calendar_month</span>{e.dates}</li>
                        <li><span className="material-symbols-outlined" aria-hidden="true">flag</span>{e.venue}</li>
                        <li><span className="material-symbols-outlined" aria-hidden="true">location_on</span>{e.place}</li>
                      </ul>
                    </div>
                  </a>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <div className={styles.empty}>
            <p>Nenhum evento encontrado com esses filtros e essa busca.</p>
            <Button variant="outline" onClick={clear}>Limpar todos</Button>
          </div>
        )}
      </section>

      {/* Celular e tablet: ordenação e filtros dentro de uma gaveta */}
      <Dialog
        open={drawer} onClose={() => setDrawer(false)} sheet size="sm" title="Filtros" subtitle="Ordene e filtre os eventos."
        actions={<><Button variant="outline" onClick={clear} disabled={!canClear}>Limpar todos</Button><Button onClick={() => setDrawer(false)}>{`Ver ${list.length} ${list.length === 1 ? 'evento' : 'eventos'}`}</Button></>}
      >
        <div className={styles.fields}>
          <Dropdown label="Ordenar por" size="sm" value={f.order} onChange={(v) => update({ order: v })} options={ORDERS} />
          {fieldsFor('md')}
        </div>
      </Dialog>
    </div>
  );
}
