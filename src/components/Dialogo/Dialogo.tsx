import { useEffect, useId, useRef } from 'react'
import type { ReactNode } from 'react'

function IconeFechar() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      className="size-4 shrink-0"
    >
      <path d="m6.5 6.5 11 11M17.5 6.5l-11 11" />
    </svg>
  )
}

type DialogoProps = {
  aberto: boolean
  /** Chamado pelo Escape, pelo clique no véu e pelo botão de fechar. */
  aoFechar: () => void
  /** Vira o nome acessível do diálogo e o texto do cabeçalho. */
  titulo: string
  children: ReactNode
  /** Conteúdo fixo no rodapé, fora da área que rola. */
  rodape?: ReactNode
}

// O véu é pintado no próprio `<dialog>`, não em `::backdrop`: as variáveis de
// tema vivem em `:root` e o pseudo-elemento não enxerga todas elas em todos os
// navegadores. Sem `display` aqui fora do `open:` — quem esconde o diálogo
// fechado é o `display: none` nativo, e uma utility de display o anularia.
const CLASSES_DO_VEU = [
  'fixed inset-0 size-full max-h-none max-w-none open:grid place-items-center',
  'bg-sobreposicao p-4 backdrop-blur-sm backdrop:bg-transparent sm:p-6',
  'motion-safe:animate-aparece',
].join(' ')

const CLASSES_DO_CARTAO = [
  'flex max-h-full w-full max-w-2xl flex-col overflow-hidden rounded-3xl',
  'border border-borda bg-fundo text-left',
  'shadow-[0_28px_70px_-32px_rgba(13,10,9,0.75)]',
  'motion-safe:animate-abre-dialogo',
].join(' ')

const CLASSES_DO_BOTAO_FECHAR = [
  'flex size-11 shrink-0 items-center justify-center rounded-full text-texto-suave',
  'motion-safe:transition-colors hover:bg-texto/5 hover:text-texto',
].join(' ')

/**
 * Diálogo modal sobre o `<dialog>` nativo.
 *
 * O elemento nativo já entrega camada superior, trava de foco, `inert` no resto
 * da página e fechamento pelo Escape — não há motivo para reimplementar nada
 * disso em JavaScript.
 */
export function Dialogo({ aberto, aoFechar, titulo, children, rodape }: DialogoProps) {
  const dialogo = useRef<HTMLDialogElement>(null)
  const idDoTitulo = useId()

  // Abrir e fechar é sincronização com o DOM: `showModal()` é imperativo e não
  // dá para derivar em render.
  useEffect(() => {
    const elemento = dialogo.current
    if (!elemento) return

    if (aberto && !elemento.open) elemento.showModal()
    if (!aberto && elemento.open) elemento.close()
  }, [aberto])

  // O `<dialog>` nativo não trava a rolagem do fundo — no celular a página
  // continuaria correndo atrás do mapa.
  useEffect(() => {
    if (!aberto) return

    const { style } = document.body
    const rolagemAnterior = style.overflow
    style.overflow = 'hidden'

    return () => {
      style.overflow = rolagemAnterior
    }
  }, [aberto])

  return (
    <dialog
      ref={dialogo}
      aria-labelledby={idDoTitulo}
      onClose={aoFechar}
      onClick={(evento) => {
        // Só o clique no véu tem o próprio diálogo como alvo; o que cai no
        // cartão chega aqui com um descendente.
        if (evento.target === dialogo.current) aoFechar()
      }}
      className={CLASSES_DO_VEU}
    >
      {/* Montado só enquanto aberto: adia os dois `iframe` de mapa para o
          clique e reinicia a animação de entrada a cada abertura. */}
      {aberto && (
        <div className={CLASSES_DO_CARTAO}>
          <header className="flex items-center gap-3 border-b border-borda py-3 pr-3 pl-5 sm:pl-6">
            <h2 id={idDoTitulo} className="flex-1 text-lg font-light text-balance sm:text-xl">
              {titulo}
            </h2>

            <button
              type="button"
              onClick={aoFechar}
              aria-label="Fechar"
              className={CLASSES_DO_BOTAO_FECHAR}
            >
              <IconeFechar />
            </button>
          </header>

          <div className="overflow-y-auto overscroll-contain">{children}</div>

          {rodape ? (
            <footer className="border-t border-borda px-5 py-4 sm:px-6">{rodape}</footer>
          ) : null}
        </div>
      )}
    </dialog>
  )
}
