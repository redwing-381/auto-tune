# Auto Tune SaaS - Cursor AI Context

## Project Overview

Auto Tune is a premium no-code SaaS application that allows users to fine-tune Hugging Face models on their own datasets without any coding or ML expertise. The application is built with Next.js 14 (App Router), TypeScript, and Tailwind CSS, following modern design principles inspired by Vercel, Linear, and Framer.

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Icons**: Lucide React
- **State Management**: React hooks (useState, useEffect, useRef)
- **Form Handling**: react-hook-form (planned)
- **Validation**: Zod (planned)
- **Database**: Supabase (planned)

## Design System & Principles

### Color Palette
- Primary: Slate/Zinc tones for neutral backgrounds
- Accent: Subtle gradients and modern color combinations
- Status Colors:
  - Success: Green (emerald-600, green-600)
  - Warning: Orange/Amber
  - Error: Red
  - Info: Blue
  - Progress: Purple

### Typography
- Font sizes: text-lg, text-2xl, text-4xl for hierarchy
- Font weights: font-medium, font-semibold, font-bold
- Text colors: slate-900 (dark), slate-600 (medium), slate-400 (light)

### Component Styling
- Buttons: `rounded-2xl`, `hover:scale-105`, `shadow-md/lg`
- Cards: Subtle shadows, rounded corners, proper spacing
- Spacing: Generous white space, not crowded
- Responsive: Mobile-first design

### Animation & Interactions
- Subtle hover effects with scale transforms
- Smooth transitions
- Loading states and skeletons
- Progressive disclosure

## Application Architecture

### Page Structure
\`\`\`
app/
├── page.tsx              # Landing page
├── upload/page.tsx       # File upload interface
├── select/page.tsx       # Model & task selection
├── configure/page.tsx    # Training configuration
├── train/page.tsx        # Training dashboard
├── results/page.tsx      # Training results
├── history/page.tsx      # Training history
└── layout.tsx           # Root layout with navigation
\`\`\`

### Component Structure
\`\`\`
components/
├── navigation.tsx        # Main navigation bar
├── mode-toggle.tsx      # Dark/light mode toggle
├── theme-provider.tsx   # Theme context provider
└── ui/                  # shadcn/ui components
\`\`\`

## Key Features & User Flow

### 1. Landing Page (/)
- Hero section with gradient text effects
- Feature cards explaining the process
- Call-to-action buttons
- Professional footer

### 2. Upload Page (/upload)
- Drag & drop file upload
- CSV validation and preview
- File format guidance
- Error handling with user feedback

### 3. Model Selection (/select)
- Task selection (Text Classification, Summarization, Q&A, NER)
- Base model dropdown (Hugging Face models)
- Information tooltips
- Progressive disclosure

### 4. Training Configuration (/configure)
- Parameter sliders (epochs, batch size, learning rate)
- Advanced settings toggle
- Estimated training time
- Configuration validation

### 5. Training Dashboard (/train)
- Real-time progress tracking
- Live metrics (accuracy, loss, time elapsed)
- Training logs with auto-scroll
- Pause/resume/stop controls
- **Important**: Uses refs to prevent infinite re-renders

### 6. Results Page (/results)
- Performance metrics visualization
- Model download functionality
- Hugging Face deployment
- Auto-generated model cards

### 7. History Page (/history)
- Training jobs table
- Status indicators
- Action dropdowns
- Statistics overview

## State Management Patterns

### Session Storage Usage
- Training configuration persisted between pages
- User selections maintained during flow
- Temporary data storage for multi-step process

### React Patterns
- Functional components with hooks
- useRef for interval management (prevents re-render loops)
- Controlled components for forms
- Loading states and error boundaries

## Critical Implementation Notes

### Training Page Anti-Pattern Fix
The training page uses refs to prevent the "Maximum update depth exceeded" error:

\`\`\`typescript
const trainingRef = useRef(isTraining)
const pausedRef = useRef(isPaused)

// Keep refs in sync with state
useEffect(() => {
  trainingRef.current = isTraining
}, [isTraining])

// Use refs in interval instead of state
const interval = setInterval(() => {
  if (!trainingRef.current || pausedRef.current) return
  // ... update logic
}, 500)
\`\`\`

### Responsive Design
- Mobile-first approach
- Grid layouts that adapt to screen size
- Proper spacing and typography scaling
- Touch-friendly interactive elements

### Performance Considerations
- Lazy loading for heavy components
- Optimized re-renders with proper dependency arrays
- Efficient state updates with functional setters
- Proper cleanup of intervals and subscriptions

## Styling Guidelines

### Button Variants
\`\`\`typescript
// Primary CTA
className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl px-8 py-4 font-semibold shadow-lg hover:scale-105 transition-all duration-200"

// Secondary
className="border border-slate-300 hover:border-slate-400 rounded-2xl px-6 py-3 font-medium hover:scale-105 transition-all duration-200"

// Destructive
className="bg-red-600 hover:bg-red-700 text-white rounded-2xl px-6 py-3 font-medium hover:scale-105 transition-all duration-200"
\`\`\`

### Card Styling
\`\`\`typescript
className="bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 hover:shadow-xl transition-shadow duration-200"
\`\`\`

### Input Styling
\`\`\`typescript
className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
\`\`\`

## Data Flow & State

### Upload Flow
1. File selection/drag-drop
2. Validation (CSV format, size limits)
3. Preview generation (first 5 rows)
4. Storage in sessionStorage
5. Navigation to model selection

### Training Flow
1. Configuration from sessionStorage
2. Simulated training with intervals
3. Real-time metric updates
4. Log generation and display
5. Completion handling and navigation

### Error Handling
- User-friendly error messages
- Validation feedback
- Loading states during async operations
- Graceful fallbacks for missing data

## Future Enhancements

### Planned Integrations
- Supabase for user authentication and data persistence
- Hugging Face API for real model fetching
- File upload to cloud storage (Vercel Blob/AWS S3)
- Real training backend integration
- Payment processing for subscriptions

### Performance Optimizations
- React.memo for expensive components
- useMemo for computed values
- useCallback for event handlers
- Virtual scrolling for large datasets

## Development Guidelines

### Code Style
- Use TypeScript strictly
- Prefer functional components
- Use proper error boundaries
- Implement loading states
- Follow accessibility best practices

### Testing Strategy
- Unit tests for utility functions
- Integration tests for user flows
- E2E tests for critical paths
- Visual regression testing

### Deployment
- Vercel for hosting
- Environment variables for API keys
- CI/CD pipeline with GitHub Actions
- Performance monitoring and analytics

## Common Patterns

### Loading States
\`\`\`typescript
const [isLoading, setIsLoading] = useState(false)

if (isLoading) {
  return <div className="animate-pulse">Loading...</div>
}
\`\`\`

### Error Handling
\`\`\`typescript
const [error, setError] = useState<string | null>(null)

if (error) {
  return <Alert variant="destructive">{error}</Alert>
}
\`\`\`

### Form Validation
\`\`\`typescript
const [errors, setErrors] = useState<Record<string, string>>({})

const validateForm = (data: FormData) => {
  const newErrors: Record<string, string> = {}
  // validation logic
  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}
\`\`\`

This context should help Cursor understand the project structure, design patterns, and implementation details for effective code assistance and generation.
