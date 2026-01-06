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
      // 你后面可以用 extendedProps 标记类型
      extendedProps: { kind: 'break' },
    },
  ]

  return (
    <div style={{ padding: 16, maxWidth: 980, margin: '0 auto' }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
        <h1 style={{ margin: 0 }}>Forge</h1>
        <span style={{ opacity: 0.7 }}>Calendar</span>
      </div>

      <div style={{ marginTop: 12 }}>
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
      </div>
    </div>
  )
}

