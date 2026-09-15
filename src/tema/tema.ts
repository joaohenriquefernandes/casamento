/**
 * Fonte única do tema. Vive fora do React porque a preferência é global, mora no
 * `localStorage` e também pode mudar por fora da árvore (preferência do sistema,
 * outra aba). O React só assina isto — veja `hooks/useTema.ts`.
 */

/** O que a pessoa escolheu. `system` delega ao sistema operacional. */
export type Tema = 'light' | 'dark' | 'system'

/** O que de fato é pintado na tela, depois de resolver `system`. */
export type TemaResolvido = Exclude<Tema, 'system'>

/** Precisa bater com a chave lida pelo script anti-flash em `index.html`. */
const CHAVE = 'casamento:tema'
const CONSULTA_ESCURA = '(prefers-color-scheme: dark)'
const TEMA_PADRAO: Tema = 'system'

/** Cor da barra do navegador em cada tema — igual ao `--fundo` de `index.css`. */
const COR_DA_BARRA: Record<TemaResolvido, string> = {
  light: '#faf7f2',
  dark: '#0d0a09',
}

function ehTema(valor: unknown): valor is Tema {
  return valor === 'light' || valor === 'dark' || valor === 'system'
}

/** O acesso pode estourar em navegação privada ou com cookies bloqueados. */
function lerPreferenciaSalva(): Tema {
  try {
    const salvo = localStorage.getItem(CHAVE)
    return ehTema(salvo) ? salvo : TEMA_PADRAO
  } catch {
    return TEMA_PADRAO
  }
}

function resolver(tema: Tema): TemaResolvido {
  if (tema !== 'system') return tema
  return window.matchMedia(CONSULTA_ESCURA).matches ? 'dark' : 'light'
}

let temaEscolhido = lerPreferenciaSalva()
let temaResolvido = resolver(temaEscolhido)

const ouvintes = new Set<() => void>()

function pintar() {
  const raiz = document.documentElement
  raiz.classList.toggle('dark', temaResolvido === 'dark')
  raiz.style.colorScheme = temaResolvido
  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute('content', COR_DA_BARRA[temaResolvido])
}

/**
 * Recalcula o tema resolvido e avisa quem assina.
 *
 * Só toca no DOM quando o resultado muda, mas notifica sempre: trocar de `system`
 * para `light` num sistema já claro não muda um pixel e ainda assim precisa mover
 * a marcação do seletor.
 */
function sincronizar() {
  const proximo = resolver(temaEscolhido)

  if (proximo !== temaResolvido) {
    temaResolvido = proximo
    pintar()
  }

  for (const ouvinte of ouvintes) ouvinte()
}

/** Ouve o sistema e as outras abas enquanto houver alguém assinando. */
function observarAmbiente() {
  const consulta = window.matchMedia(CONSULTA_ESCURA)

  const aoMudarSistema = () => sincronizar()

  const aoMudarArmazenamento = (evento: StorageEvent) => {
    if (evento.key !== null && evento.key !== CHAVE) return
    temaEscolhido = lerPreferenciaSalva()
    sincronizar()
  }

  consulta.addEventListener('change', aoMudarSistema)
  window.addEventListener('storage', aoMudarArmazenamento)

  return () => {
    consulta.removeEventListener('change', aoMudarSistema)
    window.removeEventListener('storage', aoMudarArmazenamento)
  }
}

let pararDeObservar: (() => void) | null = null

export function assinar(ouvinte: () => void) {
  ouvintes.add(ouvinte)
  pararDeObservar ??= observarAmbiente()

  return () => {
    ouvintes.delete(ouvinte)

    if (ouvintes.size === 0) {
      pararDeObservar?.()
      pararDeObservar = null
    }
  }
}

export function lerTema(): Tema {
  return temaEscolhido
}

export function lerTemaResolvido(): TemaResolvido {
  return temaResolvido
}

export function definirTema(tema: Tema) {
  if (tema === temaEscolhido) return

  temaEscolhido = tema

  try {
    localStorage.setItem(CHAVE, tema)
  } catch {
    // Sem persistência a escolha vale só para esta visita — melhor que quebrar.
  }

  sincronizar()
}
