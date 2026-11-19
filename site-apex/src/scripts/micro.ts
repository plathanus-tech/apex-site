import { animate, inView, scroll, stagger } from 'motion';

/**
 * Micro-animações com Motion (revelações, números, traçado do circuito, entrada do Hero).
 * As cenas fixas e a transição do vídeo ficam no GSAP/ScrollTrigger (pin + controle da rolagem).
 *
 * Só roda com movimento permitido. Sem movimento (ou sem JS) o CSS padrão já mostra tudo.
 */
const EASE_OUT = [0.22, 1, 0.36, 1] as const;

export function initMicroMotion() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /* ── Entrada do Hero ──────────────────────────────────────────────── */
  const lines = document.querySelectorAll<HTMLElement>('[data-hero-line]');
  const ins = document.querySelectorAll<HTMLElement>('[data-hero-in]');
  if (lines.length) {
    lines.forEach((el) => { el.style.transform = 'translateY(110%)'; });
    ins.forEach((el) => { el.style.opacity = '0'; });
    animate(lines, { y: ['110%', '0%'] }, { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: stagger(0.09, { startDelay: 0.15 }) });
    animate(ins, { opacity: [0, 1], y: [24, 0] }, { duration: 0.9, ease: EASE_OUT, delay: stagger(0.12, { startDelay: 0.7 }) });
  }

  /* ── Revelações discretas de texto e blocos ───────────────────────── */
  document.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
    el.style.opacity = '0';
    const stop = inView(
      el,
      () => {
        animate(el, { opacity: [0, 1], y: [36, 0] }, { duration: 0.9, ease: EASE_OUT });
        stop();
      },
      { margin: '0px 0px -12% 0px' },
    );
  });

  /* ── Números: contagem ao entrar na tela ──────────────────────────── */
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const target = Number(el.dataset.count);
    el.textContent = '0';
    const stop = inView(el, () => {
      animate(0, target, { duration: 1.6, ease: 'easeOut', onUpdate: (v) => { el.textContent = String(Math.round(v)); } });
      stop();
    });
  });

  /* ── Pista do CTA final: traçado e ponto de luz ligados à rolagem ────────────── */
  // Há duas pistas (desktop e celular); só a visível conta, mas as duas são atualizadas
  const tracks = Array.from(document.querySelectorAll<SVGPathElement>('[data-circuit]')).map((path) => {
    const svg = path.ownerSVGElement;
    const len = path.getTotalLength();
    path.style.strokeDasharray = String(len);
    path.style.strokeDashoffset = String(len);
    return { path, len, racer: svg?.querySelector<SVGCircleElement>('[data-racer]') ?? null };
  });
  const section = tracks[0]?.path.closest('section');
  if (tracks.length && section) {
    // Começa quando a seção entra na tela. Desktop: termina ao rolar até o fim do card do formulário.
    // Celular: termina quando o topo do rodapé (logo abaixo da seção, onde a pista acaba) chega à base da tela.
    const update = () => {
      const top = section.getBoundingClientRect().top + window.scrollY;
      const startY = top - window.innerHeight * 0.8;
      const mobile = window.innerWidth < 960;
      const card = section.querySelector<HTMLElement>('.panel') ?? section;
      const footer = document.querySelector<HTMLElement>('footer');
      const bottom = mobile ? (footer ?? section).getBoundingClientRect()[footer ? 'top' : 'bottom'] + window.scrollY : card.getBoundingClientRect().bottom + window.scrollY;
      const endY = Math.max(startY + 1, bottom - window.innerHeight);
      const p = Math.min(1, Math.max(0, (window.scrollY - startY) / (endY - startY)));
      for (const t of tracks) {
        t.path.style.strokeDashoffset = String(t.len * (1 - p));
        if (t.racer) { const pt = t.path.getPointAtLength(t.len * p); t.racer.setAttribute('cx', String(pt.x)); t.racer.setAttribute('cy', String(pt.y)); }
      }
    };
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }
}

initMicroMotion();
