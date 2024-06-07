import { createFileRoute } from '@tanstack/react-router'
import AboutSection from '@/sections/AboutSection'

export const Route = createFileRoute('/about')({
  component: AboutSection
})