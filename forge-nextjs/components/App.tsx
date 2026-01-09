"use client"
import { Box, Flex, Heading, Text } from '@chakra-ui/react'
import FullCalendar from '@fullcalendar/react'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import Sidebar from '@/components/Sidebar'
import SettingsDialog from '@/components/SettingsDialog'
import { sampleGoals, type Goal } from '@/states/goals'
import { useState } from 'react'
import { events, type CalendarEvent } from '@/states/events'

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
      <Flex align="baseline" gap={3}>
        <Heading as="h1" size="xl" m={0}>
          Forge
        </Heading>
        <Text opacity={0.7}>Calendar</Text>
        <Box ml="auto">
          <SettingsDialog />
        </Box>
      </Flex>
    </Box>
  )
}

// Sidebar moved to its own component in `src/Sidebar.tsx` and receives goals via props.

function CalendarView({ events }: { events: CalendarEvent[] }) {
  return (
    <Box flex={1} p={4} height="100%" minHeight={0} overflowY="auto">
      <Box mt={3} minHeight={0}>
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
  const [goals, setGoals] = useState<Goal[]>(sampleGoals)

  return (
    <Box minH="100vh" bg="gray.50">
      <Header />

      <Flex
        direction={{ base: 'column', md: 'row' }}
        mx="auto"
        gap={0}
        height="calc(100vh - 73px)"
      >
        <Sidebar
          goals={goals}
          onAddGoal={g => setGoals(prev => [g, ...prev])}
          onRemoveGoal={i =>
            setGoals(prev => prev.filter((_, idx) => idx !== i))
          }
        />
        <CalendarView events={events} />
      </Flex>
    </Box>
  )
}
