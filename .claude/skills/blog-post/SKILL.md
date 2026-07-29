---
name: blog-post
description: Escreve e publica um artigo novo no blog da Azuz Digital. Gatilhos:"/blog-post", "escreva um artigo", "novo post do blog", "publique um artigo sobre X". Aceita um tema ou palavra-chave opcional como argumento.
---

# Blog Post — Azuz Digital

Este site é **HTML/CSS/JS estático, sem build e sem bundler**. Publicar um artigo é sempre
um processo manual de 2 arquivos: criar `blog/<slug>/index.html` e adicionar a entrada em
`blog/articles.json`. Não existe descoberta automática de arquivos neste stack.

Siga os 7 passos abaixo, nesta ordem, sem pular nenhum.

## Passo 1 — Ler a estratégia

Leia por inteiro, nesta ordem:

1. `blog/DNA.md` — negócio, persona, tom de voz, pilares de conteúdo, regras de SEO/GEO,
   regras de publicação.
2. `.claude/skills/seo-geo/SKILL.md` — checklist de otimização.
3. `.claude/skills/humanizer/SKILL.md` — sinais de texto com "cara de IA" a eliminar.

## Passo 2 — Escolher o tema

Leia `blog/articles.json` para ver os artigos já publicados (título, slug, categoria) e
**não repetir** um tema ou palavra-chave primária já usado recentemente.

- Se o usuário passou um tema/palavra-chave como argumento: ajuste-o aos pilares e ao tom
  do `DNA.md`.
- Se não passou: escolha um pilar de conteúdo seguindo a distribuição sugerida no
  `DNA.md` (item 3), priorizando o que tem menos artigos publicados no `articles.json`.

Defina antes de escrever: palavra-chave primária, título (H1), slug, meta description,
categoria.

## Passo 3 — Escrever o artigo

1. Crie a pasta `blog/<slug>/` e copie `blog/_template.html` para
   `blog/<slug>/index.html`.
2. Substitua todos os placeholders do template:
   - `{{TITLE}}` — título completo (usado em `<title>` e Open Graph)
   - `{{META_DESCRIPTION}}` — 140-160 caracteres, com a palavra-chave primária
   - `{{SLUG}}` — o slug escolhido (aparece em canonical, og:url, JSON-LD, related posts)
   - `{{DATE_ISO}}` — data de hoje, formato `YYYY-MM-DD`
   - `{{CATEGORY}}` — um dos pilares de conteúdo do `DNA.md`
   - `{{H1}}` — pode ser igual a `{{TITLE}}` ou uma variação mais longa
   - `{{DATE_DISPLAY}}` — data de hoje por extenso em PT-BR (ex.: "29 de julho de 2026")
   - `{{READING_TIME}}` — ex.: "6 min de leitura" (~200 palavras/minuto)
   - `{{BODY_HTML}}` — o corpo do artigo (ver primitivas abaixo)
3. Escreva o corpo **só** com estas tags, dentro de `.article-prose` (são as primitivas de
   tipografia do blog, definidas em `blog/blog.css`):
   - `<p>` — parágrafo
   - `<h2 id="algum-id">` — seção principal (id vira âncora)
   - `<h3>` — subseção
   - `<ul><li>` / `<ol><li>` — listas
   - `<strong>` — ênfase
   - `<blockquote class="quote">` — citação/destaque
   - `<div class="callout"><p>...</p></div>` — aviso ou resumo em destaque
   - Links internos: `<a href="../outro-slug/index.html">`; externos (WhatsApp, formulário):
     sempre com `target="_blank" rel="noopener"`.
4. Siga as regras de SEO do `DNA.md`: 900-1500 palavras (ou 800-1400, conforme o item 6 do
   DNA), 1 keyword primária no título/description/1º parágrafo/1 H2, introdução com o
   problema do leitor, 3-6 H2, uma seção com lista numerada de passos, conclusão, 1-2 links
   para artigos já publicados (escolha em `articles.json`) e CTA final para o formulário de
   diagnóstico (não é preciso editar `article-cta`, já vem pronto no template).

## Passo 4 — Humanizar

Releia o `{{BODY_HTML}}` que você escreveu e reescreva aplicando o `.claude/skills/humanizer/SKILL.md`
e a lista "Proibido em qualquer artigo" do `DNA.md` (item 4): sem travessão, sem "não é X, é
Y", sem aberturas genéricas, sem vocabulário inflado de IA, frases de comprimento variado.

## Passo 5 — Registrar

Como não há descoberta automática, publicar exige tocar em 2 arquivos além do artigo:

1. **`blog/articles.json`** — adicione um objeto ao array (mantenha JSON válido):
   ```json
   {
     "slug": "<slug>",
     "title": "<título completo>",
     "description": "<meta description>",
     "publishedAt": "YYYY-MM-DD",
     "readingTime": 6,
     "category": "<pilar do DNA>",
     "author": { "name": "Thaynara Araujo", "role": "CEO e Estrategista de Marca" }
   }
   ```
2. **`sitemap.xml`** (raiz do projeto) — adicione uma entrada `<url>`:
   ```xml
   <url>
     <loc>https://azuzdigital.com/blog/<slug>/index.html</loc>
     <lastmod>YYYY-MM-DD</lastmod>
     <changefreq>monthly</changefreq>
     <priority>0.7</priority>
   </url>
   ```

## Passo 6 — Validar

- Confirme que `blog/articles.json` continua sendo um JSON válido (rode
  `node -e "JSON.parse(require('fs').readFileSync('blog/articles.json'))"` ou
  `python3 -m json.tool blog/articles.json` e confira que não dá erro).
- Releia o HTML gerado conferindo: nenhum placeholder `{{...}}` sobrou, a palavra-chave
  primária aparece nos lugares certos, nenhum travessão, nenhum número/depoimento/caso de
  cliente inventado, os links internos apontam para slugs que existem de fato em
  `blog/articles.json`.
- Abra `blog/index.html` e `blog/<slug>/index.html` num servidor local
  (`python3 -m http.server 8000` na raiz do projeto) e confira visualmente: o card do
  artigo aparece na listagem, o artigo abre, o header/nav/footer estão iguais ao resto do
  site, "Continue lendo" mostra os relacionados.
- Se algo quebrar e não der para corrigir, **não prossiga para o Passo 7**: pare e reporte
  o problema.

## Passo 7 — Entregar

**Regra fixa (decisão da Thaynara Araujo, 2026-07-29): publicação é sempre commit direto,
sem Pull Request.** O agente nunca pergunta isso em runtime, inclusive nas execuções
automáticas do schedule.

```bash
git add blog/<slug>/ blog/articles.json sitemap.xml
git commit -m "blog: <título do artigo>"
git pull --rebase
git push
```

Ao terminar, resuma: tema e por quê foi escolhido, palavra-chave primária, slug/URL
(`blog/<slug>/index.html`), contagem de palavras e o hash do commit.
