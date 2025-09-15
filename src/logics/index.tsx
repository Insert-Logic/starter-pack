import { createFileRoute } from '@tanstack/react-router';
import { tasksMock } from './-mock';

export const dashboardService = {
  getTasks: async function () {
    return tasksMock;
  },
};

export const Index = () => {
  return <div className="flex h-full w-full grow flex-col items-center justify-center">Welcome to the portal!</div>;
};

export const Route = createFileRoute('/')({
  component: Index,
});
