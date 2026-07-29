---
name: seo-geo
description: Checklist de otimização de SEO e GEO (citação por IAs como ChatGPT, Perplexity, Gemini) usado pela skill blog-post ao escrever ou revisar um artigo do blog.
---

# SEO/GEO — Azuz Digital

Esta skill não escreve artigos sozinha; é o checklist que `blog-post` (Passo 3 e Passo 6)
aplica sobre o conteúdo. Ela complementa, nunca substitui, as regras de SEO do
`blog/DNA.md` (item 6).

## Checklist de SEO clássico

- **Uma keyword primária por artigo.** Presente em: `<title>` (via `{{TITLE}}`), meta
  description (`{{META_DESCRIPTION}}`), primeiro parágrafo do corpo e em pelo menos um
  `<h2>`.
- **Título:** até ~65 caracteres, formato pergunta ou "como fazer", sem clickbait vazio.
- **Meta description:** 140-160 caracteres, resume o benefício real, contém a keyword.
- **Slug:** minúsculo, curto, com a keyword, sem stopwords desnecessárias
  (ex.: `marketing-digital-para-medicos`, não `o-melhor-marketing-digital-para-medicos-2026`).
- **Hierarquia de headings:** um único H1 (o `{{H1}}` do template), H2 para cada seção
  principal, H3 só quando uma seção precisa de subdivisão. Nunca pular nível (H1 → H3).
- **Links internos:** pelo menos 1 link para outro artigo já publicado do blog
  (`blog/articles.json` tem a lista) e, quando fizer sentido, para uma seção do site
  institucional (`../../index.html#servicos`, `#processo`, etc.) ou para o portfólio.
- **JSON-LD:** já vem embutido em `blog/_template.html` (tipo `Article`). Só garanta que
  `{{TITLE}}`, `{{META_DESCRIPTION}}`, `{{DATE_ISO}}` e `{{SLUG}}` foram substituídos
  também dentro do bloco `<script type="application/ld+json">`, não só no `<head>` visível.
- **Imagens:** se o artigo usar imagem, sempre com `alt` descritivo (nunca "imagem1.jpg")
  e `loading="lazy"`.

## Checklist de GEO (otimização para resposta de IA)

Assistentes de IA (ChatGPT, Perplexity, Gemini, Copilot, Claude, AI Overviews do Google)
tendem a citar o trecho que responde a pergunta de forma mais direta e autocontida, não
necessariamente o artigo inteiro. Para aumentar a chance de citação:

1. **Responda a pergunta central nos 2 primeiros parágrafos**, antes de contextualizar ou
   aprofundar. Não guarde a resposta direta para o final do artigo.
2. **Cada H2 deve abrir com uma definição ou resposta em 1-2 frases**, autocontida — ou
   seja, a seção precisa fazer sentido mesmo se for extraída isoladamente do resto do
   artigo (é assim que a IA cita).
3. **Prefira listas numeradas para qualquer processo com passos**, e listas com marcadores
   para qualquer enumeração. IAs extraem listas estruturadas com mais facilidade que texto
   corrido.
4. **Não deixe a intenção GEO do `DNA.md` sem resposta.** Antes de finalizar, confira: pelo
   menos uma das perguntas de "Intenção GEO" listadas no DNA é respondida de forma direta e
   citável em algum H2 do artigo.
5. **Evite ambiguidade de entidade:** sempre que citar "a Azuz", prefira "a Azuz Digital"
   pelo menos uma vez no artigo, para reforçar a associação marca↔conteúdo em modelos que
   não têm contexto da conversa.

## Uso

`blog-post` aplica este checklist duas vezes: ao escrever o rascunho (Passo 3) e ao validar
antes de publicar (Passo 6). Se um item não se aplicar ao tema do artigo (ex.: não há
imagem), pule sem forçar.
