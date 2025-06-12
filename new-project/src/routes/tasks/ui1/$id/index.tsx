import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/tasks/ui1/$id/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/tasks/ui1/$id/"!</div>
}
