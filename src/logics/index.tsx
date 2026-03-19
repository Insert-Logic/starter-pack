import { Button, Icon, showToast, useRuntimeCreateMutation, useUserProvider } from '@insertlogic/o8-lib';
import { createFileRoute } from '@tanstack/react-router';

export const Index = () => {
  const { user } = useUserProvider();
  const onCreateRuntime = useRuntimeCreateMutation();

  // CREATE NEW LOGIC
  // const handleSubmitNewProductDialog = () => {
  //   // Start flow in O8 and route to step
  //   onCreateRuntime.mutate(
  //     { name: 'in-phasing', context: {} }, // Default context
  //     {
  //       onSuccess: data => {
  //         if (!data.commited) {
  //           showToast('Failed to create', `Error: ${data?.error ?? ''}`, 'error');
  //           return;
  //         }
  //         showToast('Success', `Started In-Phasing of new product`, 'success');
  //       },
  //     },
  //   );
  // };

  return (
    <div className="flex h-full grow flex-col p-10">
      {/* Action menu */}
      <div className="flex shrink-0 items-center justify-between">
        <div>
          <h2 className="text-header text-3xl font-bold">Welcome, {user.name}</h2>
          <p className="text-muted-foreground mt-1">Here's an overview of your tasks</p>
        </div>
        <Button size="lg">
          <Icon name="Plus" className="mr-2 h-5 w-5" />
          Start new logic
        </Button>
      </div>
      <div className="flex h-full w-full grow flex-col items-center justify-center">Main Content</div>
    </div>
  );
};

export const Route = createFileRoute('/')({
  component: Index,
});
