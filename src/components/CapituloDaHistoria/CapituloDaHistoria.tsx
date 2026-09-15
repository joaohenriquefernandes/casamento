import type { Capitulo } from '../../dados/historia'
import { useRevelaAoRolar } from '../../hooks/useRevelaAoRolar'

type CapituloDaHistoriaProps = {
  capitulo: Capitulo
  /** No desktop troca as colunas: texto à esquerda, foto à direita. */
  invertido?: boolean
}

/* A foto manda no bloco: largura maior que a coluna de texto e proporção
   original preservada (`h-auto`), para ninguém sair cortado. */
const CLASSES_DA_FOTO = [
  'w-full rounded-2xl border border-borda',
  'shadow-[0_24px_60px_-38px_var(--halo-monograma)]',
].join(' ')

/* Moldura deslocada, como o filete seco de um convite: fica fora da foto, então
   não precisa disputar camada com ela. */
const CLASSES_DA_MOLDURA = [
  'pointer-events-none absolute -inset-2.5 rounded-[1.25rem]',
  'border border-ornamento/70 sm:-inset-3.5 sm:rounded-[1.5rem]',
].join(' ')

/**
 * Um capítulo da história: foto de um lado, texto do outro no desktop;
 * empilhados no celular, sempre com a foto abrindo o bloco.
 */
export function CapituloDaHistoria({ capitulo, invertido = false }: CapituloDaHistoriaProps) {
  const { foto } = capitulo
  // Um observador por capítulo: os dois filhos entram juntos, com um respiro
  // entre a foto e o texto.
  const { referencia, classes } = useRevelaAoRolar<HTMLElement>()

  return (
    <article
      ref={referencia}
      aria-labelledby={`titulo-capitulo-${capitulo.id}`}
      className="grid items-center gap-10 sm:gap-12 md:grid-cols-2 md:gap-14 lg:gap-20"
    >
      <figure
        className={`relative mx-auto w-full max-w-sm lg:max-w-md ${invertido ? 'md:order-2' : ''} ${classes}`}
      >
        <div aria-hidden="true" className={CLASSES_DA_MOLDURA} />

        <img
          src={foto.src}
          alt={foto.alt}
          width={foto.largura}
          height={foto.altura}
          loading="lazy"
          decoding="async"
          className={CLASSES_DA_FOTO}
        />
      </figure>

      <div
        className={`mx-auto w-full max-w-sm md:max-w-none ${invertido ? 'md:order-1' : ''} ${classes} motion-safe:[animation-delay:180ms]`}
      >
        <p className="text-[0.68rem] font-light tracking-[0.3em] text-texto-suave uppercase">
          {capitulo.ordem}
        </p>

        <h3
          id={`titulo-capitulo-${capitulo.id}`}
          className="mt-4 text-2xl font-light text-balance sm:text-3xl lg:text-4xl"
        >
          <span className="foil-fucsia bg-clip-text text-transparent">{capitulo.titulo}</span>
        </h3>

        <span
          aria-hidden="true"
          className="mt-6 block h-px w-16 bg-linear-to-r from-ornamento to-transparent"
        />

        <div className="mt-6 flex flex-col gap-5 text-base leading-[1.8] font-light text-texto-suave sm:text-lg">
          {capitulo.paragrafos.map((paragrafo) => (
            <p key={paragrafo}>{paragrafo}</p>
          ))}
        </div>
      </div>
    </article>
  )
}
