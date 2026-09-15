import fotoDoCasal from '../assets/banner.png'
import monograma from '../assets/logo-banner.svg'

// TODO: confirmar data e cidade com os noivos antes de publicar.
const DATA_DO_CASAMENTO = '28 de novembro de 2026'

export function Banner() {
  return (
    <section
      id="inicio"
      aria-labelledby="titulo-banner"
      className="relative isolate flex min-h-dvh flex-col justify-end overflow-hidden bg-noite"
    >
      <img
        src={fotoDoCasal}
        alt="Luana e João Henrique com as testas encostadas, rindo, sob luzes quentes"
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 -z-20 size-full object-cover object-[57%_50%] motion-safe:animate-aproxima md:object-[50%_46%]"
      />

      {/* Dois véus só na parte de baixo: levantam o monograma sem apagar a foto. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-linear-to-t from-breu from-0% via-noite/72 via-26% to-transparent to-70%"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(120%_66%_at_50%_100%,#0d0a09f2_0%,#14100ea6_44%,transparent_78%)]"
      />

      <div className="relative mx-auto flex w-full max-w-5xl flex-col items-center px-6 pb-12 text-center sm:pb-16">
        <h1 id="titulo-banner" className="w-full motion-safe:animate-surge">
          <img
            src={monograma}
            alt="Luana e João Henrique"
            className="mx-auto w-full max-w-[min(80vw,42rem)] drop-shadow-[0_2px_20px_rgba(13,10,9,0.85)]"
          />
        </h1>

        <p className="mt-6 text-sm font-light tracking-[0.08em] text-marfim/85 motion-safe:animate-surge motion-safe:[animation-delay:350ms] sm:text-base">
          {DATA_DO_CASAMENTO}
        </p>

        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mt-10 size-6 text-marfim/70 motion-safe:animate-respira sm:mt-12"
        >
          <path d="m5 9 7 7 7-7" />
        </svg>
      </div>
    </section>
  )
}
