import { createRootRoute, Outlet } from '@tanstack/react-router'
import { TanStackRouterDevtools } from '@tanstack/router-devtools'
import "../index.css"
import { GlobalProvider } from '@/context/GlobalContext'
import { SnackbarProvider } from 'notistack'

export const Route = createRootRoute({
  component: () => (
    <SnackbarProvider>
      <GlobalProvider>
        <Outlet />
        <TanStackRouterDevtools />
      </GlobalProvider>
    </SnackbarProvider>
  ),
})
