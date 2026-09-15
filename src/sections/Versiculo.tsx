import { IconeCoracao } from '../components/IconeCoracao/IconeCoracao'

const VERSICULO =
  'Assim, eles já não são dois, mas sim uma só carne. Portanto, o que Deus uniu, ninguém separe.'

const REFERENCIA = 'Mateus 19:6'

/**
 * Pausa entre as seções informativas: só o versículo, centralizado e com muito
 * respiro. O fundo volta para `--fundo` — a seção anterior é `--fundo-suave`,
 * então a troca de tom já separa as duas sem precisar de borda ou sombra.
 */
export function Versiculo() {
  return (
    <section
      id="versiculo"
      aria-label="Versículo de Mateus 19:6"
      className="relative isolate overflow-hidden bg-fundo px-6 py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="brilho-secao pointer-events-none absolute inset-x-0 top-0 -z-10 h-72"
      />

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        {/* Mesmo ornamento dos rótulos das outras seções, aqui sozinho: sem
            título, o coração é o que abre a pausa. */}
        <div aria-hidden="true" className="flex items-center justify-center gap-4">
          <span className="h-px w-10 bg-linear-to-r from-transparent to-ornamento sm:w-16" />
          <IconeCoracao className="size-5 shrink-0 text-destaque/70" />
          <span className="h-px w-10 bg-linear-to-l from-transparent to-ornamento sm:w-16" />
        </div>

        <blockquote className="mt-10 sm:mt-12">
          {/* Sem quebras manuais: o texto se acomoda sozinho e `text-balance`
              evita a última linha órfã. */}
          <p className="text-2xl leading-[1.5] font-light text-balance sm:text-3xl md:text-4xl">
            “{VERSICULO}”
          </p>

          <footer className="mt-8 sm:mt-10">
            <cite className="text-[0.68rem] font-light tracking-[0.3em] text-texto-suave uppercase not-italic">
              {REFERENCIA}
            </cite>
          </footer>
        </blockquote>
      </div>
    </section>
  )
}
