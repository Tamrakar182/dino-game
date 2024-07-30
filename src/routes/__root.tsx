import { createRootRoute, Outlet } from '@tanstack/react-router'
import "../index.css"
import { GlobalProvider } from '@/context/GlobalContext'
import { SnackbarProvider } from 'notistack'
import { lazy } from 'react'

const TanStackRouterDevtools =
  process.env.NODE_ENV === 'production'
    ? () => null
    : lazy(() =>
      // Lazy load in development
      import('@tanstack/router-devtools').then((res) => ({
        default: res.TanStackRouterDevtools,
        // For Embedded Mode
        // default: res.TanStackRouterDevtoolsPanel
      })),
    )


export const Route = createRootRoute({
  component: () => (
    <SnackbarProvider
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      autoHideDuration={3000}
      preventDuplicate
    >
      <GlobalProvider>
        <Outlet />
        <TanStackRouterDevtools />
      </GlobalProvider>
    </SnackbarProvider>
  ),
})
