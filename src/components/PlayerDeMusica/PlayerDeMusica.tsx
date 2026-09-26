import { useEffect, useRef, useState } from 'react'

/* --------------------------------------------------------------------------
   Tipos mínimos da YouTube IFrame API — não há @types/youtube instalado.
   Cobre apenas o que este componente usa.
   -------------------------------------------------------------------------- */
interface YTPlayer {
  playVideo(): void
  mute(): void
  unMute(): void
  setVolume(volume: number): void
  destroy(): void
}

interface YTPlayerOptions {
  videoId: string
  playerVars?: Record<string, number | string>
  events?: {
    onReady?: (e: { target: YTPlayer }) => void
    onStateChange?: (e: { data: number; target: YTPlayer }) => void
    onError?: () => void
  }
}

interface YTNamespace {
  Player: new (el: HTMLElement, opts: YTPlayerOptions) => YTPlayer
}

declare global {
  interface Window {
    YT?: YTNamespace
    onYouTubeIframeAPIReady?: () => void
  }
}

/* -------------------------------------------------------------------------- */

const VIDEO_ID = 'xUT3ZcbVWmQ'
const CHAVE_STORAGE = 'casamento:musica-mutada'

function carregarApiYouTube() {
  if (document.getElementById('yt-api-script')) return
  const script = document.createElement('script')
  script.id = 'yt-api-script'
  script.src = 'https://www.youtube.com/iframe_api'
  document.head.appendChild(script)
}

/* --------------------------------------------------------------------------
   Ícones desenhados aqui mesmo, seguindo o traço fino dos demais ícones
   do projeto (strokeWidth 1.2, sem biblioteca externa).
   -------------------------------------------------------------------------- */

function IconeSom() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
      <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
    </svg>
  )
}

function IconeMudo() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="size-4 shrink-0"
    >
      <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
      <line x1="23" y1="9" x2="17" y2="15" />
      <line x1="17" y1="9" x2="23" y2="15" />
    </svg>
  )
}

/* -------------------------------------------------------------------------- */

export function PlayerDeMusica() {
  const playerRef = useRef<YTPlayer | null>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const [mutado, setMutado] = useState<boolean>(() => {
    try {
      return localStorage.getItem(CHAVE_STORAGE) === 'true'
    } catch {
      return false
    }
  })
  const [pronto, setPronto] = useState(false)

  useEffect(() => {
    // Lê a preferência salva diretamente: evita dependência no closure
    // e não precisa de ref espelhado.
    const mutadoInicial = localStorage.getItem(CHAVE_STORAGE) === 'true'

    carregarApiYouTube()

    function iniciarPlayer() {
      const container = containerRef.current
      if (!container) return

      const div = document.createElement('div')
      container.appendChild(div)

      playerRef.current = new window.YT!.Player(div, {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1,
          loop: 1,
          playlist: VIDEO_ID,
          controls: 0,
          disablekb: 1,
          fs: 0,
          iv_load_policy: 3,
          modestbranding: 1,
          rel: 0,
          origin: window.location.origin,
        },
        events: {
          onReady(e) {
            e.target.setVolume(60)
            if (mutadoInicial) e.target.mute()
            setPronto(true)
            e.target.playVideo()
          },
          onStateChange(e) {
            // YT.PlayerState.ENDED === 0 — reinicia o loop manualmente
            if (e.data === 0) e.target.playVideo()
          },
          onError() {
            // Player invisível: engole o erro silenciosamente
          },
        },
      })
    }

    if (window.YT?.Player) {
      iniciarPlayer()
    } else {
      const callbackAnterior = window.onYouTubeIframeAPIReady
      window.onYouTubeIframeAPIReady = () => {
        callbackAnterior?.()
        iniciarPlayer()
      }
    }

    // Fallback: navegadores que bloqueiam autoplay iniciam na primeira interação
    function aoInteragir() {
      playerRef.current?.playVideo()
      document.removeEventListener('click', aoInteragir)
      document.removeEventListener('keydown', aoInteragir)
      document.removeEventListener('touchstart', aoInteragir)
    }
    document.addEventListener('click', aoInteragir)
    document.addEventListener('keydown', aoInteragir)
    document.addEventListener('touchstart', aoInteragir, { passive: true })

    return () => {
      document.removeEventListener('click', aoInteragir)
      document.removeEventListener('keydown', aoInteragir)
      document.removeEventListener('touchstart', aoInteragir)
      playerRef.current?.destroy()
      playerRef.current = null
    }
  }, [])

  function alternarMudo() {
    const novoMutado = !mutado
    setMutado(novoMutado)
    try {
      localStorage.setItem(CHAVE_STORAGE, String(novoMutado))
    } catch {
      // noop: localStorage indisponível (modo privado / iOS restrito)
    }
    if (playerRef.current) {
      if (novoMutado) {
        playerRef.current.mute()
      } else {
        playerRef.current.unMute()
        playerRef.current.playVideo()
      }
    }
  }

  return (
    <>
      {/* Container invisível do iframe do YouTube — fora do fluxo visual */}
      <div
        ref={containerRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 -z-50 size-0 overflow-hidden opacity-0"
      />

      {/* Botão flutuante de controle — visualmente alinhado ao SeletorDeTema */}
      <button
        type="button"
        onClick={alternarMudo}
        aria-label={mutado ? 'Ativar música de fundo' : 'Mutar música de fundo'}
        aria-pressed={!mutado}
        title={mutado ? 'Ativar música' : 'Mutar música'}
        className={[
          // Posicionamento: abaixo do SeletorDeTema (top-4 + ~46px + 4px gap)
          'fixed top-[3.5rem] right-4 z-50',
          'sm:top-[4.5rem] sm:right-6',
          // Visual: replica o cartão glassmorphism do SeletorDeTema
          'flex size-9 items-center justify-center rounded-full',
          'border border-borda bg-fundo/72 backdrop-blur-md',
          'shadow-[0_6px_20px_-14px_rgba(13,10,9,0.6)]',
          // Estado: ativo = destaque, mudo = texto-suave
          mutado ? 'text-texto-suave' : 'text-destaque',
          // Interatividade
          'motion-safe:transition-colors',
          'hover:bg-texto/5',
          mutado ? 'hover:text-texto' : 'hover:text-destaque-forte',
          'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-destaque',
          // Sinaliza carregamento
          !pronto ? 'opacity-60' : 'opacity-100',
          'motion-safe:transition-opacity',
        ]
          .filter(Boolean)
          .join(' ')}
      >
        {mutado ? <IconeMudo /> : <IconeSom />}
      </button>
    </>
  )
}
