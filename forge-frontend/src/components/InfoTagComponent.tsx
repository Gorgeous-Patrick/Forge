import { Badge } from '@chakra-ui/react'
import type { InfoTag } from '../states/InfoTag'

export function InfoTagComponent({ tag }: { tag: InfoTag }) {
  return <Badge>{tag.title}</Badge>
}
