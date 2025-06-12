import { createFileRoute } from '@tanstack/react-router';

// This is the dashboard route
export const Index = () => {
  return <div>Hello from dashboard!</div>
};

// Fetch data with loader instead??
export const Route = createFileRoute('/')({
  component: Index,
});