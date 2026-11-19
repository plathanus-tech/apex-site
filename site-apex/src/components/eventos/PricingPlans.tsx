import { useRef, useState } from 'react';
import { Button } from '@ds';
import Simulator from './Simulator';
import type { SimCopy } from './Simulator';
import styles from './PricingPlans.module.css';

interface Plan {
  id: string;
  name: string;
  tagline: string;
  heading: string;
  points: string[];
  /** Observação sobre o que ainda é exemplo ou está a confirmar (opcional). */
  note?: string;
  /** Taxas por volume, em destaque tipográfico (só o "Por evento"). */
  rates?: { title: string; items: { value: string; label: string }[] };
  /** Quem pode assumir a taxa (só o "Por evento"). */
  payers?: { title: string; items: string[]; caption: string };
  /** Resumo em painel escuro, para as formas sem calculadora. */
  summary?: { label: string; big: string; rows: { label: string; value: string }[] };
  /** Texto de apoio (opcional) abaixo do título. */
  lead?: string;
  /** Taxas da calculadora; só a forma "Por evento" tem. */
  calc?: { lowVolumePercent: number; highVolumePercent: number; volumeThreshold: number; priceMax?: number; gateway?: { pix: number; card: number }; copy?: SimCopy };
}

interface Props {
  plans: Plan[];
}

/**
 * As três formas de contratar, em abas. A calculadora de repasse fica só dentro de "Por evento"; a mensalidade do
 * plano ilimitado e o percentual de Evento + Reservas ficam sinalizados como ainda não informados ou de exemplo.
 */
export default function PricingPlans({ plans }: Props) {
  const [active, setActive] = useState(plans[0].id);
  const refs = useRef<Record<string, HTMLButtonElement | null>>({});

  const move = (e: React.KeyboardEvent, i: number) => {
    const last = plans.length - 1;
    const next = e.key === 'ArrowRight' ? (i === last ? 0 : i + 1) : e.key === 'ArrowLeft' ? (i === 0 ? last : i - 1) : e.key === 'Home' ? 0 : e.key === 'End' ? last : -1;
    if (next < 0) return;
    e.preventDefault();
    setActive(plans[next].id);
    refs.current[plans[next].id]?.focus();
  };

  const plan = plans.find((p) => p.id === active) ?? plans[0];

  return (
    <div className={styles.root}>
      <div className={styles.tabs} role="tablist" aria-label="Formas de contratar">
        {plans.map((p, i) => (
          <button
            key={p.id} ref={(el) => { refs.current[p.id] = el; }}
            id={`plan-tab-${p.id}`} role="tab" type="button" className={styles.tab}
            aria-selected={p.id === active} aria-controls="plan-panel" tabIndex={p.id === active ? 0 : -1}
            onClick={() => setActive(p.id)} onKeyDown={(e) => move(e, i)}
          >
            <span className={styles.tabName}>{p.name}</span>
            <span className={styles.tabTag}>{p.tagline}</span>
          </button>
        ))}
      </div>

      <div id="plan-panel" role="tabpanel" aria-labelledby={`plan-tab-${plan.id}`} className={styles.panel} key={plan.id}>
        <div className={styles.copy}>
          <h3 className={styles.heading}>{plan.heading}</h3>
          {plan.lead && <p className={styles.lead}>{plan.lead}</p>}
          {plan.points.length > 0 && (
            <ul className={styles.points}>
              {plan.points.map((pt) => (
                <li key={pt}><span className={`material-symbols-outlined ${styles.ic}`} aria-hidden="true">check_circle</span>{pt}</li>
              ))}
            </ul>
          )}
          {(plan.rates || plan.payers) && (
            <div className={styles.facts}>
              {plan.rates && (
              <section aria-label={plan.rates.title}>
                <p className={styles.factLabel}>{plan.rates.title}</p>
                <dl className={styles.rates}>
                  {plan.rates.items.map((r) => (
                    <div key={r.value} className={styles.rate}>
                      <dd className={styles.pct}>{r.value}</dd>
                      <dt className={styles.pctLabel}>{r.label}</dt>
                    </div>
                  ))}
                </dl>
              </section>
              )}
              {plan.payers && (
              <section aria-label={plan.payers.title}>
                <p className={styles.factLabel}>{plan.payers.title}</p>
                <ul className={styles.payers}>
                  {plan.payers.items.map((w, i) => (
                    <li key={w}>{i > 0 && <span className={styles.or} aria-hidden="true">ou</span>}<span className={styles.who}>{w}</span></li>
                  ))}
                </ul>
                <p className={styles.caption}>{plan.payers.caption}</p>
              </section>
              )}
            </div>
          )}
          {plan.note && <p className="placeholder-tag">{plan.note}</p>}
          <div className={styles.cta}><Button href="#contato" variant="outline">Solicitar demonstração</Button></div>
        </div>

        {plan.calc && (
          <div className={styles.sim}>
            <Simulator {...plan.calc} />
          </div>
        )}

        {plan.summary && (
          <div className={`${styles.sim} ${styles.summary}`}>
            <p className={styles.sLabel}>{plan.summary.label}</p>
            <p className={styles.sBig}>{plan.summary.big}</p>
            <dl className={styles.sRows}>
              {plan.summary.rows.map((r) => (
                <div key={r.label} className={styles.sRow}><dt>{r.label}</dt><dd>{r.value}</dd></div>
              ))}
            </dl>
          </div>
        )}
      </div>
    </div>
  );
}
