# casamento

Projeto React + TypeScript com Vite.

## Scripts

| Comando                | Descrição                      |
| ---------------------- | ------------------------------ |
| `npm run dev`          | Servidor de desenvolvimento    |
| `npm run build`        | Type-check + build de produção |
| `npm run preview`      | Preview do build de produção   |
| `npm run lint`         | ESLint                         |
| `npm run lint:fix`     | ESLint com correção automática |
| `npm run format`       | Prettier (escreve)             |
| `npm run format:check` | Prettier (apenas verifica)     |
| `npm run typecheck`    | `tsc --noEmit`                 |

## Padrão de commits

O projeto usa [Conventional Commits](https://www.conventionalcommits.org/), validado pelo
commitlint via hook `commit-msg` do Husky.

```
<tipo>(<escopo opcional>): <descrição>
```

Tipos aceitos: `build`, `chore`, `ci`, `docs`, `feat`, `fix`, `perf`, `refactor`, `revert`,
`style`, `test`.

Exemplos:

```
feat(rsvp): adiciona formulário de confirmação de presença
fix: corrige quebra do layout no mobile
```

No `pre-commit`, o lint-staged roda ESLint e Prettier apenas nos arquivos em stage.
