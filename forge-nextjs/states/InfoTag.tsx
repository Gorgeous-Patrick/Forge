export type InfoTag = {
  title: string
  info: string
}

// A few sample InfoTag instances describing the user. These are plain data
// objects that match `InfoTagProps` and can be rendered with the `InfoTag`
// component in the UI.
export const sampleInfoTags: InfoTag[] = [
  {
    title: 'Name',
    info: 'Patrick Li',
  },
  {
    title: 'Role',
    info: 'Full-stack engineer — TypeScript / React / Python',
  },
  {
    title: 'Location',
    info: 'San Francisco, CA (PST)',
  },
  {
    title: 'Interests',
    info: 'Developer tools, UX, small open-source projects, and productivity',
  },
  {
    title: 'Availability',
    info: 'Weekdays (mornings) for pairing; flexible otherwise',
  },
  {
    title: 'Preferred contact',
    info: 'Email: patrick@example.com (replace with real address)',
  },
]

// InfoTagComponent moved to `src/components/InfoTagComponent.tsx`
