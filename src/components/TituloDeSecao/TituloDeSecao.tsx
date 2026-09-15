import { IconeCoracao } from '../IconeCoracao/IconeCoracao'

type TituloDeSecaoProps = {
  /** Rótulo miúdo acima do título, entre dois filetes. */
  rotulo: string
  titulo: string
  /** Precisa casar com o `aria-labelledby` da seção. */
  id: string
}

/**
 * Abertura de seção no padrão que as demais já usam: rótulo em versalete entre
 * filetes, título em foil fúcsia e o coração fechando o bloco.
 *
 * Extraído aqui para que a próxima seção não copie a marcação de novo.
 */
export function TituloDeSecao({ rotulo, titulo, id }: TituloDeSecaoProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <p className="flex items-center gap-4 text-[0.68rem] font-light tracking-[0.3em] text-texto-suave uppercase">
        <span
          aria-hidden="true"
          className="h-px w-8 bg-linear-to-r from-transparent to-ornamento sm:w-14"
        />
        {rotulo}
        <span
          aria-hidden="true"
          className="h-px w-8 bg-linear-to-l from-transparent to-ornamento sm:w-14"
        />
      </p>

      <h2 id={id} className="mt-5 text-4xl font-light sm:text-5xl md:text-6xl">
        <span className="foil-fucsia bg-clip-text text-transparent">{titulo}</span>
      </h2>

      <IconeCoracao className="mt-6 size-5 text-destaque/70" />
    </div>
  )
}
