'use client';

import { ActionAreaButtons } from './action-area-buttons';
import { ActionAreaTitle } from './action-area-title';

interface ActionAreaProps {
  children: React.ReactNode;
  title: string;
  caseId: string;
  hasParent: boolean;
  parentInfo?: { id: string; interfaceOption: string; runtimeId: string };
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
  hasParent,
  parentInfo,
  actionButtonsVisible = true,
  isWithdrawPossible,
  onWithdrawn,
  onCancel,
  onSubmit,
}: ActionAreaProps) => {
  return (
    <div className="flex w-full flex-col items-start gap-6 self-stretch">
      <ActionAreaTitle
        caseId={caseId}
        title={title}
        hasParent={hasParent}
        parentInfo={parentInfo}
      />
      {children}
      {actionButtonsVisible && (
        <ActionAreaButtons
          isWithdrawPossible={isWithdrawPossible}
          onWithdrawn={onWithdrawn}
          onCancel={onCancel}
          onsubmit={onSubmit}
        />
      )}
    </div>
  );
};
