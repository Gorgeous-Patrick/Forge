import { Badge, CloseButton, Box } from "@chakra-ui/react";
import type { InfoTag } from "../states/InfoTag";

export function InfoTagComponent({
  tag,
  onRemove = null,
  onClick = null,
}: {
  tag: InfoTag;
  // onRemove/onClick may be null or a function that takes no args and returns nothing
  onRemove?: (() => void) | null;
  onClick?: (() => void) | null;
}) {
  const badgeOnClick = onClick
    ? () => {
        try {
          onClick();
        } catch (e) {
          // eslint-disable-next-line no-console
          console.error("Error in InfoTag onClick:", e);
        }
      }
    : undefined;

  return (
    <Badge
      display="inline-flex"
      alignItems="center"
      px={2}
      py={1}
      borderRadius="md"
      cursor={onClick ? "pointer" : undefined}
      onClick={badgeOnClick}
    >
      <Box as="span" mr={2} fontSize="sm">
        {tag.title}
      </Box>

      {/* Render close button only when onRemove is provided */}
      {onRemove ? (
        <CloseButton
          size="2xs"
          aria-label={`Remove ${tag.title}`}
          onClick={(e) => {
            // prevent the badge's onClick from firing when the close button is clicked
            e.stopPropagation();
            try {
              onRemove();
            } catch (err) {
              // eslint-disable-next-line no-console
              console.error("Error in InfoTag onRemove:", err);
            }
          }}
        />
      ) : null}
    </Badge>
  );
}
