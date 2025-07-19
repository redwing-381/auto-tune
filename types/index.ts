import type React from "react"
// Global TypeScript type definitions for Auto Tune SaaS

export interface User {
  id: string
  email: string
  name: string
  avatar?: string
  createdAt: string
  subscription?: Subscription
}

export interface Subscription {
  id: string
  plan: "free" | "pro" | "enterprise"
  status: "active" | "canceled" | "past_due"
  currentPeriodEnd: string
}

export interface Dataset {
  id: string
  name: string
  filename: string
  size: number
  rows: number
  columns: string[]
  uploadedAt: string
  preview: Record<string, any>[]
}

export interface ModelTask {
  id: string
  name: string
  description: string
  icon: string
  supportedModels: string[]
}

export interface HuggingFaceModel {
  id: string
  name: string
  description: string
  downloads: number
  likes: number
  tags: string[]
  pipeline_tag: string
  library_name: string
}

export interface TrainingConfig {
  epochs: number
  batchSize: number
  learningRate: number
  warmupSteps?: number
  weightDecay?: number
  maxLength?: number
  advancedSettings: boolean
}

export interface TrainingJob {
  id: string
  userId: string
  datasetId: string
  modelId: string
  task: string
  config: TrainingConfig
  status: "pending" | "running" | "completed" | "failed" | "paused"
  progress: number
  metrics: TrainingMetrics
  logs: TrainingLog[]
  createdAt: string
  startedAt?: string
  completedAt?: string
  estimatedDuration?: number
}

export interface TrainingMetrics {
  accuracy?: number
  loss: number
  f1Score?: number
  precision?: number
  recall?: number
  perplexity?: number
  bleuScore?: number
}

export interface TrainingLog {
  timestamp: string
  epoch: number
  step: number
  loss: number
  accuracy?: number
  message: string
  level: "info" | "warning" | "error"
}

export interface ModelResult {
  id: string
  jobId: string
  modelPath: string
  metrics: TrainingMetrics
  modelCard: string
  downloadUrl?: string
  huggingFaceUrl?: string
  deploymentStatus?: "pending" | "deployed" | "failed"
}

export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  message?: string
}

export interface PaginatedResponse<T> {
  data: T[]
  total: number
  page: number
  limit: number
  hasNext: boolean
  hasPrev: boolean
}

// Form types
export interface UploadFormData {
  file: File
  name: string
  description?: string
}

export interface ModelSelectionFormData {
  task: string
  baseModel: string
  customName?: string
}

export interface ConfigurationFormData extends TrainingConfig {
  jobName: string
  description?: string
}

// UI Component Props
export interface ButtonProps {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  disabled?: boolean
  loading?: boolean
  children: React.ReactNode
  onClick?: () => void
}

export interface CardProps {
  className?: string
  children: React.ReactNode
  hover?: boolean
  clickable?: boolean
  onClick?: () => void
}

export interface ProgressProps {
  value: number
  max?: number
  className?: string
  showLabel?: boolean
  color?: "default" | "success" | "warning" | "error"
}

// Navigation types
export interface NavItem {
  title: string
  href: string
  icon?: string
  disabled?: boolean
  external?: boolean
}

export interface SidebarNavItem extends NavItem {
  items?: SidebarNavItem[]
}

// Theme types
export type Theme = "light" | "dark" | "system"

// Error types
export interface AppError {
  code: string
  message: string
  details?: any
}

// File upload types
export interface FileUploadState {
  file: File | null
  preview: any[] | null
  isValid: boolean
  error: string | null
  isUploading: boolean
}

// Training dashboard types
export interface DashboardMetrics {
  totalJobs: number
  activeJobs: number
  completedJobs: number
  failedJobs: number
  totalDatasets: number
  totalModels: number
}

// Notification types
export interface Notification {
  id: string
  type: "success" | "error" | "warning" | "info"
  title: string
  message: string
  timestamp: string
  read: boolean
}

// Search and filter types
export interface SearchFilters {
  query?: string
  status?: TrainingJob["status"][]
  task?: string[]
  dateRange?: {
    start: string
    end: string
  }
  sortBy?: "createdAt" | "name" | "status" | "progress"
  sortOrder?: "asc" | "desc"
}

// Webhook types
export interface WebhookEvent {
  id: string
  type: "training.started" | "training.completed" | "training.failed" | "model.deployed"
  data: any
  timestamp: string
}

// Analytics types
export interface UsageAnalytics {
  period: "day" | "week" | "month" | "year"
  trainingJobs: number
  datasetsUploaded: number
  modelsDeployed: number
  apiCalls: number
  storageUsed: number
}

// Export utility types
export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>
export type PartialExcept<T, K extends keyof T> = Partial<T> & Pick<T, K>
