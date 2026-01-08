import { Button } from '@chakra-ui/react'
import type { ButtonProps } from '@chakra-ui/react'

export default function SettingsButton(props: ButtonProps) {
  // Simple gear SVG used as the icon so we don't need an extra icons package.
  const gear = (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="currentColor"
      aria-hidden
    >
      <path d="M19.14 12.936a7.953 7.953 0 000-1.872l2.034-1.58a.5.5 0 00.12-.63l-1.924-3.33a.5.5 0 00-.6-.22l-2.396.96a8.06 8.06 0 00-1.62-.94l-.36-2.54A.5.5 0 0013.7 2h-3.4a.5.5 0 00-.495.426l-.36 2.54c-.56.22-1.08.5-1.58.84l-2.4-.96a.5.5 0 00-.6.22L2.7 8.85a.5.5 0 00.12.63l2.03 1.58a7.953 7.953 0 000 1.872L2.82 14.5a.5.5 0 00-.12.63l1.924 3.33c.12.2.37.3.6.22l2.396-.96c.5.34 1.02.62 1.58.84l.36 2.54A.5.5 0 0010.3 22h3.4a.5.5 0 00.495-.426l.36-2.54c.56-.22 1.08-.5 1.62-.94l2.396.96c.24.1.48 0 .6-.22l1.924-3.33a.5.5 0 00-.12-.63l-2.034-1.58zM12 15.5A3.5 3.5 0 1115.5 12 3.5 3.5 0 0112 15.5z" />
    </svg>
  )

  return (
    <Button aria-label="Settings" variant="ghost" size="sm" {...props}>
      {gear}
    </Button>
  )
}
