---
name: humanizer
description: Guia dos sinais de texto com "cara de IA" a eliminar de qualquer artigo do blog, usado pela skill blog-post no Passo 4 (humanizar).
---

# Humanizer — Azuz Digital

Lista de sinais que entregam texto gerado por IA. Releia o rascunho procurando cada um
deles e reescreva antes de publicar. Complementa a lista "Proibido em qualquer artigo" do
`blog/DNA.md` (item 4), que tem prioridade em caso de conflito.

## Eliminar sempre

- **Travessão** (`—` ou `–`). Regra sem exceção neste projeto. Troque por vírgula, ponto,
  dois-pontos ou reestruture a frase em duas.
- **Paralelismo formulaico "não é X, é Y"** e variações ("não se trata de X, mas de Y").
- **Regra de três exagerada** ("rápido, eficiente e definitivo") quando os três adjetivos
  não agregam informação nova.
- **Aberturas genéricas:** "Em um cenário cada vez mais competitivo...", "No mundo digital
  de hoje...", "Nos dias de hoje...". Comece pelo problema concreto do leitor, não por um
  cenário abstrato.
- **Conclusões genéricas:** "Em suma...", "Portanto, fica claro que...", "Concluindo...".
  Termine com o CTA do artigo, não com um resumo óbvio do que acabou de ser dito.
- **Vocabulário inflado típico de IA:** "mergulhe", "desbloqueie", "eleve", "potencialize"
  (sem objeto concreto), "jornada" (quando não é literalmente uma jornada do cliente),
  "vale ressaltar", "é importante destacar", "sem sombra de dúvidas".
- **Perguntas retóricas vazias:** "Você sabia que...?", "Já parou para pensar...?". Se a
  pergunta não tiver uma resposta imediata e útil na frase seguinte, corte.
- **Voz passiva excessiva:** prefira sujeito ativo ("a Azuz aplica o diagnóstico antes de
  fechar contrato") a construções passivas ("o diagnóstico é aplicado pela Azuz antes de
  fechar contrato").
- **Estatísticas ou depoimentos inventados.** Nunca crie número, percentual ou frase de
  cliente que não esteja no `DNA.md` ou não possa ser verificado.
- **Emojis no corpo do artigo.** Não usar (ver `DNA.md`, regras tipográficas).

## Variar para soar humano

- Alterne frases curtas e longas. Um parágrafo inteiro de frases com o mesmo comprimento
  é o sinal mais fácil de detectar.
- Evite repetir a mesma palavra de transição ("além disso", "portanto") em todos os
  parágrafos. Varie ou corte a transição quando o parágrafo já flui sozinho.
- Prefira exemplos concretos e específicos da persona do `DNA.md` (médico, advogado,
  consultora, empresário) a generalizações vagas ("as empresas", "os profissionais").

## Como aplicar

No Passo 4 da skill `blog-post`, releia o `{{BODY_HTML}}` já escrito frase por frase contra
esta lista. Reescreva o que for pego, não apenas remova a palavra proibida mantendo a
estrutura da frase, isso costuma deixar o texto estranho. Reformule a frase inteira.
