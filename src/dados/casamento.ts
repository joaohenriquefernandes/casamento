// TODO: confirmar data e cidade com os noivos antes de publicar.

/** Fuso da cerimônia — usado para formatar a data sempre no horário de lá. */
const FUSO_DO_CASAMENTO = 'America/Sao_Paulo'

/**
 * Instante do casamento, com o fuso explícito na string.
 *
 * Esta é a única fonte da data: os textos abaixo são derivados dela, então basta
 * mudar aqui. O offset torna o instante absoluto, o que mantém contagens e textos
 * corretos em qualquer fuso do dispositivo.
 */
export const DATA_DO_CASAMENTO = '2026-01-28T15:45:00-03:00'

const instante = new Date(DATA_DO_CASAMENTO)

/** `28 de novembro de 2026` */
export const DATA_POR_EXTENSO = new Intl.DateTimeFormat('pt-BR', {
  dateStyle: 'long',
  timeZone: FUSO_DO_CASAMENTO,
}).format(instante)

const [hora, minuto] = new Intl.DateTimeFormat('pt-BR', {
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
  timeZone: FUSO_DO_CASAMENTO,
})
  .format(instante)
  .split(':')

/** `15:45` — formato 24h, válido também como `datetime` de `<time>`. */
export const HORARIO_24H = `${hora}:${minuto}`

/** `às 16h` — ou `às 15h45`, se a cerimônia sair da hora cheia. */
export const HORARIO_POR_EXTENSO = minuto === '00' ? `às ${hora}h` : `às ${hora}h${minuto}`
