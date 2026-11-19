/**
 * Conteúdo do site. ATENÇÃO: tudo marcado como `placeholder: true` é FICTÍCIO e serve só
 * para validar layout e movimento. Substitua por dados reais antes de publicar.
 */
export const DEMO_URL = '#demonstracao'; // pendente: destino real do pedido de demonstração
export const QUOTE_URL = '#demonstracao'; // pendente: destino real do pedido de orçamento (página personalizada)

export const nav = [
  { label: 'Eventos', href: '/eventos' },
  { label: 'Reservas', href: '/reservas' },
  { label: 'FAQ', href: '/#faq', header: false }, // fica só no rodapé
];

export const solutions = [
  {
    id: 'eventos', kicker: 'Apex Eventos', title: 'Organize o evento. Do grid à bandeirada',
    text: 'Gestão e organização de eventos automobilísticos.',
    value: 'Para organizadores: planejar e gerenciar cada evento em um só lugar.',
    cta: 'Conhecer Eventos', href: '/eventos', icon: 'flag',
  },
  {
    id: 'reservas', kicker: 'Apex Reservas', title: 'Reserve a pista. Sem fila, sem planilha',
    text: 'Gestão de reservas e da operação de kartódromos e estabelecimentos.',
    value: 'Para kartódromos e estabelecimentos: administrar reservas e operação em um só lugar.',
    cta: 'Conhecer Reservas', href: '/reservas', icon: 'event_available',
  },
];

// FICTÍCIO (sem uso no momento): marcas de exemplo de páginas com marca própria
export const whiteLabel = {
  placeholder: true,
  event: { brand: 'Copa Exemplo', accent: '#2F6BFF', title: 'Copa Exemplo de Kart', meta: 'Etapa 3 · Kartódromo Exemplo', cta: 'Inscrever-se' },
  rental: { brand: 'Kart Arena', accent: '#16C784', title: 'Reserve sua bateria', meta: 'Kart Arena Exemplo · Sáb, 14h00', cta: 'Reservar' },
};

// FICTÍCIO
export const proof = {
  placeholder: true,
  // PLACEHOLDERS: textos temporários, substituir por depoimentos reais (fala, nome e empresa ou kartódromo de cada autor)
  testimonials: [
    { solution: 'Apex Eventos', quote: '[Depoimento real de um organizador que usa o Apex Eventos para gerenciar seus eventos]', author: '[Nome do organizador]', role: '[Empresa ou kartódromo]' },
    { solution: 'Apex Reservas', quote: '[Depoimento real de um cliente ou estabelecimento que usa o Apex Reservas]', author: '[Nome do cliente ou responsável]', role: '[Empresa ou kartódromo]' },
  ],
  stats: [
    { value: 120, suffix: '+', label: 'eventos realizados' },
    { value: 8, suffix: ' mil', label: 'pilotos alcançados' },
    { value: 25, suffix: '', label: 'clientes atendidos' },
  ],
};

// FICTÍCIO
export const network = {
  placeholder: true,
  // kind: 'evento' (link para a página do evento) · 'kartodromo' (link para o site, que pode ser white label ou próprio, e também permite reservar)
  items: [
    { name: 'Copa Exemplo de Kart', kind: 'evento', status: 'Evento ativo', href: '#' },
    { name: 'Track Day Exemplo', kind: 'evento', status: 'Evento ativo', href: '#' },
    { name: 'Kart Arena Exemplo', kind: 'kartodromo', status: 'Kartódromo', href: '#' },
    { name: 'Endurance Exemplo', kind: 'evento', status: 'Evento encerrado', href: '#' },
    { name: 'Desafio Exemplo de Kart', kind: 'evento', status: 'Evento ativo', href: '#' },
    { name: 'Kartódromo Exemplo Sul', kind: 'kartodromo', status: 'Kartódromo', href: '#' },
  ],
};

/**
 * TEXTO-BASE A VALIDAR: benefícios gerais redigidos a partir do briefing do projeto.
 * Nenhuma capacidade ou resultado foi confirmado pelo time do Apex.
 */
export const generalBenefits = [
  { icon: 'dashboard', title: 'Mais organização e controle', text: 'A operação acompanhada em uma única plataforma.' },
  { icon: 'task_alt', title: 'Menos processos manuais', text: 'Menos planilhas e controles paralelos no dia a dia.' },
  { icon: 'hub', title: 'Informações centralizadas', text: 'Dados do evento ou da operação reunidos em um só lugar.' },
  { icon: 'groups', title: 'Melhor experiência para o público', text: 'Participantes e clientes acessam tudo em páginas claras e próprias.' },
  { icon: 'palette', title: 'Com a identidade da sua empresa', text: 'A experiência do seu público leva a sua marca, não a do Apex.' },
];

export const howItWorks = [
  {
    id: 'eventos', kicker: 'Apex Eventos',
    steps: [
      { n: '01', title: 'Configure o evento', text: 'Cadastre o evento e defina a identidade da sua marca.', mock: 'form' },
      { n: '02', title: 'Publique a página', text: 'O Apex gera a página do evento, com a sua marca, para o seu público.', mock: 'page' },
      { n: '03', title: 'Acompanhe e gerencie', text: 'Gerencie o evento pelo painel do organizador.', mock: 'list' },
    ],
  },
  {
    id: 'reservas', kicker: 'Apex Reservas',
    steps: [
      { n: '01', title: 'Configure o estabelecimento', text: 'Cadastre a operação e aplique a identidade do estabelecimento.', mock: 'form' },
      { n: '02', title: 'Receba as reservas', text: 'O cliente reserva pela página com a marca do kartódromo.', mock: 'page' },
      { n: '03', title: 'Administre a agenda', text: 'Acompanhe as reservas e a operação pelo painel.', mock: 'list' },
    ],
  },
];

// Exemplos ilustrativos: a lista NÃO é exaustiva e o último card indica que há outras modalidades
export const modalities = {
  items: [
    { name: 'Kart', image: 'mod-kart' },
    { name: 'Track day', image: 'mod-track-day', position: '100% 50%' }, // enquadra o carro inteiro quando a foto é cortada
    { name: 'Automobilismo virtual', image: 'mod-automobilismo-virtual' },
    { name: 'E outras modalidades', image: 'mod-outras-modalidades' },
  ],
};

/** Estrutura dos planos. Valores e condições NÃO fornecidos: ficam como pendência visível. */
export const plans = [
  {
    id: 'evento', name: 'Por evento + taxa',
    summary: 'O organizador contrata o Apex para eventos específicos, com cobrança adicional conforme as condições comerciais.',
    fit: 'Indicado para quem organiza eventos pontuais ou quer começar com um evento.',
    benefits: ['Contratação para eventos específicos', 'Taxa conforme as condições comerciais'],
    fields: [{ label: 'Valor por evento', value: 'A definir' }, { label: 'Taxa', value: 'A definir' }],
  },
  {
    id: 'pacote', name: 'Pacote integral',
    summary: 'Modelo para uma utilização mais ampla da plataforma, permitindo realizar múltiplos eventos conforme as condições contratadas.',
    fit: 'Indicado para quem organiza vários eventos e quer usar a plataforma de forma contínua.',
    benefits: ['Utilização mais ampla da plataforma', 'Múltiplos eventos conforme o contratado'],
    fields: [{ label: 'Valor do pacote', value: 'A definir' }, { label: 'Eventos incluídos', value: 'A definir' }],
  },
];

/**
 * PENDENTE DE INTEGRAÇÃO: endpoint do canal comercial que recebe o formulário de contato da Home
 * (POST JSON: { solutions: ("eventos"|"reservas")[], name, email, company, phone, message }). Enquanto estiver vazio, o formulário valida
 * os campos mas NÃO envia nada e avisa o visitante.
 */
export const CONTACT_ENDPOINT = '';
export const contactSolutions = [
  { value: 'eventos', title: 'Apex Eventos', icon: 'flag' },
  { value: 'reservas', title: 'Apex Reservas', icon: 'event_available' },
];

export const faq = [
  { title: 'Para quais tipos de organizadores o Apex é indicado?', content: 'O Apex é voltado a organizadores de eventos automobilísticos e a kartódromos e estabelecimentos que trabalham com reservas.' },
  { title: 'Quais modalidades são atendidas?', content: 'O Apex atende qualquer modalidade de automobilismo, como kart, track day e automobilismo virtual.' },
  { title: 'Como funciona a personalização com a minha marca?', content: 'Organizadores e estabelecimentos oferecem páginas com a sua própria identidade visual (cor, logo e a imagem que você escolher). O seu público acessa a experiência da sua marca, não necessariamente uma página com a identidade do Apex.' },
  { title: 'Posso contratar só uma das soluções?', content: 'Sim. O Apex Eventos e o Apex Reservas podem ser contratados separadamente ou em conjunto.' },
  { title: 'Preciso ter um site para usar o Apex?', content: 'Não. Você pode usar a página do Apex com a sua marca (logo, cor e imagem), ter um site totalmente personalizado, desenvolvido sob orçamento, ou manter o seu próprio site, ao qual integramos o Apex. Nos três casos, o público consegue fazer a reserva.', link: { label: 'Falar sobre um site personalizado', href: '#demonstracao' } },
  { title: 'Como solicitar uma demonstração?', content: 'Escolha a solução de interesse, preencha o formulário no fim desta página e fale com a nossa equipe.', link: { label: 'Ir para o formulário', href: '#demonstracao' } },
];
