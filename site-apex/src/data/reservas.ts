/**
 * Conteúdo da página Apex Reservas. Só entra aqui o que já está confirmado; o que ainda é exemplo ou está a confirmar
 * vem marcado como [a confirmar] ou como placeholder.
 */
import { gatewayFees } from './eventos';

export const hero = {
  title: 'Simplifique as reservas da sua operação',
  lead: 'Gerencie veículos, pistas, horários e reservas em uma única plataforma. Do kartódromo às experiências com carros e outros veículos.',
  cta: 'Solicitar demonstração',
};

export const booking = {
  title: 'Suas experiências disponíveis para reserva online',
  lead: 'Ofereça um site com a cor e o logo da sua marca, onde seus clientes consultam horários, escolhem a experiência e pagam online. Tudo organizado em uma única plataforma.',
  note: 'As reservas também podem ser feitas presencialmente, pelo próprio estabelecimento.',
  points: [
    { title: 'Horários em tempo real', text: 'Seu cliente vê o que está livre e reserva na hora, sem esperar o atendimento.' },
    { title: 'Escolha pela disponibilidade', text: 'Ele seleciona experiência, data e horário entre as opções disponíveis.' },
    { title: 'Reserva e pagamento no site', text: 'Tudo concluído online, com pagamento integrado.' },
    { title: 'Tudo organizado na sua agenda', text: 'As reservas confirmadas entram automaticamente na plataforma.' },
    { title: 'Financeiro no painel', text: 'Acompanhe seus recebimentos e valores disponíveis para saque, conforme os prazos de processamento do pagamento.' },
  ],
  cta: 'Solicitar demonstração',
};

export const operation = {
  title: 'Controle toda a operação em um só lugar',
  lead: 'Pistas, veículos, horários, sessões e reservas ficam ligados na mesma plataforma. Quando uma reserva entra, a operação já enxerga o que muda.',
  /** Cada recurso alimenta o próximo; `then` é a frase de ligação com o item seguinte (o último não tem). */
  chain: [
    { id: 'pistas', title: 'Pistas', text: 'Cada pista com os seus horários.', then: 'recebem os veículos' },
    { id: 'veiculos', title: 'Veículos e karts', text: 'A frota que cada sessão usa.', then: 'ocupam os horários' },
    { id: 'horarios', title: 'Disponibilidade e horários', text: 'O que está livre, ocupado ou bloqueado.', then: 'formam as sessões' },
    { id: 'sessoes', title: 'Sessões e corridas', text: 'A programação de cada dia.', then: 'recebem as reservas' },
    { id: 'reservas', title: 'Reservas', text: 'Quem reservou e para quando.' },
  ],
};

export const modalities = {
  title: 'Do kartódromo a outras experiências de pilotagem',
  lead: 'Diferentes pistas, veículos e experiências. Uma só plataforma.',
  main: { name: 'Kartódromos', text: 'Indoor ou outdoor, a gestão de pistas, karts e reservas em um só lugar.', image: 'rv-kartodromo', alt: 'Três karts disputando posição em uma curva do kartódromo' },
  others: [
    { name: 'Experiências com carros', image: 'rv-carros', alt: 'Carro esportivo azul em uma curva de circuito, com o piloto ao volante' },
    { name: 'Outros veículos e experiências de pilotagem', image: 'rv-outros', alt: 'Piloto de quadriciclo em uma pista de terra com curvas e pneus na borda' },
  ],
  sizes: 'De operações pequenas a grandes: a plataforma acompanha o tamanho do seu negócio.',
};


/**
 * Como a empresa contrata o Apex Reservas. As formas seguem o formato da página de Eventos (abas).
 * Valores de exemplo, a confirmar com o time do Apex: 2% por reserva e R$ 449/mês (o mesmo plano Evento + Reservas de Eventos).
 */
export const pricing = {
  title: 'Como contratar o Apex Reservas',
  plans: [
    {
      id: 'reservas',
      name: 'Só Reservas',
      tagline: 'Pague conforme as reservas',
      heading: 'Sem mensalidade. Pague conforme as reservas',
      lead: 'Sem custos fixos para começar. A cobrança é um percentual sobre cada reserva, e você decide se prefere absorvê-lo ou repassá-lo aos clientes.',
      points: [] as string[],
      rates: { title: 'Taxa por reserva', items: [{ value: '2%', label: 'Sobre cada reserva' }] },
      calc: {
        lowVolumePercent: 2,
        highVolumePercent: 2,
        volumeThreshold: 100,
        priceMax: 1500,
        gateway: gatewayFees,
        copy: {
          title: 'Simule o repasse das suas reservas',
          lead: 'Informe a quantidade de reservas e o valor médio de cada uma para descobrir quanto receberia.',
          qty: 'Quantidade de reservas',
          price: 'Valor médio da reserva',
          finalPrice: 'Valor final da reserva para o cliente',
          items: 'reservas',
          itemValue: 'o valor da reserva',
          unit: 'reserva',
        },
      },
    },
    {
      id: 'eventos-reservas',
      name: 'Evento + Reservas',
      tagline: 'Mensalidade fixa',
      heading: 'Eventos e reservas em uma só solução',
      lead: 'Para quem organiza eventos e também administra reservas: uma mensalidade fixa, menor do que contratar cada um separadamente.',
      points: [] as string[],
      summary: {
        label: 'Mensalidade fixa (exemplo)',
        big: 'R$ 449/mês',
        rows: [
          { label: 'Eventos', value: 'Ilimitados' },
          { label: 'Reservas', value: 'Incluídas' },
          { label: 'Cobrança', value: 'Mensalidade fixa' },
        ],
      },
    },
  ],
};

/**
 * Empresas que usam o Apex para reservas (kartódromos, mas também operações com carros e outros veículos).
 * Enquanto `logos` estiver vazio, a seção mostra quadros de exemplo (placeholders) para apresentação.
 * INSTRUÇÃO PARA O DEV: preencher `logos` com { name, logo } (arquivos em /public/images/clientes/) e,
 * se houver menos de `minLogos` empresas reais e autorizadas, NÃO exibir a seção (ver src/pages/reservas.astro).
 */
export interface ProofLogo { name: string; logo: string }
export const proof = {
  title: 'Empresas que usam o Apex para reservas',
  minLogos: 3,
  logos: [] as ProofLogo[],
  placeholders: 6,
};

export const faq = [
  { title: 'O Apex funciona para kartódromos indoor e outdoor?', content: 'Sim. O Apex atende kartódromos indoor e outdoor.' },
  { title: 'É possível gerenciar diferentes pistas e veículos?', content: 'Sim. Você gerencia pistas, veículos e karts, além de horários, sessões e reservas, em um só lugar.' },
  { title: 'Os clientes conseguem fazer reservas pelo próprio site?', content: 'Sim. O estabelecimento tem um site em que os clientes consultam os horários disponíveis e fazem a reserva online.' },
  { title: 'Como funcionam os pagamentos das reservas?', content: 'O pagamento é realizado no momento da reserva, dentro da plataforma, e os valores são direcionados ao painel financeiro do estabelecimento. O recebimento ocorre em até 24 horas para pagamentos via Pix e em 30 dias para cartão, conforme os prazos da plataforma de pagamento.\nNo painel, você acompanha os valores recebidos, a receber, disponíveis para saque e já retirados no mês.\nA plataforma cobra um percentual sobre cada reserva realizada.' },
  { title: 'O sistema atende operações de diferentes tamanhos?', content: 'Sim. A plataforma serve de operações pequenas a grandes.' },
  { title: 'É possível usar o Apex para experiências com carros e outros veículos?', content: 'Sim. Os kartódromos são o foco principal, mas o Apex também atende operações com carros e outros veículos e experiências de pilotagem.' },
  { title: 'Como contratar o Apex?', content: 'Preencha o formulário no fim desta página e fale com a nossa equipe.', link: { label: 'Ir para o formulário', href: '#contato' } },
];

export const faqCta = { text: 'Ainda tem dúvidas? Fale com a nossa equipe.', label: 'Falar com a equipe' };

export const cta = {
  title: 'Centralize a gestão e as reservas da sua operação',
  lead: 'Conheça o Apex e organize pistas, veículos, horários e reservas em uma única plataforma.',
  submit: 'Quero conhecer o Apex',
};
