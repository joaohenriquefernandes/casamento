type IconeCoracaoProps = {
  className?: string
}

/**
 * Coração de traço fino — o mesmo ornamento em todas as seções. Herda a cor de
 * quem o usa, então o tema é decidido pelo token aplicado no elemento pai.
 */
export function IconeCoracao({ className }: IconeCoracaoProps) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M12 20.3C12 20.3 4.3 15.4 4.3 10.4a4.2 4.2 0 0 1 7.7-2.3 4.2 4.2 0 0 1 7.7 2.3c0 5-7.7 9.9-7.7 9.9Z" />
    </svg>
  )
}
