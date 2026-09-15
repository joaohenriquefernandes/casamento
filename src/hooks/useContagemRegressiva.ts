import { useEffect, useState } from 'react'

export type ContagemRegressiva = {
  dias: number
  horas: number
  minutos: number
  segundos: number
  /** Verdadeiro quando a data alvo já passou — a contagem para de correr. */
  encerrada: boolean
}

const UM_SEGUNDO = 1000
const UM_MINUTO = 60 * UM_SEGUNDO
const UMA_HORA = 60 * UM_MINUTO
const UM_DIA = 24 * UMA_HORA

function calcular(alvoEmMs: number): ContagemRegressiva {
  // Nunca deixa o restante ficar negativo: zerado é o piso da contagem.
  const restante = Math.max(0, alvoEmMs - Date.now())

  return {
    dias: Math.floor(restante / UM_DIA),
    horas: Math.floor((restante % UM_DIA) / UMA_HORA),
    minutos: Math.floor((restante % UMA_HORA) / UM_MINUTO),
    segundos: Math.floor((restante % UM_MINUTO) / UM_SEGUNDO),
    encerrada: restante === 0,
  }
}

/**
 * Conta o tempo que falta até `dataAlvo`, atualizando a cada segundo.
 *
 * `dataAlvo` deve ser uma data ISO com fuso explícito (ex.: `2026-11-28T16:00:00-03:00`).
 * Com o fuso na string, o instante é absoluto e a contagem fica correta em qualquer
 * fuso do dispositivo — o cálculo é sempre feito em milissegundos desde a época.
 */
export function useContagemRegressiva(dataAlvo: string): ContagemRegressiva {
  const alvoEmMs = new Date(dataAlvo).getTime()
  const [contagem, setContagem] = useState(() => calcular(alvoEmMs))

  useEffect(() => {
    const atualizar = () => {
      const proxima = calcular(alvoEmMs)
      setContagem(proxima)
      return proxima
    }

    // Ressincroniza na montagem: o relógio pode ter andado desde o primeiro render.
    if (atualizar().encerrada) return

    const intervalo = setInterval(() => {
      if (atualizar().encerrada) clearInterval(intervalo)
    }, UM_SEGUNDO)

    return () => clearInterval(intervalo)
  }, [alvoEmMs])

  return contagem
}
