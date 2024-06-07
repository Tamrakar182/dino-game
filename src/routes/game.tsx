import { createFileRoute } from '@tanstack/react-router'
import GameSection from '@/sections/GameSection'

export const Route = createFileRoute('/game')({
  component: GameSection
})