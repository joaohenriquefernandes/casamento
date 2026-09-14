# AGENTS.md

Instruções para agentes de IA que trabalham neste repositório. Vale para qualquer agente
(Claude Code, Codex, Cursor etc.). Instruções específicas do Claude Code estão em `CLAUDE.md`.

## Projeto

Site de casamento — SPA estática (React 19 + TypeScript + Vite 8). Idioma do produto,
dos commits e da documentação: **português (pt-BR)**.

Estado atual: projeto recém-inicializado. `src/` contém apenas `main.tsx`, `App.tsx` e
`index.css`. Não existe ainda roteador, biblioteca de estilo ou de animação instalada.

## Stack

| Camada    | Ferramenta                                               |
| --------- | -------------------------------------------------------- |
| UI        | React 19.2 (React Compiler-ready), JSX `react-jsx`       |
| Linguagem | TypeScript ~6.0, `verbatimModuleSyntax`, `noEmit`        |
| Build     | Vite 8 + `@vitejs/plugin-react`                          |
| Qualidade | ESLint 10 (flat config) + Prettier 3 + typescript-eslint |
| Hooks     | Husky + lint-staged + commitlint (Conventional Commits)  |

## Comandos

```bash
npm run dev          # servidor de desenvolvimento
npm run build        # tsc -b && vite build
npm run typecheck    # tsc --noEmit
npm run lint         # eslint .   (lint:fix para corrigir)
npm run format       # prettier --write .
```

Antes de considerar uma tarefa concluída: `npm run typecheck && npm run lint`.

## Skills disponíveis

As skills ficam em `.agents/skills/<nome>/SKILL.md` (versionadas em `skills-lock.json`).
Cada `SKILL.md` referencia arquivos em `references/` — leia o `SKILL.md` primeiro e só então
a referência que casa com a tarefa.

| Skill                     | Use para                                                       |
| ------------------------- | -------------------------------------------------------------- |
| `react`                   | componentes, hooks, estado, Effects, Actions, React Compiler   |
| `typescript-advanced`     | generics, tipos condicionais/mapeados, utilitários de tipo     |
| `tailwindcss`             | estilização com Tailwind v4 e tokens de tema                   |
| `frontend-design`         | direção visual, paleta, tipografia, identidade                 |
| `web-design-guidelines`   | revisão de UI: acessibilidade, UX, boas práticas web           |
| `motion` / `motion-react` | animações com Motion (gestos, scroll, layout, AnimatePresence) |
| `context7`                | documentação atualizada de qualquer lib/API externa            |

## Roteamento: tarefa → skills

Carregue as skills **antes** de escrever código, não depois.

- **Criar/editar componente React** → `react` + `typescript-advanced` + `tailwindcss`
- **Desenhar ou remodelar interface** → `web-design-guidelines` + `frontend-design` +
  `motion` + `motion-react`
- **Animação, transição, scroll, parallax** → `motion` + `motion-react` (+ `react`)
- **Tipos, contratos, utilitários de tipo** → `typescript-advanced`
- **Estilo, tokens, tema, responsividade** → `tailwindcss` (+ `frontend-design` se a
  decisão for estética, não só de implementação)
- **Revisar UI existente / acessibilidade** → `web-design-guidelines`
- **Usar lib nova ou API externa** → `context7` antes de escrever o código
- **Instalar/configurar Motion do zero** → `motion` (traz `scripts/init-motion.sh` e
  templates em `templates/`)

Combine skills quando a tarefa cruzar domínios — uma seção animada de RSVP usa
`react` + `tailwindcss` + `motion-react` + `web-design-guidelines`.

## Convenções de código

- Componentes em `src/components/<Componente>/`, um componente por arquivo, `PascalCase.tsx`.
- Seções da página em `src/sections/`; hooks em `src/hooks/` com prefixo `use`.
- Tipos co-localizados com o código que os usa; `type` para objetos, `interface` só quando
  precisar de declaration merging. Import de tipo sempre com `import type` (`verbatimModuleSyntax`).
- Sem `any`. Variáveis intencionalmente não usadas levam prefixo `_`.
- Não use `default export` em novos módulos, exceto `App.tsx` (já existente).
- Não crie `useEffect` para o que dá para derivar em render — veja `react/references/effects.md`.
- Sem `useMemo`/`useCallback` manuais em código novo: o alvo é React Compiler.
- Textos visíveis ao usuário em pt-BR, incluindo `aria-label` e mensagens de erro.
- Acessibilidade não é opcional: HTML semântico, foco visível, contraste, alvos ≥ 44px,
  `prefers-reduced-motion` respeitado em toda animação.

## Dependências ainda não instaladas

`tailwindcss` e `motion` têm skills configuradas mas **não estão no `package.json`**.
Ao precisar de uma delas, instale (`npm i -D tailwindcss @tailwindcss/vite` / `npm i motion`),
registre o plugin no `vite.config.ts` e só então siga a skill. Confirme com a pessoa
responsável antes de adicionar qualquer outra dependência.

## Git

- Conventional Commits em português, validados pelo commitlint:
  `feat(rsvp): adiciona formulário de confirmação de presença`.
- Tipos aceitos: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`,
  `revert`, `style`, `test`.
- `pre-commit` roda lint-staged (ESLint + Prettier nos arquivos em stage). Não use
  `--no-verify`.
- Não faça commit nem push sem o pedido explícito da pessoa. Nunca commite direto em `main`.

## Limites

- Não altere `eslint.config.js`, `.prettierrc.json`, `tsconfig*.json`, `commitlint.config.js`
  ou `.husky/` sem pedido explícito.
- Não edite `dist/`, `node_modules/`, `package-lock.json` (à mão) nem `.agents/skills/`
  (gerado por `skills-lock.json`).
