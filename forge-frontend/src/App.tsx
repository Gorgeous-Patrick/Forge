import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'

function todayAt(hour: number, minute: number) {
  const d = new Date()
  d.setHours(hour, minute, 0, 0)
  return d
}

function Header() {
  return (
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
  )
}

function Sidebar() {
  return (
    <Box
      as="aside"
      w={{ base: '100%', md: '250px' }}
      bg="white"
      borderRightWidth={{ base: 0, md: '1px' }}
      borderBottomWidth={{ base: '1px', md: 0 }}
      borderRightColor="gray.200"
      borderBottomColor="gray.200"
      p={4}
      flexShrink={0}
    >
      <VStack align="stretch" gap={3}>
        <Text fontWeight="bold" fontSize="lg">
          Goals
        </Text>
        {/* <Text>Sidebar content goes here</Text> */}
      </VStack>
    </Box>
  )
}

type CalendarEvent = {
  id: string
  title: string
  start: Date
  end: Date
  extendedProps?: { kind?: string }
}

function CalendarView({ events }: { events: CalendarEvent[] }) {
  return (
    <Box flex={1} p={4}>
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
          eventClick={info => {
            const kind = info.event.extendedProps?.kind ?? 'task'
            alert(`[${kind}] ${info.event.title}`)
          }}
          eventDrop={info => {
            console.log('eventDrop:', {
              id: info.event.id,
              start: info.event.start,
              end: info.event.end,
            })
          }}
          eventResize={info => {
            console.log('eventResize:', {
              id: info.event.id,
              start: info.event.start,
              end: info.event.end,
            })
          }}
        />
      </Box>
    </Box>
  )
}

export default function App() {
  const events: CalendarEvent[] = [
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
      <Header />

      <Flex
        direction={{ base: 'column', md: 'row' }}
        maxW="980px"
        mx="auto"
        gap={0}
        minH="calc(100vh - 73px)"
      >
        <Sidebar />
        <CalendarView events={events} />
      </Flex>
    </Box>
  )
}
