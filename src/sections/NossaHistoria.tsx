import { CapituloDaHistoria } from '../components/CapituloDaHistoria/CapituloDaHistoria'
import { TituloDeSecao } from '../components/TituloDeSecao/TituloDeSecao'
import { A_DISTANCIA, COMO_TUDO_COMECOU } from '../dados/historia'
import { useRevelaAoRolar } from '../hooks/useRevelaAoRolar'

/**
 * A história do casal em dois capítulos alternados — foto à esquerda no
 * primeiro, à direita no segundo — para a leitura não virar uma coluna só.
 *
 * Fundo `--fundo-suave` (o blush do BRAND-GUIDELINES, reservado à história do
 * casal) alternando com o `--fundo` da seção anterior: a troca de tom já separa
 * as duas sem precisar de borda.
 */
export function NossaHistoria() {
  const { referencia, classes } = useRevelaAoRolar<HTMLDivElement>()

  return (
    <section
      id="nossa-historia"
      aria-labelledby="titulo-nossa-historia"
      className="relative isolate overflow-hidden bg-fundo-suave px-6 py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="brilho-secao pointer-events-none absolute inset-x-0 top-0 -z-10 h-72"
      />

      <div className="mx-auto w-full max-w-5xl">
        <div ref={referencia} className={classes}>
          <TituloDeSecao
            id="titulo-nossa-historia"
            rotulo="De 2014 até aqui"
            titulo="Nossa História"
          />
        </div>

        <div className="mt-16 flex flex-col gap-20 sm:gap-24 md:mt-24 md:gap-28">
          <CapituloDaHistoria capitulo={COMO_TUDO_COMECOU} />
          <CapituloDaHistoria capitulo={A_DISTANCIA} invertido />
        </div>
      </div>
    </section>
  )
}
