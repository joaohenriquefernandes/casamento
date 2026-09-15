import type { ReactElement } from 'react'
import { useTema } from '../../hooks/useTema'
import type { TemaResolvido } from '../../tema/tema'

/* Ícones desenhados aqui mesmo: o projeto não usa biblioteca de ícones e estes
   seguem o traço fino do chevron do banner. */

function IconeSol() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0"
    >
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.4v2M12 19.6v2M4.8 4.8l1.4 1.4M17.8 17.8l1.4 1.4M2.4 12h2M19.6 12h2M4.8 19.2l1.4-1.4M17.8 6.2l1.4-1.4" />
    </svg>
  )
}

function IconeLua() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0"
    >
      <path d="M20.8 13.4A8.6 8.6 0 1 1 10.6 3.2a6.8 6.8 0 0 0 10.2 10.2Z" />
    </svg>
  )
}

type OpcaoDeTema = {
  valor: TemaResolvido
  /** Só para leitores de tela: no visual fica apenas o ícone. */
  rotulo: string
  Icone: () => ReactElement
}

const OPCOES: readonly OpcaoDeTema[] = [
  { valor: 'light', rotulo: 'Tema claro', Icone: IconeSol },
  { valor: 'dark', rotulo: 'Tema escuro', Icone: IconeLua },
]

// Radios nativos dentro de um fieldset: as setas do teclado, o nome acessível e o
// estado marcado vêm de graça do navegador. O visual é só pintura por cima, via
// `peer-checked`.
const CLASSES_DO_SEGMENTO = [
  'flex size-9 items-center justify-center rounded-full text-texto-suave',
  'motion-safe:transition-colors',
  'hover:bg-texto/5 hover:text-texto',
  'peer-checked:bg-destaque peer-checked:text-sobre-destaque',
  'peer-checked:hover:bg-destaque-forte peer-checked:hover:text-sobre-destaque',
  'peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2',
  'peer-focus-visible:outline-destaque',
].join(' ')

export function SeletorDeTema() {
  // Marca pelo tema resolvido, não pela escolha: na primeira visita a preferência
  // é `system`, e o botão precisa mostrar qual dos dois está de fato na tela.
  const { temaResolvido, definirTema } = useTema()

  return (
    <fieldset
      className={[
        'fixed top-4 right-4 z-50 flex items-center gap-0.5 rounded-full p-1',
        'border border-borda bg-fundo/72 backdrop-blur-md',
        'shadow-[0_6px_20px_-14px_rgba(13,10,9,0.6)]',
        'sm:top-6 sm:right-6',
      ].join(' ')}
    >
      <legend className="sr-only">Tema do site</legend>

      {OPCOES.map(({ valor, rotulo, Icone }) => (
        <label key={valor} className="cursor-pointer">
          <input
            type="radio"
            name="tema"
            value={valor}
            checked={temaResolvido === valor}
            onChange={() => definirTema(valor)}
            className="peer sr-only"
          />
          <span className={CLASSES_DO_SEGMENTO}>
            <Icone />
            <span className="sr-only">{rotulo}</span>
          </span>
        </label>
      ))}
    </fieldset>
  )
}
