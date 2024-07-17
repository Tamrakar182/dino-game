import { createFileRoute } from '@tanstack/react-router'
import DashboardSection from '@/sections/DashboardSection'

export const Route = createFileRoute('/dashboard')({
  component: DashboardSection
})