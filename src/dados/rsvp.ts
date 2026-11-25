/**
 * Configuração central do RSVP e presentes.
 *
 * Altere aqui para propagar a data e o link em toda a seção — não é necessário
 * tocar em mais nenhum arquivo.
 */
export const WEDDING_CONFIG = {
  /** Data-limite para confirmação de presença — formato ISO `YYYY-MM-DD`. */
  rsvpDeadline: '2026-11-05',

  /** Página dos noivos no Casar.com — concentra confirmação e lista de presentes. */
  casalUrl: 'https://noivos.casar.com/luana-joaohenrique',

  /** Chave Pix (celular) para quem prefere presentear direto. */
  pix: {
    /** Valor copiado — formato internacional aceito por todos os bancos. */
    chave: '+5535997151223',
    /** Como a chave aparece na tela. */
    chaveFormatada: '(35) 99715-1223',
  },
} as const

/**
 * Retorna a data-limite formatada em português.
 * Ex.: `5 de novembro de 2026`
 */
export function formatarDataLimite(dataIso: string): string {
  // Parseia como data local (sem fuso) para não sofrer conversão de UTC.
  const [ano, mes, dia] = dataIso.split('-').map(Number)
  const data = new Date(ano, mes - 1, dia)

  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long' }).format(data)
}

/**
 * Indica se o prazo de confirmação já passou em relação à data atual.
 */
export function prazoEncerrado(dataIso: string): boolean {
  const [ano, mes, dia] = dataIso.split('-').map(Number)
  const limite = new Date(ano, mes - 1, dia)
  const hoje = new Date()

  // Compara apenas datas, sem hora.
  hoje.setHours(0, 0, 0, 0)

  return hoje > limite
}
