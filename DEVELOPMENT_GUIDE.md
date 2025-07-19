# Auto Tune SaaS - Development Guide

## Getting Started

### Prerequisites
- Node.js 18.18.0 or higher
- npm or yarn package manager
- Git for version control

### Installation
\`\`\`bash
npm install
# or
yarn install
\`\`\`

### Development Server
\`\`\`bash
npm run dev
# or
yarn dev
\`\`\`

## Project Structure Deep Dive

### App Router Structure
\`\`\`
app/
├── globals.css           # Global styles and Tailwind imports
├── layout.tsx           # Root layout with providers
├── page.tsx             # Landing page (/)
├── upload/
│   └── page.tsx         # File upload interface (/upload)
├── select/
│   └── page.tsx         # Model selection (/select)
├── configure/
│   └── page.tsx         # Training config (/configure)
├── train/
│   └── page.tsx         # Training dashboard (/train)
├── results/
│   └── page.tsx         # Results display (/results)
└── history/
    └── page.tsx         # Training history (/history)
\`\`\`

### Component Architecture
\`\`\`
components/
├── navigation.tsx       # Main nav with logo, links, theme toggle
├── mode-toggle.tsx     # Dark/light mode switcher
├── theme-provider.tsx  # Theme context wrapper
└── ui/                 # shadcn/ui components (auto-generated)
    ├── button.tsx
    ├── card.tsx
    ├── input.tsx
    └── ... (50+ components)
\`\`\`

## Key Implementation Details

### Navigation Component
- Responsive design with mobile hamburger menu
- Active link highlighting
- Theme toggle integration
- Logo and branding

### Theme System
- Dark/light mode support
- System preference detection
- Persistent theme selection
- Smooth transitions between themes

### File Upload System
- Drag and drop functionality
- File type validation (CSV only)
- File size limits
- Preview generation
- Error handling and user feedback

### Training Simulation
- Real-time progress updates
- Metric calculations (accuracy, loss)
- Log generation and display
- Pause/resume functionality
- Completion handling

## State Management Strategy

### Session Storage Usage
\`\`\`typescript
// Storing configuration
sessionStorage.setItem('trainingConfig', JSON.stringify(config))

// Retrieving configuration
const storedConfig = sessionStorage.getItem('trainingConfig')
const config = storedConfig ? JSON.parse(storedConfig) : null
\`\`\`

### React State Patterns
\`\`\`typescript
// Loading states
const [isLoading, setIsLoading] = useState(false)

// Error handling
const [error, setError] = useState<string | null>(null)

// Form data
const [formData, setFormData] = useState<FormData>({})

// Async operations
const [data, setData] = useState<DataType[]>([])
\`\`\`

### Ref Usage for Intervals
\`\`\`typescript
// Prevent re-render loops in intervals
const intervalRef = useRef<NodeJS.Timeout | null>(null)
const stateRef = useRef(initialState)

useEffect(() => {
  stateRef.current = currentState
}, [currentState])
\`\`\`

## Styling Guidelines

### Tailwind CSS Patterns

#### Layout Classes
\`\`\`css
/* Container patterns */
.container-pattern {
  @apply max-w-6xl mx-auto px-4 sm:px-6 lg:px-8;
}

/* Grid layouts */
.grid-pattern {
  @apply grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6;
}

/* Flex patterns */
.flex-center {
  @apply flex items-center justify-center;
}
\`\`\`

#### Component Styling
\`\`\`css
/* Button variants */
.btn-primary {
  @apply bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-2xl px-8 py-4 font-semibold shadow-lg hover:scale-105 transition-all duration-200;
}

.btn-secondary {
  @apply border border-slate-300 hover:border-slate-400 rounded-2xl px-6 py-3 font-medium hover:scale-105 transition-all duration-200;
}

/* Card styling */
.card-base {
  @apply bg-white dark:bg-slate-900 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-800 p-6 hover:shadow-xl transition-shadow duration-200;
}
\`\`\`

#### Typography Scale
\`\`\`css
/* Heading hierarchy */
.heading-xl { @apply text-4xl font-bold text-slate-900 dark:text-white; }
.heading-lg { @apply text-2xl font-semibold text-slate-900 dark:text-white; }
.heading-md { @apply text-lg font-medium text-slate-900 dark:text-white; }

/* Body text */
.text-primary { @apply text-slate-900 dark:text-white; }
.text-secondary { @apply text-slate-600 dark:text-slate-300; }
.text-muted { @apply text-slate-500 dark:text-slate-400; }
\`\`\`

## Component Development Patterns

### Page Component Structure
\`\`\`typescript
export default function PageName() {
  // State declarations
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  
  // Hooks
  const router = useRouter()
  
  // Effects
  useEffect(() => {
    // Initialization logic
  }, [])
  
  // Event handlers
  const handleAction = () => {
    // Action logic
  }
  
  // Render guards
  if (loading) return <LoadingComponent />
  if (!data) return <EmptyState />
  
  // Main render
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      {/* Page content */}
    </div>
  )
}
\`\`\`

### Form Component Pattern
\`\`\`typescript
interface FormProps {
  onSubmit: (data: FormData) => void
  initialData?: FormData
}

export function FormComponent({ onSubmit, initialData }: FormProps) {
  const [formData, setFormData] = useState(initialData || {})
  const [errors, setErrors] = useState<Record<string, string>>({})
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      onSubmit(formData)
    }
  }
  
  const validateForm = () => {
    // Validation logic
    return true
  }
  
  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
    </form>
  )
}
\`\`\`

## Performance Optimization

### React Optimization Patterns
\`\`\`typescript
// Memoized components
const ExpensiveComponent = React.memo(({ data }) => {
  return <div>{/* Expensive rendering */}</div>
})

// Memoized values
const computedValue = useMemo(() => {
  return expensiveComputation(data)
}, [data])

// Memoized callbacks
const handleClick = useCallback(() => {
  // Event handler logic
}, [dependency])
\`\`\`

### Loading States
\`\`\`typescript
// Skeleton loading
const LoadingSkeleton = () => (
  <div className="animate-pulse space-y-4">
    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
    <div className="h-4 bg-slate-200 rounded w-1/2"></div>
  </div>
)

// Spinner loading
const LoadingSpinner = () => (
  <div className="flex justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
  </div>
)
\`\`\`

## Error Handling

### Error Boundary Pattern
\`\`\`typescript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true }
  }
  
  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />
    }
    
    return this.props.children
  }
}
\`\`\`

### API Error Handling
\`\`\`typescript
const fetchData = async () => {
  try {
    setLoading(true)
    const response = await fetch('/api/data')
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    
    const data = await response.json()
    setData(data)
  } catch (error) {
    setError(error.message)
  } finally {
    setLoading(false)
  }
}
\`\`\`

## Testing Strategy

### Component Testing
\`\`\`typescript
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button Component', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
  
  it('handles click events', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
\`\`\`

### Integration Testing
\`\`\`typescript
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import UploadPage from '@/app/upload/page'

describe('Upload Page', () => {
  it('handles file upload flow', async () => {
    const user = userEvent.setup()
    render(<UploadPage />)
    
    const fileInput = screen.getByLabelText(/upload file/i)
    const file = new File(['test'], 'test.csv', { type: 'text/csv' })
    
    await user.upload(fileInput, file)
    
    await waitFor(() => {
      expect(screen.getByText('File uploaded successfully')).toBeInTheDocument()
    })
  })
})
\`\`\`

## Deployment

### Environment Variables
\`\`\`bash
# .env.local
NEXT_PUBLIC_APP_URL=http://localhost:3000
SUPABASE_URL=your_supabase_url
SUPABASE_ANON_KEY=your_supabase_anon_key
HUGGINGFACE_API_KEY=your_hf_api_key
\`\`\`

### Build Configuration
\`\`\`javascript
// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ['placeholder.com'],
  },
}

export default nextConfig
\`\`\`

### Vercel Deployment
\`\`\`json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
\`\`\`

This development guide provides comprehensive information for working with the Auto Tune SaaS codebase effectively.
