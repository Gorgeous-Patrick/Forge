import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

function todayAt(hour: number, minute: number) {
  const d = new Date()
  d.setHours(hour, minute, 0, 0)
  return d
}

export default function App() {
  const events = [
    {
      id: 'task-1',
      title: 'Forge: Example 50min Block',
      start: todayAt(14, 0),
      end: todayAt(14, 50),
    },
    {
      id: 'break-1',
      title: 'Break (10m)',
      start: todayAt(14, 50),
      end: todayAt(15, 0),
      extendedProps: { kind: 'break' },
    },
  ]

  return (
    <Box minH="100vh" bg="gray.50">
      <Box
        as="header"
        bg="white"
        borderBottomWidth="1px"
        borderBottomColor="gray.200"
        px={4}
        py={3}
      >
        <Flex align="baseline" gap={3} maxW="980px" mx="auto">
          <Heading as="h1" size="xl" m={0}>
            Forge
          </Heading>
          <Text opacity={0.7}>Calendar</Text>
        </Flex>
      </Box>

      <Box p={4} maxW="980px" mx="auto">
        <Box mt={3}>
          <FullCalendar
            plugins={[timeGridPlugin, interactionPlugin]}
            initialView="timeGridDay"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: '',
            }}
            nowIndicator={true}
            height="auto"
            allDaySlot={false}
            slotDuration="00:10:00"
            slotLabelInterval="01:00"
            expandRows={true}
            weekends={true}
            editable={true}
            eventStartEditable={true}
            eventDurationEditable={true}
            events={events}
            eventClick={(info) => {
              const kind = info.event.extendedProps?.kind ?? 'task'
              alert(`[${kind}] ${info.event.title}`)
            }}
            eventDrop={(info) => {
              console.log('eventDrop:', {
                id: info.event.id,
                start: info.event.start,
                end: info.event.end,
              })
            }}
            eventResize={(info) => {
              console.log('eventResize:', {
                id: info.event.id,
                start: info.event.start,
                end: info.event.end,
              })
            }}
          />
        </Box>
      </Box>
    </Box>
  )
}

