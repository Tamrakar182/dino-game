import { createFileRoute } from '@tanstack/react-router'
import HomeSection from '@/sections/HomeSection'

export const Route = createFileRoute('/home')({
  component: HomeSection,
})
