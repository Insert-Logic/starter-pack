import { createFileRoute } from '@tanstack/react-router';
import { Button, NavigationLink } from '@insertlogic/o8-lib';
import { AlertCircle } from 'lucide-react';

export const Route = createFileRoute('/error')({
  component: RouteComponent,
});

function RouteComponent() {
  return <NotFound />;
}

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="flex h-full w-full min-w-96 flex-col items-center justify-center p-8">
        <AlertCircle className="text-muted-foreground mb-4 size-16" />
        <h1 className="mb-2 text-3xl font-bold">Page Not Found</h1>
        <p className="text-muted-foreground mb-6">The page you're looking for doesn't exist.</p>
        <NavigationLink href="/">
          <Button>Return to Dashboard</Button>
        </NavigationLink>
      </div>
    </div>
  );
}
