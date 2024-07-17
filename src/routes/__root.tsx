import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import "../index.css"
import { GlobalProvider } from '@/context/GlobalContext'

export const Route = createRootRoute({
  component: () => (
    <GlobalProvider>
      <Outlet />
      <TanStackRouterDevtools />
    </GlobalProvider>
  ),
})
