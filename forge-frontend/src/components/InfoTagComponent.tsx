import { Badge, CloseButton, Box } from '@chakra-ui/react'
import type { InfoTag } from '../states/InfoTag'

export function InfoTagComponent({
  tag,
  onRemove = null,
}: {
  tag: InfoTag
  // onRemove may be null or a function that takes no args and returns nothing
  onRemove?: (() => void) | null
}) {
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

      {/* Render close button only when onRemove is provided */}
      {onRemove ? (
        <CloseButton
          size="2xs"
          aria-label={`Remove ${tag.title}`}
          onClick={() => {
            try {
              onRemove()
            } catch (e) {
              // swallow errors so UI doesn't break
              // eslint-disable-next-line no-console
              console.error('Error in InfoTag onRemove:', e)
            }
          }}
        />
      ) : null}
    </Badge>
  )
}
