import { TituloDeSecao } from '../components/TituloDeSecao/TituloDeSecao'
import { formatarDataLimite, prazoEncerrado, WEDDING_CONFIG } from '../dados/rsvp'
import { useRevelaAoRolar } from '../hooks/useRevelaAoRolar'

const { rsvpDeadline, casalUrl } = WEDDING_CONFIG
const dataLimitePorExtenso = formatarDataLimite(rsvpDeadline)
const prazoCerrado = prazoEncerrado(rsvpDeadline)

const CLASSES_BOTAO_PRINCIPAL =
  'inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full ' +
  'bg-destaque px-8 text-[0.72rem] font-light tracking-[0.2em] text-sobre-destaque uppercase ' +
  'motion-safe:transition-colors hover:bg-destaque-forte focus-visible:outline-2 ' +
  'focus-visible:outline-offset-2 focus-visible:outline-destaque sm:w-auto sm:min-w-52'

const CLASSES_BOTAO_SECUNDARIO =
  'inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full ' +
  'border border-destaque/70 px-8 text-[0.72rem] font-light tracking-[0.2em] text-destaque uppercase ' +
  'motion-safe:transition-colors hover:border-destaque hover:bg-destaque hover:text-sobre-destaque ' +
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque sm:w-auto sm:min-w-52'

/**
 * Ícone SVG de envelope — confirmação de presença.
 */
function IconeEnvelope({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m2 7 10 7 10-7" />
    </svg>
  )
}

/**
 * Ícone SVG de presente — lista de presentes.
 */
function IconePresente({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect x="3" y="8" width="18" height="14" rx="1" />
      <path d="M12 8v14" />
      <path d="M3 12h18" />
      <path d="M8 8a4 4 0 0 1 4-4 4 4 0 0 1 4 4" />
      <path d="M12 4c0 0-1.5-2-3-2s-2 1-2 2" />
      <path d="M12 4c0 0 1.5-2 3-2s2 1 2 2" />
    </svg>
  )
}

/**
 * Seção de confirmação de presença e lista de presentes.
 *
 * Apresenta dois cards lado a lado no desktop e empilhados no mobile.
 * O card de RSVP se adapta automaticamente ao prazo configurado em
 * `src/dados/rsvp.ts` — não requer alteração aqui.
 */
export function ConfirmacaoEPresentes() {
  const { referencia, classes } = useRevelaAoRolar<HTMLDivElement>()

  return (
    <section
      id="confirmacao"
      aria-labelledby="titulo-confirmacao"
      className="relative isolate overflow-hidden bg-fundo px-6 py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="brilho-secao pointer-events-none absolute inset-x-0 top-0 -z-10 h-72"
      />

      <div className="mx-auto w-full max-w-5xl">
        <div ref={referencia} className={classes}>
          <TituloDeSecao id="titulo-confirmacao" rotulo="Celebre conosco" titulo="Convidados" />

          <p className="mx-auto mt-8 max-w-xl text-center text-sm font-light leading-relaxed text-texto-suave sm:text-base">
            Sua presença torna esse momento ainda mais especial
          </p>
        </div>

        {/* Grid de cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:mt-16 md:grid-cols-2 md:gap-8">
          {/* Card 1 — Confirmação de presença */}
          <article
            aria-label="Confirmação de presença"
            className="flex flex-col gap-6 rounded-2xl border border-borda bg-cartao px-8 py-10"
          >
            <div className="flex flex-col items-start gap-5">
              <span className="inline-flex size-12 items-center justify-center rounded-full border border-destaque/30 bg-destaque/10 text-destaque">
                <IconeEnvelope className="size-5" />
              </span>

              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-light tracking-wide text-texto sm:text-xl">
                  Confirme sua presença
                </h3>

                {prazoCerrado ? (
                  <p className="text-sm font-light leading-relaxed text-texto-suave">
                    O prazo para confirmação de presença foi encerrado.
                  </p>
                ) : (
                  <>
                    <p className="text-sm font-light leading-relaxed text-texto-suave">
                      Estamos preparando tudo com muito carinho para celebrar esse dia ao lado das
                      pessoas que amamos. Para nos ajudar na organização, confirme sua presença até
                      a data indicada abaixo.
                    </p>

                    <p className="text-sm font-light text-texto-suave">
                      Prazo:{' '}
                      <time dateTime={rsvpDeadline} className="font-normal text-destaque">
                        {dataLimitePorExtenso}
                      </time>
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="mt-auto flex flex-col items-start gap-4">
              <a
                href={casalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={CLASSES_BOTAO_PRINCIPAL}
              >
                {prazoCerrado ? 'Acessar página dos noivos' : 'Confirmar presença'}
              </a>

              {!prazoCerrado && (
                <p className="text-[0.72rem] font-light leading-relaxed text-texto-suave/70">
                  A confirmação de presença é feita diretamente pela nossa página no Casar.com.
                </p>
              )}
            </div>
          </article>

          {/* Card 2 — Lista de presentes */}
          <article
            aria-label="Lista de presentes"
            className="flex flex-col gap-6 rounded-2xl border border-borda bg-cartao px-8 py-10"
          >
            <div className="flex flex-col items-start gap-5">
              <span className="inline-flex size-12 items-center justify-center rounded-full border border-destaque/30 bg-destaque/10 text-destaque">
                <IconePresente className="size-5" />
              </span>

              <div className="flex flex-col gap-3">
                <h3 className="text-lg font-light tracking-wide text-texto sm:text-xl">
                  Lista de presentes
                </h3>

                <p className="text-sm font-light leading-relaxed text-texto-suave">
                  Se você deseja nos presentear, preparamos nossa lista com muito carinho no
                  Casar.com. Sua lembrança fará parte desse momento tão especial para nós.
                </p>
              </div>
            </div>

            <div className="mt-auto">
              <a
                href={casalUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={CLASSES_BOTAO_SECUNDARIO}
              >
                Acessar lista de presentes
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>
  )
}
