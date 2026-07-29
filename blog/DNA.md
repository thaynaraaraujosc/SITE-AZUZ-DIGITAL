# DNA do Blog — Azuz Digital

> Todo agente que escreve um artigo para este blog lê este arquivo primeiro.
> Fonte da marca: `02-AZUZ/DNA.md` no vault CEREBRO THAYNARA. Este arquivo é a versão resumida e aplicada a conteúdo de blog/SEO.

---

## 1. Negócio

Azuz Digital é agência de **marketing e tecnologia**. Frentes de atuação:

1. Marketing e fortalecimento de marca (posicionamento, branding, conteúdo)
2. Desenvolvimento de sites institucionais e comerciais
3. Desenvolvimento de aplicativos próprios
4. CRM próprio

Fundadora: Thaynara Araujo, CEO e Estrategista de Marca. Sede em expansão para Goiânia (GO), também atende Palmas (TO) e Lisboa (Portugal).

Domínio: azuzdigital.com · Instagram: @Ag.azuzdigital

## 2. Persona do leitor do blog

**Especialista com excelência invisível**: médico, consultora, advogado, empresário. Tem autoridade técnica genuína mas presença digital fraca ou genérica. Busca no Google/IA termos como "como atrair pacientes/clientes", "marketing para [profissão]", "site profissional para consultório", etc.

**Aspira:** ser referência na especialidade, não só localmente.
**Teme:** investir em marketing e não ver retorno mensurável.
**Resistência:** desconfia de promessas de viralização; quer método.

Anti-persona: quem busca dicas genéricas gratuitas e não tem orçamento para posicionamento real. Não escrever para essa pessoa.

## 3. Pilares de conteúdo (temas do blog)

1. Posicionamento e branding para profissionais/empresas
2. Marketing e publicidade em geral (tráfego pago, funil, métricas, campanhas, criação publicitária, redes sociais, conteúdo, marca em mídia paga e orgânica)
3. Tecnologia aplicada a negócios (sites, apps, CRM, automação)
4. Inteligência artificial aplicada a marketing e negócios (IA generativa, automação de atendimento, GEO/otimização para IAs de busca, uso responsável de IA em conteúdo e publicidade)
5. Bastidores/método Azuz (diagnóstico, estratégia, execução, resultados)

**Importante: os pilares 2, 3 e 4 (marketing, publicidade e IA) são de interesse geral e
não devem se limitar à persona médica.** O pilar 1 (posicionamento/branding) é o único que
frequentemente puxa para uma profissão específica (médico, advogado, consultora,
empresário); nos demais pilares, escreva pensando em qualquer negócio ou profissional que
precise se posicionar digitalmente, sem restringir a linguagem a um nicho regulado (CFM,
OAB) a menos que o tema exija.

Ao escolher o tema em `blog-post` Passo 2, **alterne a persona/profissão a cada artigo**
(não publique dois artigos seguidos sobre a mesma profissão, e não concentre a produção em
conteúdo médico) e **garanta que marketing, publicidade e IA apareçam com a mesma
frequência que os temas de branding/posicionamento**, revisando `blog/articles.json` para
balancear a distribuição entre os 5 pilares antes de escolher.

## 4. Tom de voz (aplicado a artigo de blog)

Estrategista sênior que chegou depois do diagnóstico. Não pergunta, afirma. Não suaviza, direciona. Não motiva, posiciona.

**Usa:** posicionamento, estratégia, autoridade, resultado, construção, presença, diagnóstico, método, performance, referência.

**Evita:** engajamento (como fim), viralizar, inovação (vago), potencializar, "conteúdo bonito", crescimento orgânico sem qualificador.

### Proibido em qualquer artigo

- Travessão (—) em qualquer lugar do texto. Trocar por vírgula, ponto, dois-pontos ou parênteses. Regra sem exceção.
- "Não é X, é Y" (paralelismo formulaico)
- "Em um mundo onde..."
- "Descubra como..."
- "Você sabia que [estatística vaga]?"
- "Bora!", "Manda bala!", gíria de agência jovem
- Emoji de foguete, três emojis seguidos
- Linguagem genérica de blog de agência ("dicas infalíveis", "guia completo definitivo")

### CTA padrão de fim de artigo

"FALAR COM ESPECIALISTA" ou "AGENDAR DIAGNÓSTICO", linkando para o formulário de interesse já usado no site (`https://forms.clickup.com/90171360473/f/2kza3h6t-537/4FM1Z1A12L7P5CXYLY`).

Proibido: "Clique aqui", "Saiba mais", "Acesse o link da bio".

## 5. Identidade visual (aplicada ao template do artigo)

| Cor | Hex | Uso |
|---|---|---|
| Azul-Marinho | `#0B1533` | Fundo dominante, header do artigo |
| Azul Vibrante | `#2E6BFF` | Acentos, links, CTA |
| Cinza Claro | `#F5F5F5` | Fundo de corpo de texto |
| Branco | `#FFFFFF` | Texto sobre fundo escuro |

Tipografia: Poppins (títulos/display), Montserrat (corpo/subtítulos). Mesmas fontes já carregadas no `index.html` do site via Google Fonts.

## 6. SEO e GEO (otimização para busca e IA)

- Cada artigo mira 1 keyword principal de intenção comercial ou informacional ligada aos pilares do item 3.
- Título (H1) contém a keyword principal de forma natural, sem clickbait.
- Meta description entre 140 e 160 caracteres, resume o benefício real do artigo.
- Usar heading hierárquico (H1 único, H2 para seções, H3 se necessário).
- Incluir pelo menos 1 link interno para outra página do site (serviços, portfolio, ebook) e, quando fizer sentido, para outro artigo do blog.
- Marcar o artigo com JSON-LD tipo `Article` (ver `blog/_template.html`).
- Otimizar para "respostas de IA" (GEO): responder a pergunta central do artigo de forma direta nos primeiros 2 parágrafos, antes de aprofundar. Ferramentas de IA (ChatGPT, Perplexity, Google AI Overview) tendem a citar a resposta direta encontrada no início do conteúdo.
- Extensão alvo: 800 a 1400 palavras. Sem enrolação para bater meta de palavras.

## 7. Regras de publicação

- Todo artigo novo é: pesquisado → escrito → revisado com o checklist de `seo-geo` → passado pelo `humanizer` → validado contra este DNA → publicado.
- Publicação é **commit direto no repositório, sem revisão humana prévia** (decisão da Thaynara, 2026-07-29). Isso vale para as execuções agendadas do agente `blog-post`.
- Nenhum dado sensível de cliente (nomes, valores de contrato, métricas privadas) pode aparecer em artigo de blog público.
