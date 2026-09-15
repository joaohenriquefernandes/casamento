import { useState } from 'react'
import type { ReactElement } from 'react'
import type { Evento } from '../../dados/eventos'
import { Dialogo } from '../Dialogo/Dialogo'

/* Ícones desenhados aqui mesmo, como em `SeletorDeTema`: o projeto não usa
   biblioteca de ícones e o traço fino combina com a tipografia serifada. */

function IconeIgreja() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-8 sm:size-9"
    >
      <path d="M12 2v3.6M10.4 3.6h3.2" />
      <path d="M4.6 20.8v-9.2L12 5.8l7.4 5.8v9.2" />
      <path d="M9.9 20.8v-4.1a2.1 2.1 0 0 1 4.2 0v4.1" />
      <path d="M3 20.8h18" />
    </svg>
  )
}

function IconeTacas() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-8 sm:size-9"
    >
      <g transform="rotate(8 8 16.8)">
        <path d="M5.6 4.2h4.8l-.85 4.4a1.6 1.6 0 0 1-3.1 0L5.6 4.2Z" />
        <path d="M8 10.4v6.4M6.1 16.8h3.8" />
      </g>
      <g transform="rotate(-8 16 16.8)">
        <path d="M13.6 4.2h4.8l-.85 4.4a1.6 1.6 0 0 1-3.1 0L13.6 4.2Z" />
        <path d="M16 10.4v6.4M14.1 16.8h3.8" />
      </g>
      <path d="M12 1.9v1.3M10.3 2.6l.6.9M13.7 2.6l-.6.9" />
    </svg>
  )
}

function IconeMapa() {
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
      <path d="M12 21s6.2-5.1 6.2-10.2a6.2 6.2 0 1 0-12.4 0C5.8 15.9 12 21 12 21Z" />
      <circle cx="12" cy="10.6" r="2.3" />
    </svg>
  )
}

function IconeLinkExterno() {
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
      <path d="M14 4.5h5.5V10M19.5 4.5 10.5 13.5" />
      <path d="M18 14.5v4a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6h4" />
    </svg>
  )
}

// Mapa estático: mantém as classes completas e o ícone escolhido pelos dados,
// sem montar nome de componente em tempo de execução.
const ICONES: Record<Evento['id'], () => ReactElement> = {
  cerimonia: IconeIgreja,
  recepcao: IconeTacas,
}

const CLASSES_DO_BOTAO = [
  'inline-flex min-h-11 items-center justify-center gap-2 rounded-full px-7',
  'border border-destaque/70 text-[0.7rem] font-light tracking-[0.22em] text-destaque uppercase',
  'motion-safe:transition-colors',
  'hover:border-destaque hover:bg-destaque hover:text-sobre-destaque',
].join(' ')

const CLASSES_DO_LINK = [
  'inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-full px-6',
  'border border-borda text-[0.7rem] font-light tracking-[0.22em] text-texto-suave uppercase',
  'motion-safe:transition-colors',
  'hover:border-destaque/45 hover:text-destaque',
].join(' ')

type CartaoDeEventoProps = {
  evento: Evento
}

/**
 * Um dos dois momentos do dia: rótulo, ícone, horário, endereço e o mapa —
 * que abre em diálogo, sem tirar a pessoa do site.
 */
export function CartaoDeEvento({ evento }: CartaoDeEventoProps) {
  const [mapaAberto, definirMapaAberto] = useState(false)
  const Icone = ICONES[evento.id]

  return (
    <article className="flex h-full flex-col items-center px-2 text-center">
      <h3 className="text-[0.68rem] font-light tracking-[0.3em] text-texto-suave uppercase">
        {evento.tipo}
      </h3>

      <span className="mt-6 text-destaque">
        <Icone />
      </span>

      <p className="mt-5 text-5xl font-light sm:text-6xl">
        <time
          dateTime={evento.horario}
          className="foil-fucsia bg-clip-text text-transparent tabular-nums"
        >
          {evento.horario}
        </time>
      </p>

      <p className="mt-6 max-w-xs text-xl font-light text-balance sm:text-2xl">{evento.local}</p>

      {evento.descricao ? (
        <p className="mt-2 max-w-xs text-sm font-light text-balance text-texto-suave">
          {evento.descricao}
        </p>
      ) : null}

      <p className="mt-2 text-xs font-light tracking-[0.12em] text-texto-suave">{evento.cidade}</p>

      {/* `mt-auto` alinha os dois botões na mesma linha mesmo com o bloco de
          texto de cada lado tendo alturas diferentes. */}
      <div className="mt-auto pt-8">
        <button
          type="button"
          onClick={() => definirMapaAberto(true)}
          aria-label={`Como chegar: ${evento.local}`}
          className={CLASSES_DO_BOTAO}
        >
          <IconeMapa />
          Como chegar
        </button>
      </div>

      <Dialogo
        aberto={mapaAberto}
        aoFechar={() => definirMapaAberto(false)}
        titulo={evento.local}
        rodape={
          <a
            href={evento.mapa.externo}
            target="_blank"
            rel="noreferrer"
            className={CLASSES_DO_LINK}
          >
            <IconeLinkExterno />
            Abrir no Google Maps
          </a>
        }
      >
        <div className="aspect-4/3 w-full bg-fundo-suave sm:aspect-16/10">
          <iframe
            title={evento.mapa.titulo}
            src={evento.mapa.incorporado}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
            className="size-full border-0"
          />
        </div>

        <div className="px-5 py-4 text-sm font-light sm:px-6">
          {evento.descricao ? <p className="text-texto">{evento.descricao}</p> : null}
          <p className="text-texto-suave">{evento.cidade}</p>
        </div>
      </Dialogo>
    </article>
  )
}
