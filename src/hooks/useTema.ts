import { useSyncExternalStore } from 'react'
import { assinar, definirTema, lerTema, lerTemaResolvido } from '../tema/tema'
import type { Tema, TemaResolvido } from '../tema/tema'

type EstadoDoTema = {
  /** A escolha da pessoa: `light`, `dark` ou `system`. */
  tema: Tema
  /** O tema efetivamente pintado, já com `system` resolvido. */
  temaResolvido: TemaResolvido
  definirTema: (tema: Tema) => void
}

/**
 * Liga o componente à preferência de tema.
 *
 * Os dois `useSyncExternalStore` devolvem strings, então a comparação por
 * `Object.is` já evita renders à toa — não precisa de seletor memoizado.
 */
export function useTema(): EstadoDoTema {
  const tema = useSyncExternalStore(assinar, lerTema)
  const temaResolvido = useSyncExternalStore(assinar, lerTemaResolvido)

  return { tema, temaResolvido, definirTema }
}
