import fotoDoCasal from '../assets/banner.png'
import monograma from '../assets/logo-banner.svg'
import { DATA_POR_EXTENSO } from '../dados/casamento'

export function Banner() {
  return (
    <section
      id="inicio"
      aria-labelledby="titulo-banner"
      className="relative isolate flex min-h-dvh flex-col justify-end overflow-hidden bg-fundo-suave"
    >
      <img
        src={fotoDoCasal}
        alt="Luana e João Henrique com as testas encostadas, rindo, sob luzes quentes"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 size-full object-cover object-[57%_50%] motion-safe:animate-aproxima md:object-[50%_46%]"
      />

      {/* Dois véus só na parte de baixo: levantam o monograma sem apagar a foto.
          Ambos fundem no `--fundo` do tema, então a foto emenda na seção seguinte
          tanto no escuro quanto no claro. */}
      <div aria-hidden="true" className="veu-inferior absolute inset-0 -z-10" />
      <div aria-hidden="true" className="veu-radial absolute inset-0 -z-10" />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-12 text-center sm:pb-16">
        <h1 id="titulo-banner" className="w-full motion-safe:animate-surge">
          <img
            src={monograma}
            alt="Luana e João Henrique"
            className="mx-auto w-full max-w-[min(80vw,42rem)] drop-shadow-[0_2px_20px_var(--halo-monograma)]"
          />
        </h1>

        <p className="mt-6 text-sm font-light tracking-[0.08em] text-texto/85 motion-safe:animate-surge motion-safe:[animation-delay:350ms] sm:text-base">
          {DATA_POR_EXTENSO}
        </p>

        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-10 size-6 text-texto/60 motion-safe:animate-respira sm:mt-12"
        >
          <path d="m5 9 7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}
