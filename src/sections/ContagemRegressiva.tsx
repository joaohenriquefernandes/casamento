import { DATA_DO_CASAMENTO, DATA_POR_EXTENSO, HORARIO_POR_EXTENSO } from '../dados/casamento'
import { useContagemRegressiva } from '../hooks/useContagemRegressiva'

function doisDigitos(valor: number) {
  return String(valor).padStart(2, '0')
}

function pluralizar(valor: number, singular: string, plural: string) {
  return `${valor} ${valor === 1 ? singular : plural}`
}

export function ContagemRegressiva() {
  const { dias, horas, minutos, segundos, encerrada } = useContagemRegressiva(DATA_DO_CASAMENTO)

  const unidades = [
    { rotulo: 'Dias', valor: dias },
    { rotulo: 'Horas', valor: horas },
    { rotulo: 'Minutos', valor: minutos },
    { rotulo: 'Segundos', valor: segundos },
  ]

  // Um resumo estático para leitores de tela: os números visuais mudam a cada
  // segundo e seriam ruído se fossem anunciados um a um.
  const partes = [
    pluralizar(dias, 'dia', 'dias'),
    pluralizar(horas, 'hora', 'horas'),
    pluralizar(minutos, 'minuto', 'minutos'),
    pluralizar(segundos, 'segundo', 'segundos'),
  ]
  const resumoAcessivel = `${partes.slice(0, -1).join(', ')} e ${partes.at(-1)}`

  return (
    <section
      id="contagem"
      aria-labelledby="rotulo-contagem titulo-contagem"
      className="relative isolate overflow-hidden bg-fundo px-6 py-20 sm:py-28"
    >
      {/* Brilho fúcsia baixo, só para a seção não encostar seca no fundo. */}
      <div
        aria-hidden="true"
        className="brilho-secao pointer-events-none absolute inset-x-0 top-0 -z-10 h-72"
      />

      <div className="mx-auto flex w-full max-w-3xl flex-col items-center text-center">
        <p
          id="rotulo-contagem"
          className="flex items-center gap-4 text-[0.68rem] font-light tracking-[0.3em] text-texto-suave uppercase"
        >
          <span
            aria-hidden="true"
            className="h-px w-8 bg-linear-to-r from-transparent to-ornamento sm:w-14"
          />
          Contagem regressiva
          <span
            aria-hidden="true"
            className="h-px w-8 bg-linear-to-l from-transparent to-ornamento sm:w-14"
          />
        </p>

        <h2 id="titulo-contagem" className="mt-5 text-3xl font-light sm:text-4xl">
          <time dateTime={DATA_DO_CASAMENTO} className="foil-fucsia bg-clip-text text-transparent">
            {DATA_POR_EXTENSO}
          </time>
        </h2>

        <p className="mt-2 text-sm font-light tracking-[0.08em] text-texto-suave">
          {HORARIO_POR_EXTENSO}
        </p>

        {encerrada ? (
          <p role="status" className="mt-12 text-2xl font-light sm:mt-16 sm:text-3xl">
            <span className="foil-fucsia bg-clip-text text-transparent">
              Chegou o nosso grande dia!
            </span>{' '}
            <span aria-hidden="true">💍</span>
          </p>
        ) : (
          <>
            <p className="sr-only">Faltam {resumoAcessivel} para o casamento.</p>

            <ol
              aria-hidden="true"
              className="mt-10 grid w-full grid-cols-2 gap-3 sm:mt-14 sm:grid-cols-4 sm:gap-4"
            >
              {unidades.map(({ rotulo, valor }) => (
                <li
                  key={rotulo}
                  className="flex flex-col items-center gap-2 rounded-2xl border border-borda bg-cartao px-2 py-6 sm:gap-3 sm:py-8"
                >
                  <span className="foil-fucsia bg-clip-text text-5xl font-light text-transparent tabular-nums sm:text-6xl">
                    {doisDigitos(valor)}
                  </span>
                  <span className="text-[0.62rem] tracking-[0.28em] text-texto-suave uppercase sm:text-[0.7rem]">
                    {rotulo}
                  </span>
                </li>
              ))}
            </ol>
          </>
        )}
      </div>
    </section>
  )
}
