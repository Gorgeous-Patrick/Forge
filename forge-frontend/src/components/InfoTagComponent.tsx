import { Badge, CloseButton, Box } from '@chakra-ui/react'
import type { InfoTag } from '../states/InfoTag'

export function InfoTagComponent({ tag }: { tag: InfoTag }) {
  return (
    <Badge
      display="inline-flex"
      alignItems="center"
      px={2}
      py={1}
      borderRadius="md"
    >
      <Box as="span" mr={2} fontSize="sm">
        {tag.title}
      </Box>
      {/* Close button prints to console for now */}
      <CloseButton
        size="2xs"
        aria-label={`Remove ${tag.title}`}
        onClick={() => {
          // keep simple: print the tag title to the console
          console.log('InfoTag clicked:', tag.title)
        }}
      />
    </Badge>
  )
}
