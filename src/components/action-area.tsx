import { ActionAreaButtons } from './action-area-buttons-custom';
import { ActionAreaTitle } from './action-area-title-custom';

interface ActionAreaProps {
  children: React.ReactNode;
  title: string;
  caseId: string;
  onSubmit: () => void;
  isWithdrawPossible: boolean;
  onWithdrawn?: () => void;
  onCancel: () => void;
  actionButtonsVisible?: boolean;
}

export const ActionArea = ({
  children,
  title,
  caseId,
  actionButtonsVisible = true,
  isWithdrawPossible,
  onWithdrawn,
  onCancel,
  onSubmit,
}: ActionAreaProps) => {
  return (
    <div className="flex w-full grow flex-col items-start gap-6 self-stretch">
      <ActionAreaTitle caseId={caseId} title={title} />
      <div className="flex h-full w-full grow flex-col">{children}</div>
      {actionButtonsVisible && (
        <ActionAreaButtons
          isWithdrawPossible={isWithdrawPossible}
          onWithdrawn={onWithdrawn}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      )}
    </div>
  );
};
