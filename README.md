# Forge

A calendar-based goal management application that helps you bridge the gap between long-term goals and daily todos. Forge allows you to define high-level goals with deliverables, then break them down into concrete time blocks on your calendar to ensure consistent progress.

## Overview

Forge combines goal tracking with calendar planning to help you:
- Define long-term goals with descriptions, due dates, and deliverables
- Break down goals into actionable tasks with time estimates
- Schedule work sessions directly on your calendar
- Get AI-powered assistance for planning and task breakdown
- Track progress through deliverable completion

## Architecture

### Frontend Stack
- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Chakra UI v3** - Component library with Ark UI primitives
- **Tailwind CSS v4** - Utility-first styling
- **FullCalendar** - Interactive calendar component with time grid view

### State Management
- **Zustand** - Lightweight state management for goals and calendar events
- Goal data structure includes:
  - Title, description, and due date
  - Deliverables with completion status and time estimates
  - Custom info tags (owner, priority, etc.)

### AI Integration
- **@assistant-ui/react** - Chat interface components
- **Anthropic SDK** - AI-powered planning and task assistance
- Custom system prompts for goal breakdown and scheduling
- Real-time streaming responses

### Key Components

#### `App.tsx`
Main application layout coordinating:
- Header with theme toggle and settings
- Sidebar for goal management
- Calendar view for scheduling

#### `Sidebar.tsx`
Goal management interface featuring:
- Goal list with metadata display
- Add/edit/delete goal dialogs
- Integration with WorkDialog for task scheduling

#### `WorkDialog.tsx`
AI-powered work planning interface that:
- Opens a chat session for a specific goal
- Uses custom prompts to help break down deliverables
- Suggests optimal time blocks for tasks

#### `Chatbox.tsx`
Reusable AI assistant component with:
- Configurable system and summary prompts
- Streaming message support
- Markdown rendering for rich responses

#### Calendar Integration
- FullCalendar with time grid plugin
- Drag-and-drop event editing
- Current time indicator
- Event categorization (tasks, meetings, etc.)

### API Layer
- `/api/chat/route.ts` - Streaming chat endpoint using Vercel AI SDK
- Anthropic Claude model integration
- Support for system instructions and custom prompts

### Styling
- Dark mode support via `next-themes`
- Responsive design with mobile-first approach
- Consistent color theming across light/dark modes
- Chakra UI color mode integration

## Getting Started

```bash
cd forge-nextjs
npm install
npm run dev
```

Visit `http://localhost:3000` to access the application.

## Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## Project Structure

```
forge-nextjs/
├── app/                    # Next.js app router
│   ├── api/chat/          # AI chat API endpoint
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── assistant-ui/     # AI chat UI components
│   ├── ui/               # Shared UI primitives
│   ├── App.tsx           # Main app component
│   ├── Sidebar.tsx       # Goal management sidebar
│   ├── Chatbox.tsx       # AI chat interface
│   └── WorkDialog.tsx    # Task planning dialog
├── states/               # State management
│   ├── goals.ts         # Goal data types and samples
│   ├── events.tsx       # Calendar event management
│   └── InfoTag.tsx      # Tag type definitions
└── lib/                 # Utility functions
```

## Key Features

- **Goal Management**: Create, edit, and delete goals with rich metadata
- **Deliverable Tracking**: Break goals into concrete deliverables with time estimates
- **Calendar Integration**: Visual time blocking with drag-and-drop scheduling
- **AI Assistant**: Get help breaking down goals and planning work sessions
- **Theme Support**: Full light/dark mode support
- **Responsive Design**: Works on desktop and mobile devices

## License

Private project
