import { useNavigate } from '@tanstack/react-router';
import { ActionArea } from 'components/action-area';

export const ExampleUI = () => {
  const navigate = useNavigate();

  const onCancel = () => {
    navigate({ to: '/' });
  };
  const onSubmit = () => {};

  return (
    <ActionArea
      caseId="1"
      title="Resources"
      isWithdrawPossible={true}
      actionButtonsVisible={true}
      onCancel={onCancel}
      onSubmit={onSubmit}>
      <div className="py-20">Some action elementes</div>
    </ActionArea>
  );
};
