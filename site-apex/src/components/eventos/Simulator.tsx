import { useState } from 'react';
import { RadioButton } from '@ds';
import styles from './Simulator.module.css';

export interface SimCopy {
  title: string;
  lead: string;
  qty: string;
  price: string;
  /** Linha do valor final para o participante. */
  finalPrice: string;
  /** Nome do item vendido, no plural, usado nas frases do resultado (ex.: "inscrições"). */
  items: string;
  /** Nome do item vendido, no singular, com artigo (ex.: "o valor da inscrição"). */
  itemValue: string;
  /** Nome do item vendido, no singular, sem artigo (ex.: "inscrição"). */
  unit: string;
}

const EVENT_COPY: SimCopy = {
  title: 'Simule o repasse do seu evento',
  lead: 'Informe a quantidade de inscritos e o valor da inscrição para descobrir quanto receberia.',
  qty: 'Quantidade de inscritos',
  price: 'Valor da inscrição',
  finalPrice: 'Valor final da inscrição para o participante',
  items: 'inscrições',
  itemValue: 'o valor da inscrição',
  unit: 'inscrição',
};

interface Props {
  /** Textos da calculadora; o padrão é o do "Por evento". */
  copy?: SimCopy;
  /** Taxa (em %) para eventos com menor volume de inscrições. */
  lowVolumePercent: number;
  /** Taxa (em %) para eventos com maior volume de inscrições. */
  highVolumePercent: number;
  /** Até quantas inscrições vale a taxa de menor volume (acima disso vale a de maior volume). Critério ainda a confirmar. */
  volumeThreshold: number;
  /** Valor máximo do slider de valor (em reais); passa disso, o slider cresce para caber o que for digitado. */
  priceMax?: number;
  /** Taxa (em %) do meio de pagamento (Pagar.me), por forma de pagamento. Soma-se à taxa do Apex. */
  gateway?: { pix: number; card: number };
}

type Method = 'pix' | 'cartao';
const GATEWAY_DEFAULT = { pix: 0.99, card: 3.3 };
/** "cobrar": informa o valor que cobra e vê quanto recebe. "receber": informa quanto quer receber e vê quanto deve cobrar.
 *  "repassar": o participante paga as taxas; informa o valor da inscrição e vê quanto o participante paga. */
type Mode = 'cobrar' | 'receber' | 'repassar';

const QTY_BASE = { min: 10, max: 1000, step: 10 };
const PRICE_BASE = { min: 20, max: 3500, step: 10 };

/** Arredonda para cima para um número "redondo" (1, 2, 2,5, 5 ou 10 vezes uma potência de 10). */
function niceCeil(x: number): number {
  const p = Math.pow(10, Math.floor(Math.log10(x)));
  const f = x / p;
  return (f <= 1 ? 1 : f <= 2 ? 2 : f <= 2.5 ? 2.5 : f <= 5 ? 5 : 10) * p;
}
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const pct = (v: number, r: { min: number; max: number }) => `${((clamp(v, r.min, r.max) - r.min) / (r.max - r.min)) * 100}%`;

const brl = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
const int = new Intl.NumberFormat('pt-BR');
const pctFmt = new Intl.NumberFormat('pt-BR', { maximumFractionDigits: 2 });

/** Lê um valor em reais digitado como "150", "150,50", "1.500,50" ou "150.50". Inválido vira 0. */
function parseMoney(raw: string): number {
  const v = raw.replace(/[^\d.,]/g, '');
  let normalized: string;
  if (v.includes(',')) normalized = v.replace(/\./g, '').replace(',', '.');
  else if (/^\d+\.\d{1,2}$/.test(v)) normalized = v;
  else normalized = v.replace(/\./g, '');
  const n = parseFloat(normalized);
  return Number.isFinite(n) && n > 0 ? n : 0;
}

/**
 * Calculadora de repasse. A taxa depende da quantidade de inscrições (faixa de menor ou de maior volume) e quem paga a taxa
 * muda o repasse e o valor final. Dois modos, como nas calculadoras de maquininha:
 *  - "Quero cobrar": o valor cobrado é informado e a calculadora mostra quanto sobra.
 *  - "Quero receber": o valor que se quer receber é informado e a calculadora mostra quanto cobrar para chegar nele.
 * É só uma estimativa: não considera outras tarifas, impostos ou custos.
 */
export default function Simulator({ lowVolumePercent, highVolumePercent, volumeThreshold, priceMax = PRICE_BASE.max, gateway = GATEWAY_DEFAULT, copy = EVENT_COPY }: Props) {
  const [mode, setMode] = useState<Mode>('cobrar');
  const [method, setMethod] = useState<Method>('pix');
  const [qtyRaw, setQtyRaw] = useState('200');
  const [priceRaw, setPriceRaw] = useState('150,00'); // modo "cobrar"
  const [wantRaw, setWantRaw] = useState('150,00'); // modo "receber"
  // Se a pessoa digitar mais que o máximo do slider, a escala do slider cresce para caber o valor digitado
  // (e volta ao máximo original quando o valor digitado volta a caber nele)
  const [qtyMax, setQtyMax] = useState(QTY_BASE.max);
  const [priceMaxNow, setPriceMaxNow] = useState(priceMax);
  const QTY = { ...QTY_BASE, max: qtyMax };
  const PRICE = { ...PRICE_BASE, max: priceMaxNow };

  const qty = Math.max(0, Math.floor(Number(qtyRaw.replace(/\D/g, '')) || 0));
  const raw = mode === 'receber' ? wantRaw : priceRaw;
  const setRaw = mode === 'receber' ? setWantRaw : setPriceRaw;
  const typed = parseMoney(raw); // valor do campo principal (o que se cobra ou o que se quer receber, por unidade)

  const typeQty = (value: string) => {
    const clean = value.replace(/\D/g, '').slice(0, 6);
    setQtyRaw(clean);
    const n = Number(clean) || 0;
    setQtyMax(n > QTY_BASE.max ? niceCeil(n * 1.25) : QTY_BASE.max);
  };
  const typeMoney = (value: string) => {
    const clean = value.replace(/[^\d.,]/g, '').slice(0, 10);
    setRaw(clean);
    const n = parseMoney(clean);
    setPriceMaxNow(n > priceMax ? niceCeil(n * 1.25) : priceMax);
  };

  const percent = qty > volumeThreshold ? highVolumePercent : lowVolumePercent; // taxa do Apex
  const gatewayPercent = method === 'pix' ? gateway.pix : gateway.card; // taxa do meio de pagamento (Pagar.me)
  const rate = (percent + gatewayPercent) / 100; // as duas taxas somadas

  // Por unidade (inscrição ou reserva). Nos modos "receber" e "cobrar" o organizador absorve as taxas; em "repassar" elas ficam com o participante.
  const chargeUnit = mode === 'receber' ? typed / (1 - rate) : typed; // valor cobrado do participante pelo organizador
  const netUnit = mode === 'cobrar' ? typed * (1 - rate) : typed; // o que o organizador recebe
  const feeUnit = mode === 'receber' ? chargeUnit - typed : typed * rate; // taxas por unidade
  const participantPays = mode === 'repassar' ? typed * (1 + rate) : chargeUnit; // o que o participante efetivamente paga
  const netTotal = netUnit * qty;
  const feeTotal = feeUnit * qty;

  const empty = typed === 0 || qty === 0;
  const dash = '—';

  return (
    <div className={styles.sim}>
      <header className={styles.header}>
        <h4 className={styles.title}>{copy.title}</h4>
        <p className={styles.lead}>{copy.lead}</p>
      </header>

      <div className={styles.modes} role="group" aria-label="O que você quer simular">
        <button type="button" className={styles.mode} aria-pressed={mode === 'receber'} onClick={() => setMode('receber')}>Quero receber</button>
        <button type="button" className={styles.mode} aria-pressed={mode === 'cobrar'} onClick={() => setMode('cobrar')}>Quero cobrar</button>
        <button type="button" className={styles.mode} aria-pressed={mode === 'repassar'} onClick={() => setMode('repassar')}>Participante paga</button>
      </div>

      <div className={styles.fields}>
        <div className={styles.control}>
          <div className={styles.head}>
            <label htmlFor="sim-qty">{copy.qty}</label>
            <input
              id="sim-qty" className={styles.value} type="text" inputMode="numeric" autoComplete="off" size={Math.max(1, qtyRaw.length)}
              value={qtyRaw} onChange={(e) => typeQty(e.target.value)}
            />
          </div>
          <input
            className={styles.range} type="range" aria-label={`Ajustar: ${copy.qty.toLowerCase()}`} min={QTY.min} max={QTY.max} step={QTY.step}
            value={clamp(qty, QTY.min, QTY.max)} style={{ ['--p' as string]: pct(qty, QTY) }}
            onChange={(e) => setQtyRaw(e.target.value)}
          />
          <div className={styles.ends}><span>{QTY.min}</span><span>{int.format(QTY.max)}</span></div>
        </div>

        <div className={styles.control}>
          <div className={styles.head}>
            <label htmlFor="sim-price">{mode === 'receber' ? `Quanto você quer receber por ${copy.unit}` : copy.price}</label>
            <span className={styles.money}>
              <span aria-hidden="true">R$</span>
              <input
                id="sim-price" className={styles.value} type="text" inputMode="decimal" autoComplete="off" size={Math.max(3, raw.length)}
                value={raw} onChange={(e) => typeMoney(e.target.value)}
                onBlur={() => typed > 0 && setRaw(brl.format(typed).replace(/[^\d.,]/g, ''))}
              />
            </span>
          </div>
          <input
            className={styles.range} type="range" aria-label={`Ajustar: ${mode === 'receber' ? `quanto quer receber por ${copy.unit}` : copy.price.toLowerCase()}`}
            min={PRICE.min} max={PRICE.max} step={PRICE.step}
            value={clamp(typed, PRICE.min, PRICE.max)} style={{ ['--p' as string]: pct(typed, PRICE) }}
            onChange={(e) => setRaw(`${e.target.value},00`)}
          />
          <div className={styles.ends}><span>{brl.format(PRICE.min)}</span><span>{brl.format(PRICE.max)}</span></div>
        </div>
      </div>

      <div className={styles.choices}>
        <RadioButton
          name="sim-method" label="Forma de pagamento" orientation="horizontal" value={method} onChange={(v) => setMethod(v as Method)}
          options={[{ label: 'Pix', value: 'pix' }, { label: 'Cartão', value: 'cartao' }]}
        />
      </div>

      <div className={styles.result} aria-live="polite">
        <p className={styles.resultLabel}>Você vai receber</p>
        <p className={styles.net}>{empty ? dash : brl.format(netTotal)}</p>
        <p className={styles.note}>{qty > 0 && typed > 0 ? `em ${int.format(qty)} ${copy.items}, ${brl.format(netUnit)} por ${copy.unit}` : 'Informe a quantidade e o valor'}</p>

        <dl className={styles.rows}>
          {mode === 'receber' && (
            <div className={`${styles.row} ${styles.key}`}><dt>Cobrar por {copy.unit}</dt><dd>{typed === 0 ? dash : brl.format(chargeUnit)}</dd></div>
          )}
          {mode === 'cobrar' && (
            <div className={styles.row}><dt>Valor cobrado por {copy.unit}</dt><dd>{typed === 0 ? dash : brl.format(typed)}</dd></div>
          )}
          {mode === 'repassar' && (
            <>
              <div className={styles.row}><dt>Valor da {copy.unit}</dt><dd>{typed === 0 ? dash : brl.format(typed)}</dd></div>
              <div className={`${styles.row} ${styles.key}`}><dt>O participante paga</dt><dd>{typed === 0 ? dash : brl.format(participantPays)}</dd></div>
            </>
          )}
          <div className={styles.row}><dt>Taxa Apex aplicada</dt><dd>{pctFmt.format(percent)}%</dd></div>
          <div className={styles.row}><dt>Taxa do pagamento ({method === 'pix' ? 'Pix' : 'cartão'})</dt><dd>{pctFmt.format(gatewayPercent)}%</dd></div>
          <div className={styles.row}>
            <dt>Taxas da venda{mode === 'repassar' ? ' (pagas pelo participante)' : ''}</dt>
            <dd className={styles.feeVal}>{empty ? dash : brl.format(feeTotal)}<small>{pctFmt.format(percent + gatewayPercent)}%</small></dd>
          </div>
          <div className={styles.row}><dt>Recebimento no painel</dt><dd>{method === 'pix' ? 'Em até 24 horas' : 'Em 30 dias'}</dd></div>
        </dl>
        <p className={styles.hint}>O prazo de recebimento é definido pela plataforma de pagamento.</p>
        <p className={styles.hint}>
          {mode === 'receber' && `Para receber ${typed === 0 ? 'esse valor' : brl.format(typed)} por ${copy.unit} depois das taxas, cobre ${typed === 0 ? 'um pouco mais' : brl.format(chargeUnit)}.`}
          {mode === 'cobrar' && `Você absorve as taxas: elas saem do valor cobrado, e o participante paga apenas ${copy.itemValue}.`}
          {mode === 'repassar' && `O participante paga as taxas a mais: elas não afetam o que você recebe, que é o valor integral das ${copy.items}.`}
        </p>
      </div>
    </div>
  );
}
