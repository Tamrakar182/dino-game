import { createFileRoute } from '@tanstack/react-router'
import IntroSection from '@/sections/IndexSection';

export const Route = createFileRoute('/')({
    component: IntroSection,
})