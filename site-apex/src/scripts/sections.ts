import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const mm = gsap.matchMedia();

// As micro-animações (revelações, números, circuito) ficam em micro.ts, feitas com Motion.
// Aqui ficam só as cenas fixas com pin, que dependem do GSAP/ScrollTrigger.

/* ── Com a sua marca: a página da marca, com destaques do que ela escolhe, rola sozinha ─ */
mm.add('(prefers-reduced-motion: no-preference) and (min-width: 900px) and (min-height: 520px)', () => {
  const root = document.querySelector<HTMLElement>('[data-wl]');
  const stage = root?.querySelector<HTMLElement>('[data-wl-stage]');
  const scroller = root?.querySelector<HTMLElement>('[data-wl-scroll]');
  const viewport = root?.querySelector<HTMLElement>('.page-viewport');
  const options = root ? Array.from(root.querySelectorAll<HTMLElement>('.options > *')) : [];
  const marks = root ? Array.from(root.querySelectorAll<HTMLElement>('[data-wl-mark]')) : [];
  const t2 = root?.querySelector<HTMLElement>('[data-wl-t2]');
  if (!root || !stage || !scroller || !viewport || !t2 || options.length < 2) return;

  root.classList.add('is-animated');
  gsap.set(marks, { autoAlpha: 0, scale: 0.94 });
  gsap.set(t2, { autoAlpha: 0.2 });
  gsap.set(options, { autoAlpha: 0, y: 24 });
  gsap.set(scroller, { y: 0 });

  // Quanto a página precisa subir para mostrar tudo
  const travel = () => -Math.max(0, scroller.scrollHeight - viewport.clientHeight);

  // Chegada: título, destaques (imagem, logo e cor) e opções aparecem sozinhos assim que a seção chega à tela,
  // sem depender da rolagem; voltam a esconder se a pessoa sobe de novo
  const arrive = gsap.timeline({
    paused: true, defaults: { ease: 'power2.out' },
    scrollTrigger: { trigger: stage, start: 'top 70%', toggleActions: 'play none none reverse' },
  });
  arrive
    .to(t2, { autoAlpha: 1, duration: 0.4 }, 0)
    .to(marks, { autoAlpha: 1, scale: 1, stagger: 0.18, duration: 0.35 }, 0.1)
    .to(options, { autoAlpha: 1, y: 0, stagger: 0.15, duration: 0.45 }, 0.1);

  // Fixa a cena só pelo tempo de a página da marca rolar sozinha (e um respiro no fim)
  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: { trigger: stage, start: 'top top', end: () => `+=${window.innerHeight * 2}`, pin: true, scrub: 0.6, anticipatePin: 1, invalidateOnRefresh: true },
  });
  tl.to(scroller, { y: () => travel(), duration: 3 }).to({}, { duration: 0.4 });

  return () => {
    root.classList.remove('is-animated');
    gsap.set([scroller, t2, ...marks, ...options], { clearProps: 'all' });
  };
});

/* ── Plataforma: as duas telas do painel entram em profundidade, com um leve paralaxe ─ */
mm.add('(prefers-reduced-motion: no-preference) and (min-width: 900px)', () => {
  const root = document.querySelector<HTMLElement>('[data-plat]');
  const ev = root?.querySelector<HTMLElement>('[data-plat-card="eventos"]');
  const rs = root?.querySelector<HTMLElement>('[data-plat-card="reservas"]');
  if (!root || !ev || !rs) return;
  const st = { trigger: root, start: 'top 80%', end: 'center 45%', scrub: 0.6 };
  gsap.from(ev, { xPercent: -8, y: 60, autoAlpha: 0, rotateY: 22, scrollTrigger: st });
  gsap.from(rs, { xPercent: 8, y: 120, autoAlpha: 0, rotateY: -22, scrollTrigger: st });
  return () => gsap.set([ev, rs], { clearProps: 'all' });
});
