import { CartaoDeEvento } from '../components/CartaoDeEvento/CartaoDeEvento'
import { IconeCoracao } from '../components/IconeCoracao/IconeCoracao'
import { CERIMONIA, RECEPCAO } from '../dados/eventos'

/**
 * Separador entre os dois momentos: uma linha com o coração no meio.
 * Deitada entre os blocos empilhados do celular, em pé entre as colunas do
 * desktop — o mesmo elemento, sem duplicar marcação.
 */
function Divisor() {
  return (
    <div
      aria-hidden="true"
      className="flex items-center justify-center gap-4 md:flex-col md:gap-5 md:px-6 lg:px-10"
    >
      <span className="h-px flex-1 bg-linear-to-r from-transparent to-ornamento md:h-auto md:w-px md:bg-linear-to-b" />
      <IconeCoracao className="size-4 shrink-0 text-destaque/70" />
      <span className="h-px flex-1 bg-linear-to-l from-transparent to-ornamento md:h-auto md:w-px md:bg-linear-to-t" />
    </div>
  )
}

export function OGrandeDia() {
  return (
    <section
      id="o-grande-dia"
      aria-labelledby="titulo-o-grande-dia"
      className="relative isolate overflow-hidden bg-fundo-suave px-6 py-20 sm:py-28"
    >
      <div
        aria-hidden="true"
        className="brilho-secao pointer-events-none absolute inset-x-0 top-0 -z-10 h-72"
      />

      <div className="mx-auto w-full max-w-5xl">
        <div className="flex flex-col items-center text-center">
          <p className="flex items-center gap-4 text-[0.68rem] font-light tracking-[0.3em] text-texto-suave uppercase">
            <span
              aria-hidden="true"
              className="h-px w-8 bg-linear-to-r from-transparent to-ornamento sm:w-14"
            />
            Cerimônia e recepção
            <span
              aria-hidden="true"
              className="h-px w-8 bg-linear-to-l from-transparent to-ornamento sm:w-14"
            />
          </p>

          <h2 id="titulo-o-grande-dia" className="mt-5 text-4xl font-light sm:text-5xl md:text-6xl">
            <span className="foil-fucsia bg-clip-text text-transparent">O Grande Dia</span>
          </h2>

          <IconeCoracao className="mt-6 size-5 text-destaque/70" />
        </div>

        <div className="mt-14 grid gap-y-10 md:mt-20 md:grid-cols-[1fr_auto_1fr] md:gap-y-0">
          <CartaoDeEvento evento={CERIMONIA} />
          <Divisor />
          <CartaoDeEvento evento={RECEPCAO} />
        </div>
      </div>
    </section>
  )
}
