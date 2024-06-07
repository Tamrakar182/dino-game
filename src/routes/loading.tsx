import { createFileRoute } from '@tanstack/react-router'
import LoadingScreen from '@/components/LoadingScreen';

export const Route = createFileRoute('/loading')({
  component: () => <LoadingScreen />
})
