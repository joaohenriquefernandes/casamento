# CLAUDE.md

Instruções do Claude Code para este repositório.

> **Leia `AGENTS.md` primeiro.** Ele é a fonte da verdade sobre stack, comandos,
> convenções de código, git e limites. Este arquivo cobre só o que é específico do
> Claude Code: como acionar skills, quando usar subagentes e o fluxo de trabalho.

## Uso de skills

As skills do projeto estão em `.agents/skills/` e são acionadas pela ferramenta `Skill`
(ou por `/nome` digitado pela pessoa). Acione **antes** de escrever código — uma skill
carregada depois do fato não corrige o que já foi escrito errado.

```
Skill(skill: "react")
Skill(skill: "tailwindcss")
```

Carregue só o `SKILL.md` de início; abra `references/*.md` apenas quando a tarefa tocar
naquele assunto específico.

## Gatilhos automáticos

| Quando o pedido for…                                             | Acione                                                               |
| ---------------------------------------------------------------- | -------------------------------------------------------------------- |
| "cria um componente", "adiciona um card/botão/form"              | `react`, `typescript-advanced`, `tailwindcss`                        |
| "monta a página", "desenha a interface", "deixa bonito"          | `web-design-guidelines`, `frontend-design`, `motion`, `motion-react` |
| "anima", "transição", "efeito de scroll", "parallax"             | `motion`, `motion-react`                                             |
| "tipa isso", "cria um tipo genérico/utilitário"                  | `typescript-advanced`                                                |
| "estiliza", "responsivo", "tema", "cores"                        | `tailwindcss` (+ `frontend-design` para decisão estética)            |
| "revisa a UI", "isso é acessível?", "audita o design"            | `web-design-guidelines`                                              |
| qualquer lib/API externa (Motion, Tailwind, Vite, React Router…) | `context7` antes de codar                                            |

Combine skills quando a tarefa cruzar domínios. Seção animada de confirmação de presença:
`react` + `tailwindcss` + `motion-react` + `web-design-guidelines`.

## Fluxo de trabalho

1. **Entender** — leia os arquivos envolvidos antes de editar. Em tarefa ampla, use o
   subagente `Explore` para mapear o código em vez de abrir arquivo por arquivo.
2. **Planejar** — mudanças que tocam vários arquivos ou decisões de arquitetura: proponha
   o plano antes (plan mode / `Plan`) e só então implemente.
3. **Carregar skills** — conforme a tabela acima.
4. **Implementar** — siga as convenções de `AGENTS.md`. Edições cirúrgicas; não reescreva
   arquivos inteiros nem reformate código que não faz parte da tarefa.
5. **Verificar** — `npm run typecheck && npm run lint` antes de dizer que terminou.
   Se falhar, conserte; se não der para consertar, relate a falha com a saída real.
6. **Relatar** — diga o que mudou e o que ficou de fora. Sem "pronto!" se não estiver.

## Subagentes

- Use `Explore` para busca ampla (onde está X, quais arquivos fazem Y).
- Use `Plan` para desenhar a estratégia de uma implementação maior.
- Não abra subagente para tarefa que você resolve direto — cada um recomeça do zero e
  custa contexto.
- `/code-review` antes de abrir PR; `/security-review` quando a mudança tocar dados de
  convidados ou integrações externas.

## Regras rígidas

- Português (pt-BR) em código voltado ao usuário, commits, comentários e respostas.
- Nada de `git commit`, `git push` ou `npm install` sem pedido explícito.
- Não crie arquivos de documentação, changelog ou testes que ninguém pediu.
- Não adicione dependência nova sem confirmar antes — o bundle de um site de casamento
  precisa ficar leve.
- Toda animação respeita `prefers-reduced-motion`.
- Se algo do pedido ficar ambíguo, faça primeiro tudo o que não depende da resposta e
  pergunte no momento certo — não pare o trabalho inteiro por uma dúvida.

## Contexto do produto

Site de casamento: contagem regressiva, história do casal, local e horário, confirmação de
presença (RSVP), lista de presentes, informações para convidados. Público amplo e pouco
técnico, maioria em celular — **mobile-first**, carregamento rápido, texto legível,
navegação óbvia. Elegância acima de efeito: animação serve à leitura, não à demonstração.
