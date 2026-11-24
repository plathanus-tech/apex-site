import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/**
 * Cena do vídeo "apexhub" (public/video): Hero → perspectiva do piloto → Soluções.
 * A rolagem controla o tempo do vídeo: a câmera sai da lateral do piloto e chega à visão dele.
 *
 * Telas grandes (rich): na perspectiva do piloto o título aparece, a câmera segue avançando devagar
 * e os cinco benefícios saem do horizonte, de encontro à câmera. Depois vem a arrancada final até
 * o brilho da próxima seção. A seção "Por que o Apex" em grade fica oculta (has-pov-benefits).
 * Telas pequenas: só o vídeo e a frase "Agora você está no comando", e a seção em grade aparece.
 */

/** Horizonte (ponto de fuga) no último quadro do vídeo, em fração da imagem. */
const HORIZON = { w: 1280, h: 720, fx: 0.5, fy: 0.31 };

/** Onde um ponto do vídeo cai na tela com object-fit: cover centralizado. */
function project(img: { w: number; h: number; fx: number; fy: number }, vw: number, vh: number) {
  const s = Math.max(vw / img.w, vh / img.h);
  const rw = img.w * s;
  const rh = img.h * s;
  return { x: (vw - rw) / 2 + img.fx * rw, y: (vh - rh) / 2 + img.fy * rh };
}

const root = document.querySelector<HTMLElement>('[data-intro]');
if (root) {
  const q = <T extends HTMLElement>(sel: string) => root.querySelector<T>(sel)!;
  const stage = q('[data-stage]');
  const video = q<HTMLVideoElement>('[data-video]');
  const glow = q('[data-glow]');
  const shade = q('[data-shade]');
  const heroCopy = q('[data-hero-copy]');
  const cockCopy = q('[data-cockpit-copy]');
  const hint = q('[data-scroll-hint]');
  const povHead = q('[data-pov-head]');
  const dim = q('[data-dim]');
  const cards = Array.from(root.querySelectorAll<HTMLElement>('[data-pov-card]'));

  const mm = gsap.matchMedia();

  mm.add(
    { motion: '(prefers-reduced-motion: no-preference)', rich: '(min-width: 900px) and (min-height: 640px)' },
    (ctx) => {
      const rich = Boolean(ctx.conditions?.rich) && cards.length >= 5;
      const isNarrow = () => window.innerWidth < 720;

      // Só carrega o vídeo quando o movimento é permitido (versão menor no mobile).
      if (!video.getAttribute('src')) {
        video.src = isNarrow() ? '/video/apexhub-854.mp4' : '/video/apexhub-1280.mp4';
        video.preload = 'auto';
        video.load();
      }

      // A cena fica fixa: a seção seguinte sobe por cima dela (ver global.css)
      document.documentElement.classList.add("intro-pinned");

      if (rich) {
        // Antes de qualquer ScrollTrigger: a seção em grade sai do fluxo (os benefícios vêm na cena)
        root.classList.add('is-pov');
        document.documentElement.classList.add('has-pov-benefits');
      }

      const horizon = () => project(HORIZON, stage.clientWidth, stage.clientHeight);
      const origin = () => `${horizon().x}px ${horizon().y}px`;

      // A entrada do Hero (textos e CTAs) é feita com Motion em micro.ts

      // Tempo do vídeo controlado pela rolagem
      const clock = { t: 0 };
      const seek = () => {
        const d = video.duration;
        if (Number.isFinite(d) && d > 0) video.currentTime = Math.min(d - 0.04, clock.t * d);
      };

      // Escala de rolagem: unidades do timeline × altura da tela
      const VID = rich ? 2.6 : 0.78; // duração do vídeo no timeline
      const SPAN = 2.8; // tempo que cada benefício leva do horizonte até passar pela câmera
      const GAP = 0.9; // intervalo entre um benefício e o próximo
      // O título e o primeiro benefício entram ainda durante o vídeo, antes de ele terminar
      const HEAD_IN = VID - 1.1;
      const HEAD_OUT = HEAD_IN + 1.0; // título fica ~0,6 parado e sai
      const T0 = VID - 0.2; // primeiro benefício começa a sair do horizonte um pouco antes do vídeo acabar
      const END = rich ? T0 + (cards.length - 1) * GAP + SPAN : VID + 0.5; // celular/tablet: depois do vídeo, só o trecho em que a próxima seção sobe
      const perUnit = rich ? 0.66 : 1.35;

      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: stage,
          start: 'top top',
          // Celular/tablet: a seção de benefícios (sobe 85vh por cima do Hero, ver global.css) já começa a entrar com 100px de rolagem
          end: () => `+=${rich ? Math.round(window.innerHeight * END * perUnit) : Math.round(window.innerHeight * 0.85 + 100)}`,
          pin: rich, // celular/tablet: a cena é fixada por um ScrollTrigger à parte (abaixo), durante toda a seção de benefícios
          scrub: 0.5,
          anticipatePin: 1,
          invalidateOnRefresh: true,
        },
      });

      // 1. A câmera dá a volta no piloto: o tempo do vídeo avança com a rolagem
      tl.fromTo(clock, { t: 0 }, { t: 1, duration: VID, onUpdate: seek }, 0);

      // O texto do Hero sai logo no começo; o degradê de leitura sai com ele
      const heroOut = rich ? 0.3 : 0.14;
      tl.to(heroCopy, { autoAlpha: 0, yPercent: -10, duration: heroOut }, 0);
      tl.to(hint, { autoAlpha: 0, duration: rich ? 0.1 : 0.05 }, 0);
      tl.to(shade, { autoAlpha: 0.1, duration: rich ? 0.6 : 0.3 }, rich ? 0.15 : 0.08);

      if (rich) {
        gsap.set(povHead, { autoAlpha: 0 });
        gsap.set(cards, { xPercent: -50, yPercent: -50, z: -3200, autoAlpha: 0 });

        // 2. Perspectiva do piloto: o título aparece em cima, fica parado e sai antes dos benefícios
        tl.fromTo(povHead, { autoAlpha: 0, y: 24 }, { autoAlpha: 1, y: 0, duration: 0.4, ease: 'power2.out' }, HEAD_IN)
          .to(povHead, { autoAlpha: 0, y: -28, duration: 0.4, ease: 'power2.in' }, HEAD_OUT);

        // A câmera segue avançando devagar pela pista enquanto os benefícios chegam
        const pushAt = END - 0.9;
        // O vídeo escurece por inteiro enquanto o texto está na tela e clareia na arrancada final
        tl.to(dim, { autoAlpha: 1, duration: 0.8 }, HEAD_IN)
          .to(dim, { autoAlpha: 0, duration: 0.7 }, pushAt);
        tl.fromTo(
          video,
          { scale: 1, autoAlpha: 1, transformOrigin: origin },
          { scale: 1.3, transformOrigin: origin, ease: 'none', duration: pushAt - VID },
          VID,
        );

        // 3. Cada benefício sai do horizonte, passa pela câmera e some, um logo atrás do outro
        cards.forEach((card, i) => {
          const s = T0 + i * GAP;
          tl.to(card, { z: 480, duration: SPAN }, s)
            .to(card, { autoAlpha: 1, duration: 0.9 }, s)
            .to(card, { autoAlpha: 0, duration: 0.55 }, s + SPAN - 0.55);
        });

        // 4. Arrancada final: avança até o horizonte, que vira o brilho da próxima seção
        tl.fromTo(
          video,
          { scale: 1.3, autoAlpha: 1, transformOrigin: origin },
          { scale: 3.8, autoAlpha: 0, transformOrigin: origin, ease: 'power2.in', duration: 0.8 },
          pushAt,
        );
        tl.fromTo(
          glow,
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            duration: 0.5,
            onStart: () => {
              glow.style.setProperty('--gx', `${horizon().x}px`);
              glow.style.setProperty('--gy', `${horizon().y}px`);
            },
          },
          END - 0.7,
        );
        tl.set(stage, {}, END);
      } else {
        // Telas pequenas: o vídeo termina com o volante à frente e a seção de benefícios já sobe por cima
        // (ver global.css); sem arrancada nem pausa, para não cansar a rolagem
        tl.set(stage, {}, END);

        // A imagem fica fixa atrás dos benefícios até o fim da seção (sem espaçador: os benefícios já têm
        // a própria posição no fluxo, ver global.css) e a seção seguinte entra por cima dela
        const benefits = document.querySelector<HTMLElement>('#beneficios');
        if (benefits) {
          ScrollTrigger.create({
            trigger: stage,
            start: 'top top',
            end: () => {
              const bottom = benefits.getBoundingClientRect().bottom + window.scrollY;
              return `+=${Math.max(0, Math.round(bottom - window.innerHeight))}`;
            },
            pin: stage,
            pinSpacing: false,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          });
        }
      }

      return () => {
        root.classList.remove('is-pov');
        document.documentElement.classList.remove('has-pov-benefits', 'intro-pinned');
        video.pause();
        video.removeAttribute('src');
        video.load();
        gsap.set([video, heroCopy, cockCopy, hint, glow, shade, povHead, dim, ...cards], { clearProps: 'all' });
      };
    },
  );
}
