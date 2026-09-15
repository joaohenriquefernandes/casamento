import foto1 from '../assets/foto1.jpeg'
import foto2 from '../assets/foto2.jpeg'

/**
 * Um capítulo da história do casal. Os dados ficam aqui pelo mesmo motivo de
 * `eventos.ts`: a seção apenas compõe, o conteúdo mora num lugar só.
 */
export type Capitulo = {
  id: 'inicio' | 'distancia'
  /** Rótulo miúdo acima do título: `Capítulo I`. */
  ordem: string
  titulo: string
  /** Um parágrafo por item, na ordem em que aparecem. */
  paragrafos: readonly string[]
  foto: {
    /** URL resolvida pelo Vite a partir de `src/assets`. */
    src: string
    /** Descreve a cena para quem não vê a foto — não repete o título. */
    alt: string
    /** Dimensões naturais: reservam o espaço e evitam salto no carregamento. */
    largura: number
    altura: number
  }
}

export const COMO_TUDO_COMECOU: Capitulo = {
  id: 'inicio',
  ordem: 'Capítulo I',
  titulo: 'Como tudo começou',
  paragrafos: [
    'Nos conhecemos em 2014 e, em junho de 2015, começamos a namorar. Tudo aconteceu de forma muito rápida e inesperada, como se a vida já estivesse preparando nossos caminhos para se encontrarem.',
    'Em 2016, começou um novo capítulo da nossa história: o namoro à distância. Mais de 150 km passaram a nos separar, mas nunca foram suficientes para diminuir aquilo que estávamos construindo juntos.',
  ],
  foto: {
    src: foto1,
    alt: 'Luana e João Henrique bem juntos numa foto em preto e branco do começo do namoro, os dois sorrindo para a câmera',
    largura: 977,
    altura: 1600,
  },
}

export const A_DISTANCIA: Capitulo = {
  id: 'distancia',
  ordem: 'Capítulo II',
  titulo: 'Uma história construída à distância',
  paragrafos: [
    'Desde então, foram mais de 11 anos vivendo essa distância e escolhendo, todos os dias, continuar construindo a nossa história.',
    'Entre encontros, despedidas, planos e sonhos, crescemos juntos, aprendemos muito um com o outro e descobrimos que o amor sempre foi maior que qualquer distância.',
    'Agora, depois de tantos capítulos compartilhados, estamos prestes a começar um dos mais especiais de todos.',
  ],
  foto: {
    src: foto2,
    alt: 'Luana e João Henrique lado a lado numa festa, ela de vestido verde e ele de camisa escura, com o jardim ao fundo',
    largura: 1200,
    altura: 1600,
  },
}

export const CAPITULOS: readonly Capitulo[] = [COMO_TUDO_COMECOU, A_DISTANCIA]
