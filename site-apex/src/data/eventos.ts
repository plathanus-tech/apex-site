/**
 * Conteúdo da página comercial do Apex Eventos.
 * Textos vieram do briefing. Tudo marcado como PLACEHOLDER (logos, indicadores, case, páginas de exemplo,
 * taxas do simulador) NÃO é dado real e deve ser substituído antes de publicar.
 */

export const hero = {
  title: 'Seu evento, do planejamento à realização. Tudo em um só lugar.',
  text: 'Organize inscrições, acompanhe vendas e gerencie a operação dos seus eventos automobilísticos com o Apex.',
  cta: 'Quero organizar meu evento',
  differentials: [
    { icon: 'account_balance_wallet', label: 'Painel financeiro para acompanhar seus recebimentos' },
    { icon: 'payments', label: 'Você só paga quando vende' },
    { icon: 'dashboard', label: 'Gestão de eventos em uma única plataforma' },
  ],
};

export const compare = {
  title: 'Menos trabalho manual. Mais controle sobre seu evento',
  without: [
    'Inscrições e informações espalhadas',
    'Controle manual de participantes e vendas',
    'Planilhas para acompanhar resultados',
    'Gestão operacional descentralizada',
    'Dificuldade para visualizar o andamento do evento',
  ],
  with: [
    'Inscrições centralizadas',
    'Acompanhamento de vendas e participantes',
    'Informações organizadas em um só lugar',
    'Recursos para controle operacional',
    'Visibilidade sobre os resultados',
  ],
};

export const journey = {
  title: 'Do primeiro cadastro ao encerramento do evento',
  steps: [
    { n: 1, title: 'Configure seu evento', text: 'Cadastre as informações principais e a modalidade do evento. Defina também as categorias e as inscrições.' },
    { n: 2, title: 'Divulgue e gerencie inscrições', text: 'O evento ganha uma página pública, com a identidade da sua marca. O participante conhece o evento e se inscreve, e você acompanha as inscrições pelo painel.' },
    { n: 3, title: 'Acompanhe tudo pelo painel', text: 'Acompanhe as inscrições, as compras de itens adicionais, os fornecedores e o financeiro do seu evento em um só lugar.' },
  ],
};

export const athlete = {
  title: 'Uma experiência simples também para quem participa',
  items: [
    { icon: 'web', label: 'Página de apresentação do evento' },
    { icon: 'how_to_reg', label: 'Inscrição e pagamento' },
    { icon: 'calendar_month', label: 'Informações e programação' },
    { icon: 'leaderboard', label: 'Ranking e resultados' },
  ],
  note: 'Eventos independentes ou campeonatos com várias etapas: você não precisa criar um campeonato para usar o Apex.',
};

export const features = {
  title: 'Tudo o que seu evento precisa para acontecer',
  items: [
    { id: 'gestao', icon: 'monitoring', title: 'Gestão e resultados', text: 'Acompanhe vendas, inscrições, desempenho e resultados dos seus eventos.' },
    { id: 'operacao', icon: 'build', title: 'Controle operacional', text: 'Gerencie pneus, abastecimento, fornecedores e outros recursos da operação.' },
    { id: 'marca', icon: 'palette', title: 'White label', text: 'Tenha sua própria identidade visual e um site personalizado para seus eventos.' },
    { id: 'pagamentos', icon: 'account_balance_wallet', title: 'Pagamentos e repasses', text: 'Receba pagamentos pela plataforma e acompanhe tudo no painel financeiro: o que está a receber e o que já está disponível para saque.' },
  ],
};

export const sizes = {
  title: 'Uma plataforma que acompanha o tamanho do seu evento',
  items: [
    { n: '01', image: 'size-pequeno', alt: 'Pilotos preparando karts na pista de um kartódromo, com amigos e familiares assistindo atrás da grade', name: 'Eventos pequenos', text: 'Facilidade para criar e administrar eventos sem uma estrutura complexa.' },
    { n: '02', image: 'size-medio', alt: 'Pilotos de motovelocidade disputando posição em uma curva de autódromo', name: 'Eventos médios', text: 'Mais controle sobre inscrições, vendas e operação.' },
    { n: '03', image: 'size-grande', alt: 'Pódio de uma grande competição de automobilismo, com pilotos erguendo troféus diante de arquibancadas lotadas', name: 'Grandes eventos', text: 'Recursos para administrar alto volume, fornecedores, etapas e necessidades operacionais.' },
  ],
};

// Números reais (28 eventos, +1.500 pilotos cadastrados) e banners de eventos reais
export const proof = {
  title: 'Eventos reais. Experiências que já passaram pelo Apex',
  // Banners de eventos que já passaram pelo Apex
  banners: [
    { id: 'cbc-2k24', name: 'Copa Beto Carrero 2K24' },
    { id: 'cbc-2025', name: 'Copa Beto Carrero 2025' },
    { id: 'catarinense-2024', name: 'Campeonato Catarinense de Kart 2024' },
    { id: 'gaucho-2026', name: 'Campeonato Gaúcho de Kart 2026' },
    { id: 'pato-branco-2026', name: 'Copa Pato Branquense 2026, 1ª etapa' },
  ],
  stats: [
    { label: 'eventos realizados', value: '28' },
    { label: 'pilotos cadastrados', value: '+1.500' },
  ],
};

/**
 * PLACEHOLDERS: modelo dos cards de próximos eventos. Substituir pelos eventos reais (integração com a lista de eventos do Apex).
 * status: 'abertas' | 'breve' | 'encerrado'
 */
export type EventStatus = 'abertas' | 'breve' | 'encerrado';
export interface EventItem {
  title: string; status: EventStatus; dates: string; venue: string; place: string; href: string; image?: string;
  /** Dados usados pelos filtros e pela ordenação de /eventos/todos */
  state: string; // UF
  startsAt: string; // AAAA-MM-DD (início do evento)
  modality: string;
  categories: string[];
}
// Nos eventos de exemplo (placeholders), estado, data, modalidade e categorias são fictícios, só para os filtros funcionarem na apresentação.
export const events: EventItem[] = [
  // Evento real (dados da página pública no Apex): 1º JCI Kart Rental
  { title: '1º JCI Kart Rental', status: 'abertas', dates: '12/12/2026', venue: 'Kartódromo Internacional - Júnior Kart Clube', place: 'Chapecó - SC', href: 'https://www.apexhub.com.br/junior-kart-clube/events/1-jci-kart-rental', image: '/images/evento-jci.webp',
    state: 'SC', startsAt: '2026-12-12', modality: 'Kart rental', categories: ['85 kg', '95 kg', '110 kg'] },
  { title: 'Título do evento 2', status: 'breve', dates: 'dd/mm/aaaa - dd/mm/aaaa', venue: 'Kartódromo [nome]', place: 'Cidade - UF', href: '#',
    state: 'PR', startsAt: '2027-01-23', modality: 'Kart', categories: ['Cadete', 'Mirim', 'F4 Sênior'] },
  { title: 'Título do evento 3', status: 'abertas', dates: 'dd/mm/aaaa - dd/mm/aaaa', venue: 'Kartódromo [nome]', place: 'Cidade - UF', href: '#',
    state: 'SC', startsAt: '2027-01-30', modality: 'Kart', categories: ['F4 Sênior', 'KZ Iniciante'] },
  { title: 'Título do evento 4', status: 'abertas', dates: 'dd/mm/aaaa - dd/mm/aaaa', venue: 'Kartódromo [nome]', place: 'Cidade - UF', href: '#',
    state: 'RS', startsAt: '2027-02-13', modality: 'Motovelocidade', categories: ['Júnior', 'Sênior'] },
  { title: 'Título do evento 5', status: 'breve', dates: 'dd/mm/aaaa - dd/mm/aaaa', venue: 'Kartódromo [nome]', place: 'Cidade - UF', href: '#',
    state: 'SP', startsAt: '2027-03-06', modality: 'Automobilismo virtual', categories: ['Pro', 'Amador'] },
  { title: 'Título do evento 6', status: 'encerrado', dates: 'dd/mm/aaaa - dd/mm/aaaa', venue: 'Kartódromo [nome]', place: 'Cidade - UF', href: '#',
    state: 'SC', startsAt: '2026-10-17', modality: 'Kart rental', categories: ['85 kg', '95 kg'] },
];
export const statusLabel: Record<EventStatus, string> = { abertas: 'Inscrições abertas', breve: 'Inscrições em breve', encerrado: 'Evento encerrado' };


/**
 * Taxas da forma "Por evento". `volumeThreshold` é o número de inscrições até o qual vale a taxa menor volume.
 * PENDENTE: o critério comercial entre as duas faixas não foi confirmado; 100 é só um valor provisório (ajuste aqui).
 */
export const perEventFees = { lowVolumePercent: 5, highVolumePercent: 3, volumeThreshold: 100 };

/** Taxa do meio de pagamento (Pagar.me), em %, somada à taxa do Apex na calculadora. */
export const gatewayFees = { pix: 0.99, card: 3.3 };

export const pricing = {
  title: 'Três formas de contratar o Apex Eventos',
  plans: [
    {
      id: 'evento',
      name: 'Por evento',
      tagline: 'Sem mensalidade fixa',
      heading: 'Sem mensalidade. Pague conforme as inscrições',
      lead: 'Sem custos fixos para começar. A taxa varia conforme o volume de inscrições, e você decide se prefere absorvê-la ou repassá-la aos participantes.',
      points: [] as string[],
      rates: {
        title: 'Taxa por volume',
        items: [
          { value: '5%', label: 'Menor volume de inscrições' },
          { value: '3%', label: 'Maior volume de inscrições' },
        ],
      },
      payers: { title: 'Quem assume a taxa', items: ['Organizador', 'Participante'], caption: 'A escolha é do organizador' },
      calc: { ...perEventFees, gateway: gatewayFees },
    },
    {
      id: 'ilimitado',
      name: 'Ilimitado',
      tagline: 'Mensalidade fixa',
      heading: 'Mensalidade fixa. Eventos sem limite',
      lead: 'Pague uma mensalidade fixa e organize quantos eventos você precisar.',
      points: [] as string[],
      summary: {
        label: 'Mensalidade fixa (exemplo)',
        big: 'R$ 299/mês',
        rows: [
          { label: 'Eventos', value: 'Ilimitados' },
          { label: 'Cobrança', value: 'Mensalidade fixa' },
        ],
      },
    },
    {
      id: 'eventos-reservas',
      name: 'Evento + Reservas',
      tagline: 'Eventos e reservas em uma só solução',
      heading: 'Eventos e reservas em uma só solução',
      lead: 'Gerencie seus eventos e as reservas de pista na mesma contratação, com uma mensalidade fixa menor do que contratar cada um separadamente.',
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

export const faq = [
  { title: 'Preciso organizar um campeonato ou posso criar apenas um evento?', content: 'Você pode criar apenas um evento. O Apex atende eventos independentes e também campeonatos com várias etapas.' },
  { title: 'Posso personalizar a página do meu evento?', content: 'Sim. A página do evento pode levar a identidade visual da sua marca, e também é possível ter um site totalmente personalizado, desenvolvido sob orçamento.', link: { label: 'Falar sobre um site personalizado', href: '#contato' } },
  { title: 'Como funcionam os repasses?', content: 'Os valores das vendas vão para o painel financeiro, já sem as taxas. Pagamentos em Pix entram em até 24 horas e os de cartão, depois de 30 dias. No painel você vê o que já foi retirado no mês, o que está a receber e o que já está disponível para saque.' },
  { title: 'Existe mensalidade ou custo para começar?', content: 'Depende de como você contrata. Por evento, você só paga quando vende e pode começar sem custo fixo; os planos Ilimitado e Evento + Reservas são cobrados por mensalidade. [Valores e condições a confirmar]' },
  { title: 'Quais modalidades posso cadastrar?', content: 'O Apex atende qualquer modalidade de automobilismo, como kart, track day e automobilismo virtual.' },
  { title: 'Como funciona o controle de inscrições?', content: 'As inscrições ficam centralizadas no painel, onde você acompanha vendas, pagamentos e os participantes, com a categoria de cada um.' },
  { title: 'Como funciona o gerenciamento de fornecedores?', content: 'No Apex, cada fornecedor possui seu próprio cadastro e gerencia os itens sob sua responsabilidade, como pneus, combustível e motor. Você pode vincular fornecedores à sua conta usando o CNPJ e, depois, associá-los aos eventos em que irão atuar. O fornecedor pode ser sua própria empresa ou um parceiro externo.' },
  { title: 'Posso vincular o evento a uma federação?', content: 'Sim. O vínculo é opcional e permite associar seu evento a uma federação. Com isso, ela poderá acompanhar o evento, visualizar os inscritos e publicar o ranking.' },
  { title: 'Como faço para começar?', content: 'Preencha o formulário no fim desta página e fale com a nossa equipe.', link: { label: 'Ir para o formulário', href: '#contato' } },
];
