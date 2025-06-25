import { createFileRoute, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/your-logic')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div className="bg-background flex h-full w-full flex-row self-stretch">
            <Outlet />
          </div>
}
