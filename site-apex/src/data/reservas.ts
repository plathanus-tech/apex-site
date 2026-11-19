/**
 * Conteúdo da página Apex Reservas. Só entra aqui o que já está confirmado; o que ainda é exemplo ou está a confirmar
 * vem marcado como [a confirmar] ou como placeholder.
 */
import { gatewayFees } from './eventos';

export const hero = {
  title: 'Gestão e reservas para pistas e experiências de pilotagem',
  lead: 'Gerencie veículos, pistas, horários e reservas em uma única plataforma. Do kartódromo às experiências com carros e outros veículos.',
  cta: 'Solicitar demonstração',
};

export const booking = {
  title: 'Reservas online para seus clientes',
  lead: 'Seu estabelecimento ganha um site para que os clientes vejam os horários disponíveis, reservem e paguem sozinhos, sem depender de telefone ou WhatsApp.',
  points: [
    { title: 'Disponibilidade na hora', text: 'O cliente consulta o que está livre antes de decidir.' },
    { title: 'Escolha do horário', text: 'Ele escolhe o horário que prefere, no próprio site.' },
    { title: 'Reserva e pagamento no site', text: 'O cliente reserva e paga no mesmo lugar, sem esperar resposta.' },
    { title: 'Reserva direto na agenda', text: 'Cada reserva feita no site entra automaticamente no seu sistema.' },
  ],
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
  main: { name: 'Kartódromos', text: 'Indoor ou outdoor, a gestão de pistas, karts e reservas em um só lugar.', image: 'mod-kart', alt: 'Piloto de kart em uma curva do kartódromo' },
  others: [
    { name: 'Experiências com carros', image: 'mod-track-day', alt: 'Carro esportivo em uma curva de circuito' },
    { name: 'Outros veículos e experiências de pilotagem', image: 'mod-outras-modalidades', alt: 'Carros disputando posição em um circuito' },
  ],
  sizes: 'De operações pequenas a grandes: a plataforma acompanha o tamanho do seu negócio.',
};

export const payments = {
  title: 'Pagamentos integrados às reservas',
  lead: 'O cliente paga a reserva na própria plataforma e o valor vai para o painel financeiro do estabelecimento, no mesmo lugar em que você administra a operação.',
  steps: [
    { icon: 'event_available', title: 'O cliente reserva', text: 'Escolhe o horário no site e faz a reserva.' },
    { icon: 'credit_card', title: 'Paga na plataforma', text: 'O pagamento é feito junto com a reserva.' },
    { icon: 'account_balance', title: 'Cai no painel financeiro', text: 'O valor entra no painel do estabelecimento, já sem as taxas.' },
  ],
  /** Quando o valor chega ao painel financeiro, por forma de pagamento. */
  timing: [
    { label: 'Pix', value: 'até 24 horas' },
    { label: 'Cartão', value: '30 dias' },
  ],
  /** O que o painel financeiro mostra. */
  panel: { title: 'No painel financeiro você vê', items: ['O que já foi retirado no mês', 'O que está a receber', 'O que já está disponível para saque'] },
  fee: {
    title: 'Como funciona a taxa',
    text: 'A cobrança é sempre um percentual sobre cada reserva.',
    payers: ['Estabelecimento', 'Cliente'],
    payersTitle: 'Quem assume a taxa',
    payersCaption: 'A escolha é do estabelecimento',
  },
  pending: 'O percentual da taxa ainda não foi confirmado',
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
  { title: 'Como funcionam os pagamentos das reservas?', content: 'O pagamento é feito junto com a reserva, dentro da plataforma, e o valor vai para o painel financeiro do estabelecimento: pagamentos em Pix entram em até 24 horas e os de cartão, depois de 30 dias. No painel você vê o que já foi retirado no mês, o que está a receber e o que já está disponível para saque. A cobrança é um percentual sobre cada reserva. [Percentual a confirmar com o time do Apex]' },
  { title: 'O sistema atende operações de diferentes tamanhos?', content: 'Sim. A plataforma serve de operações pequenas a grandes.' },
  { title: 'É possível usar o Apex para experiências com carros e outros veículos?', content: 'Sim. Os kartódromos são o foco principal, mas o Apex também atende operações com carros e outros veículos e experiências de pilotagem.' },
  { title: 'Como contratar o Apex?', content: 'Preencha o formulário no fim desta página e fale com a nossa equipe.', link: { label: 'Ir para o formulário', href: '#contato' } },
];

export const cta = {
  title: 'Centralize a gestão e as reservas da sua operação',
  lead: 'Conheça o Apex e organize pistas, veículos, horários e reservas em uma única plataforma.',
  submit: 'Quero conhecer o Apex',
};
