import { HORARIO_24H } from './casamento'

/**
 * Um dos dois momentos do dia. Os dados ficam aqui para que a seção e o diálogo
 * do mapa leiam a mesma fonte — o cartão é o mesmo componente nos dois casos.
 */
export type Evento = {
  /** Escolhe o ícone do cartão; o texto visível vem de `tipo`. */
  id: 'cerimonia' | 'recepcao'
  /** Rótulo acima do horário: `Cerimônia`, `Recepção`. */
  tipo: string
  /** `HH:MM` — vale como atributo `datetime` de `<time>`. */
  horario: string
  local: string
  /** Linha extra abaixo do local, quando houver. */
  descricao?: string
  cidade: string
  mapa: {
    /**
     * URL pronta para `iframe`. O formato `?q=…&output=embed` é o embed sem
     * chave de API do Google Maps: a busca resolve para o lugar certo e o
     * marcador sai com o nome. Nada de link curto aqui — `maps.app.goo.gl`
     * responde com a página cheia, que recusa ser embutida.
     */
    incorporado: string
    /** Abre o lugar no app ou no site do Google Maps. */
    externo: string
    /** Descreve o mapa para quem usa leitor de tela. */
    titulo: string
  }
}

export const CERIMONIA: Evento = {
  id: 'cerimonia',
  tipo: 'Cerimônia',
  horario: HORARIO_24H,
  local: 'Igreja Matriz de Itaú de Minas',
  descricao: 'Paróquia Santa Terezinha do Menino Jesus',
  cidade: 'Itaú de Minas - MG',
  mapa: {
    incorporado:
      'https://www.google.com/maps?q=Par%C3%B3quia%20Santa%20Terezinha%20do%20Menino%20Jesus%2C%20Ita%C3%BA%20de%20Minas%20-%20MG&z=17&hl=pt-BR&output=embed',
    externo: 'https://maps.app.goo.gl/7mYZJbuTnCM2UNSY7',
    titulo: 'Mapa da Igreja Matriz de Itaú de Minas',
  },
}

export const RECEPCAO: Evento = {
  id: 'recepcao',
  tipo: 'Recepção',
  horario: '17:30',
  local: 'Arena Deck',
  cidade: 'Itaú de Minas - MG',
  mapa: {
    // Embed enviado pelos noivos: é uma vista de rua da entrada do Arena Deck.
    incorporado:
      'https://www.google.com/maps/embed?pb=!4v1789481287954!6m8!1m7!1sig2GTgm0mimbV6gSujpr_A!2m2!1d-20.74159572385405!2d-46.75577206335846!3f132.05263772160978!4f3.4573212166242797!5f0.7820865974627469',
    externo:
      'https://www.google.com/maps/search/?api=1&query=Arena%20Deck%2C%20Ita%C3%BA%20de%20Minas%20-%20MG',
    titulo: 'Vista da entrada do Arena Deck',
  },
}

export const EVENTOS: readonly Evento[] = [CERIMONIA, RECEPCAO]
