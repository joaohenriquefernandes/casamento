import { useEffect, useRef, useState } from 'react'
import type { RefObject } from 'react'

/** Só entra em cena depois que o bloco já apareceu um pouco na tela. */
const OPCOES: IntersectionObserverInit = {
  threshold: 0.12,
  rootMargin: '0px 0px -8% 0px',
}

type Revelacao<T extends Element> = {
  /** Vai no elemento observado — não precisa ser o que anima. */
  referencia: RefObject<T | null>
  /**
   * Classes do elemento que anima. Os dois estados são `motion-safe`: com
   * movimento reduzido nada some e nada se move, o conteúdo nasce visível.
   */
  classes: string
}

/**
 * Entrada suave quando o bloco chega à tela — o mesmo `surge` do banner, só que
 * disparado pelo scroll em vez do carregamento.
 *
 * Revela uma vez e para de observar: a seção não pisca ao subir e descer.
 */
export function useRevelaAoRolar<T extends Element>(): Revelacao<T> {
  const referencia = useRef<T>(null)
  const [revelado, definirRevelado] = useState(false)

  useEffect(() => {
    const elemento = referencia.current
    if (elemento === null) return

    const observador = new IntersectionObserver((entradas) => {
      if (!entradas.some((entrada) => entrada.isIntersecting)) return
      definirRevelado(true)
      observador.disconnect()
    }, OPCOES)

    observador.observe(elemento)

    return () => observador.disconnect()
  }, [])

  return {
    referencia,
    // `animate-surge` tem `fill-mode: both`, então já começa em opacidade 0 —
    // trocar as classes não gera piscada nem durante o `animation-delay`.
    classes: revelado ? 'motion-safe:animate-surge' : 'motion-safe:opacity-0',
  }
}
